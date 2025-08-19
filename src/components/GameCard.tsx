import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  name: string;
  rarity: "common" | "rare" | "legendary";
  team: "murat" | "jager" | "neutral";
  stats: {
    skill: number;
    intelligence: number;
    strength: number;
  };
  ability: string;
  description: string;
  image?: string;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "bg-gradient-bitcoin border-bitcoin/50 shadow-glow-bitcoin";
    case "rare":
      return "bg-gradient-cyber border-cyber/50 shadow-glow-cyber";
    case "common":
      return "bg-card border-border";
    default:
      return "bg-card border-border";
  }
};

const getTeamColor = (team: string) => {
  switch (team) {
    case "murat":
      return "border-l-4 border-l-bitcoin";
    case "jager":
      return "border-l-4 border-l-hunter";
    case "neutral":
      return "border-l-4 border-l-cyber";
    default:
      return "border-l-4 border-l-muted";
  }
};

export const GameCard = ({
  name,
  rarity,
  team,
  stats,
  ability,
  description,
  image,
}: GameCardProps) => {
  return (
    <Card
      className={`w-full max-w-sm transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${getRarityColor(
        rarity
      )} ${getTeamColor(team)}`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          <Badge variant="outline" className="capitalize">
            {rarity}
          </Badge>
        </div>
        <Badge variant="secondary" className="w-fit capitalize">
          Team {team}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {image && (
          <div className="w-full h-32 bg-gradient-dark rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Card Art</span>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-dark-surface p-2 rounded">
            <div className="text-xs text-muted-foreground">Skill</div>
            <div className="font-bold text-bitcoin">{stats.skill}/10</div>
          </div>
          <div className="bg-dark-surface p-2 rounded">
            <div className="text-xs text-muted-foreground">Intel</div>
            <div className="font-bold text-cyber">{stats.intelligence}/10</div>
          </div>
          <div className="bg-dark-surface p-2 rounded">
            <div className="text-xs text-muted-foreground">Strength</div>
            <div className="font-bold text-hunter">{stats.strength}/10</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-dark-surface p-3 rounded-lg">
            <h4 className="font-semibold text-primary text-sm mb-1">Special Ability</h4>
            <p className="text-xs text-muted-foreground">{ability}</p>
          </div>
          
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};