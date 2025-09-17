import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Target, Zap, Shield } from "lucide-react";

interface GamePhaseManagerProps {
  currentPhase: "preparation" | "action" | "resolution" | "endgame";
  phaseTimer: number;
  maxPhaseTime: number;
  round: number;
  maxRounds: number;
  activePlayer: "murat" | "jager" | "both";
  phaseActions: Array<{
    id: string;
    name: string;
    description: string;
    available: boolean;
  }>;
}

const PHASE_DESCRIPTIONS = {
  preparation: {
    title: "Vorbereitungsphase",
    description: "Sammle Ressourcen und plane deine Strategie",
    icon: Shield,
    color: "blue"
  },
  action: {
    title: "Aktionsphase", 
    description: "Spiele Karten und führe Aktionen aus",
    icon: Zap,
    color: "yellow"
  },
  resolution: {
    title: "Auflösungsphase",
    description: "Effekte werden angewendet und Schäden berechnet",
    icon: Target,
    color: "red"
  },
  endgame: {
    title: "Endspielphase",
    description: "Finale Züge und Siegbedingungen prüfen",
    icon: Target,
    color: "purple"
  }
};

export const GamePhaseManager = ({
  currentPhase,
  phaseTimer,
  maxPhaseTime,
  round,
  maxRounds,
  activePlayer,
  phaseActions
}: GamePhaseManagerProps) => {
  const phaseInfo = PHASE_DESCRIPTIONS[currentPhase];
  const IconComponent = phaseInfo.icon;
  
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "preparation": return "from-blue-500/20 to-blue-600/20 border-blue-500/50";
      case "action": return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
      case "resolution": return "from-red-500/20 to-red-600/20 border-red-500/50";
      case "endgame": return "from-purple-500/20 to-purple-600/20 border-purple-500/50";
      default: return "from-gray-500/20 to-gray-600/20 border-gray-500/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className={`bg-gradient-to-r ${getPhaseColor(currentPhase)} border backdrop-blur-sm`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-lg text-foreground">{phaseInfo.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{phaseInfo.description}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                Runde {round}/{maxRounds}
              </Badge>
              {activePlayer !== "both" && (
                <div className={`text-sm font-bold ${
                  activePlayer === "murat" ? "text-bitcoin" : "text-hunter"
                }`}>
                  Team {activePlayer === "murat" ? "Murat" : "Jäger"} ist dran
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Phase Timer */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Verbleibende Zeit</span>
              </div>
              <span className="text-sm font-mono">
                {Math.floor(phaseTimer / 60)}:{(phaseTimer % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <Progress 
              value={(phaseTimer / maxPhaseTime) * 100} 
              className="h-2"
            />
          </div>

          {/* Available Actions */}
          {phaseActions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Verfügbare Aktionen
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phaseActions.map((action) => (
                  <motion.div
                    key={action.id}
                    whileHover={{ scale: action.available ? 1.02 : 1 }}
                    className={`p-3 rounded-lg border transition-all ${
                      action.available 
                        ? "bg-dark-surface/50 border-primary/30 cursor-pointer hover:border-primary/50" 
                        : "bg-dark-surface/20 border-muted/20 opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-semibold text-foreground">
                        {action.name}
                      </h5>
                      {action.available && (
                        <Badge variant="outline" className="text-xs">
                          Verfügbar
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Phase Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {Object.keys(PHASE_DESCRIPTIONS).map((phase, index) => (
                <motion.div
                  key={phase}
                  className={`w-3 h-3 rounded-full border-2 ${
                    phase === currentPhase 
                      ? "bg-primary border-primary" 
                      : "bg-transparent border-muted"
                  }`}
                  animate={phase === currentPhase ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};