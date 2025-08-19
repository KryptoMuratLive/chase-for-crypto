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
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cards.map((card) => (
          <div key={card.id} className="flex-shrink-0">
            <Card className={`w-64 h-80 ${
              card.team === "murat" 
                ? "bg-gradient-bitcoin border-bitcoin/50" 
                : "bg-gradient-hunter border-hunter/50"
            } transition-all duration-300 ${
              (isActivePlayer && !playedCards.includes(card.id)) ? 'shadow-glow-bitcoin cursor-pointer hover:scale-105' : 'opacity-60'
            }`}>
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
                    <div className="bg-dark-surface p-1 rounded text-xs">
                      <div className="text-muted-foreground">Skill</div>
                      <div className="font-bold text-bitcoin">{card.stats.skill}</div>
                    </div>
                    <div className="bg-dark-surface p-1 rounded text-xs">
                      <div className="text-muted-foreground">Intel</div>
                      <div className="font-bold text-cyber">{card.stats.intelligence}</div>
                    </div>
                    <div className="bg-dark-surface p-1 rounded text-xs">
                      <div className="text-muted-foreground">Stärke</div>
                      <div className="font-bold text-hunter">{card.stats.strength}</div>
                    </div>
                  </div>
                )}

                <div className="bg-dark-surface p-2 rounded-lg">
                  <h4 className="font-semibold text-primary text-xs mb-1">Fähigkeit</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.ability}</p>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>

                {(isActivePlayer && !playedCards.includes(card.id)) && (
                  <Button 
                    onClick={() => onPlayCard(card)}
                    variant={card.team === "murat" ? "teamMurat" : "teamJager"}
                    size="sm" 
                    className="w-full text-xs"
                  >
                    Karte spielen
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};