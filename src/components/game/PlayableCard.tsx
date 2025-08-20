import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface GameCard {
  id: string;
  name: string;
  type: "character" | "action" | "community";
  team: "murat" | "jager";
  rarity?: "common" | "rare" | "legendary";
  stats?: {
    skill: number;
    intelligence: number;
    strength: number;
  };
  ability: string;
  description: string;
}

interface PlayableCardProps {
  card: GameCard;
  isPlayable: boolean;
  isPlayed: boolean;
  onPlay: (card: GameCard) => void;
}

const getCardColor = (team: string, type: string) => {
  if (type === "community") return "bg-gradient-cyber border-cyber/50";
  return team === "murat" 
    ? "bg-gradient-bitcoin border-bitcoin/50" 
    : "bg-gradient-hunter border-hunter/50";
};

const getTeamBadgeColor = (team: string) => {
  return team === "murat" ? "bg-bitcoin/20 text-bitcoin" : "bg-hunter/20 text-hunter";
};

export const PlayableCard = ({ card, isPlayable, isPlayed, onPlay }: PlayableCardProps) => {
  return (
    <motion.div
      layout
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isPlayed ? -200 : 0, 
        opacity: isPlayed ? 0 : 1,
        scale: isPlayable ? 1 : 0.9
      }}
      whileHover={isPlayable ? { scale: 1.05 } : {}}
      className="flex-shrink-0"
    >
      <Card className={`w-64 h-80 ${getCardColor(card.team, card.type)} transition-all duration-300 ${
        isPlayable ? 'shadow-glow-bitcoin cursor-pointer' : 'opacity-60'
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
            className={`w-fit text-xs ${getTeamBadgeColor(card.team)}`}
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

          {isPlayable && (
            <Button 
              onClick={() => onPlay(card)}
              variant={card.team === "murat" ? "teamMurat" : "teamJager"}
              size="sm" 
              className="w-full text-xs"
            >
              Karte spielen
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};