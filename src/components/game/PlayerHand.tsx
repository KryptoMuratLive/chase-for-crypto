import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "./PlayableCard";

interface PlayerHandProps {
  cards: GameCard[];
  team: "murat" | "jager";
  isActivePlayer: boolean;
  onPlayCard: (card: GameCard) => void;
  playedCards: string[];
}

export const PlayerHand = ({ 
  cards, 
  team, 
  isActivePlayer, 
  onPlayCard, 
  playedCards 
}: PlayerHandProps) => {
  return (
    <div className={`w-full p-4 ${team === "murat" ? "bg-bitcoin/5" : "bg-hunter/5"} rounded-lg border ${
      team === "murat" ? "border-bitcoin/20" : "border-hunter/20"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${
          team === "murat" ? "text-bitcoin" : "text-hunter"
        }`}>
          Team {team === "murat" ? "Murat" : "Jäger"}
        </h3>
        {isActivePlayer && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              team === "murat" 
                ? "bg-bitcoin/20 text-bitcoin border border-bitcoin/30" 
                : "bg-hunter/20 text-hunter border border-hunter/30"
            }`}
          >
            DU BIST DRAN
          </motion.div>
        )}
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-background">
        {cards.map((card) => (
          <div key={card.id} className="flex-shrink-0">
              <motion.div
                whileHover={
                  (isActivePlayer && !playedCards.includes(card.id)) 
                  ? { 
                      scale: 1.05, 
                      y: -8,
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    } 
                  : {}
                }
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="cursor-pointer"
                onClick={() => {
                  if (isActivePlayer && !playedCards.includes(card.id)) {
                    onPlayCard(card);
                  }
                }}
              >
              <Card className={`w-56 h-72 ${
                card.team === "murat" 
                  ? "bg-gradient-bitcoin border-bitcoin/50" 
                  : "bg-gradient-hunter border-hunter/50"
              } transition-all duration-300 ${
                (isActivePlayer && !playedCards.includes(card.id)) 
                  ? 'shadow-glow-bitcoin cursor-pointer hover:shadow-2xl' 
                  : 'opacity-60'
              } relative overflow-hidden`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-foreground">{card.name}</h3>
                  <Badge variant="outline" className="text-xs capitalize">
                    {card.type}
                  </Badge>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`w-fit text-xs ${
                    card.team === "murat" ? "bg-bitcoin/20 text-bitcoin" : "bg-hunter/20 text-hunter"
                  }`}
                >
                  Team {card.team === "murat" ? "Murat" : "Jäger"}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {card.stats && (
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="bg-dark-surface p-1.5 rounded text-xs">
                      <div className="text-muted-foreground text-xs">Skill</div>
                      <div className="font-bold text-bitcoin">{card.stats.skill}</div>
                    </div>
                    <div className="bg-dark-surface p-1.5 rounded text-xs">
                      <div className="text-muted-foreground text-xs">Intel</div>
                      <div className="font-bold text-cyber">{card.stats.intelligence}</div>
                    </div>
                    <div className="bg-dark-surface p-1.5 rounded text-xs">
                      <div className="text-muted-foreground text-xs">Stärke</div>
                      <div className="font-bold text-hunter">{card.stats.strength}</div>
                    </div>
                  </div>
                )}

                <div className="bg-dark-surface p-2 rounded-lg">
                  <h4 className="font-semibold text-primary text-xs mb-1">Fähigkeit</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.ability}</p>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>

                {/* Show button for all cards */}
                {(
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayCard(card);
                      }}
                      variant={card.team === "murat" ? "teamMurat" : "teamJager"}
                      size="sm" 
                      className="w-full text-xs relative overflow-hidden cursor-pointer"
                      disabled={playedCards.includes(card.id)}
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/20"
                      />
                      <span className="relative z-10">
                        {playedCards.includes(card.id) ? "Gespielt ✓" : "Karte spielen ✨"}
                      </span>
                    </Button>
                  </motion.div>
                )}
                
                {/* Card shine effect */}
                {(isActivePlayer && !playedCards.includes(card.id)) && (
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  />
                )}
              </CardContent>
            </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};