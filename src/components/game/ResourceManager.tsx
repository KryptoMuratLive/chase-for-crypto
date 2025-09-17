import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Shield, Sword, Brain } from "lucide-react";

interface ResourceManagerProps {
  team: "murat" | "jager";
  resources: {
    energy: number;
    maxEnergy: number;
    influence: number;
    maxInfluence: number;
    tech: number;
    maxTech: number;
  };
  buffs: Array<{
    id: string;
    name: string;
    type: "buff" | "debuff";
    duration: number;
    effect: string;
  }>;
}

export const ResourceManager = ({ team, resources, buffs }: ResourceManagerProps) => {
  const teamColor = team === "murat" ? "bitcoin" : "hunter";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${
        team === "murat" 
          ? "bg-gradient-to-br from-bitcoin/10 to-bitcoin/5 border-bitcoin/30" 
          : "bg-gradient-to-br from-hunter/10 to-hunter/5 border-hunter/30"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold text-sm text-${teamColor}`}>
          Team {team === "murat" ? "Murat" : "Jäger"} Ressourcen
        </h3>
        <Badge variant="outline" className="text-xs">
          {buffs.length} Effekte aktiv
        </Badge>
      </div>

      {/* Resource Bars */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className={`w-4 h-4 text-${teamColor}`} />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Energie</span>
              <span>{resources.energy}/{resources.maxEnergy}</span>
            </div>
            <Progress 
              value={(resources.energy / resources.maxEnergy) * 100} 
              className="h-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 text-${teamColor}`} />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Einfluss</span>
              <span>{resources.influence}/{resources.maxInfluence}</span>
            </div>
            <Progress 
              value={(resources.influence / resources.maxInfluence) * 100} 
              className="h-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Brain className={`w-4 h-4 text-${teamColor}`} />
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Tech</span>
              <span>{resources.tech}/{resources.maxTech}</span>
            </div>
            <Progress 
              value={(resources.tech / resources.maxTech) * 100} 
              className="h-2"
            />
          </div>
        </div>
      </div>

      {/* Active Buffs/Debuffs */}
      {buffs.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground">Aktive Effekte</h4>
          <div className="flex flex-wrap gap-2">
            {buffs.map((buff) => (
              <motion.div
                key={buff.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  buff.type === "buff" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {buff.type === "buff" ? "↑" : "↓"}
                <span>{buff.name}</span>
                <Badge variant="outline" className="text-xs ml-1">
                  {buff.duration}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};