import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Crown } from "lucide-react";
import { GameCard } from "./PlayableCard";

interface ComboSystemProps {
  detectedCombos: Array<{
    id: string;
    name: string;
    cards: GameCard[];
    effect: string;
    multiplier: number;
    rarity: "common" | "rare" | "legendary";
  }>;
  onActivateCombo: (comboId: string) => void;
}

const COMBO_DEFINITIONS = [
  {
    id: "stealth-master",
    name: "Stealth Master",
    requiredCards: ["murat-main", "hacker", "hide"],
    effect: "Murat wird für 2 Runden völlig unsichtbar und kann durch Blockaden gehen",
    multiplier: 3.0,
    rarity: "legendary" as const
  },
  {
    id: "digital-warfare",
    name: "Digitaler Krieg",
    requiredCards: ["hacker", "crowdsourcing"],
    effect: "Alle Team Jäger Scan-Effekte werden für 3 Runden blockiert",
    multiplier: 2.5,
    rarity: "rare" as const
  },
  {
    id: "community-power",
    name: "Community Power",
    requiredCards: ["crowdsourcing", "live-donation"],
    effect: "Öffnet 2 geheime Pfade und gewährt +50 Bonus-Punkte",
    multiplier: 2.0,
    rarity: "rare" as const
  },
  {
    id: "hunter-supremacy",
    name: "Jäger Suprematie",
    requiredCards: ["hunter-main", "drone-pilot", "saboteur"],
    effect: "Komplette Kartenüberwachung + 3 Fallen gleichzeitig",
    multiplier: 3.5,
    rarity: "legendary" as const
  },
  {
    id: "trap-network",
    name: "Fallennetzwerk",
    requiredCards: ["saboteur", "set-trap", "biker-gang"],
    effect: "Erstellt ein Netzwerk aus 5 Fallen auf der Karte",
    multiplier: 2.5,
    rarity: "rare" as const
  },
  {
    id: "surveillance-grid",
    name: "Überwachungsnetz",
    requiredCards: ["drone-pilot", "passerby", "bitcoin-transaction"],
    effect: "Permanente Sichtbarkeit von Murat für 4 Runden",
    multiplier: 2.0,
    rarity: "rare" as const
  }
];

export const ComboSystem = ({ detectedCombos, onActivateCombo }: ComboSystemProps) => {
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary": return <Crown className="w-4 h-4 text-yellow-400" />;
      case "rare": return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <Zap className="w-4 h-4 text-blue-400" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
      case "rare": return "from-purple-500/20 to-purple-600/20 border-purple-500/50";
      default: return "from-blue-500/20 to-blue-600/20 border-blue-500/50";
    }
  };

  return (
    <AnimatePresence>
      {detectedCombos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4"
        >
          <Card className="bg-dark-surface/95 backdrop-blur-md border-primary/50 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                Kombos verfügbar!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectedCombos.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg bg-gradient-to-r ${getRarityColor(combo.rarity)} border cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => onActivateCombo(combo.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getRarityIcon(combo.rarity)}
                      <h3 className="font-bold text-sm text-foreground">{combo.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {combo.multiplier}x Multiplikator
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {combo.effect}
                  </p>
                  
                  <div className="flex gap-1">
                    {combo.cards.map((card, cardIndex) => (
                      <Badge 
                        key={cardIndex} 
                        variant="secondary" 
                        className="text-xs bg-dark-surface/50"
                      >
                        {card.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <motion.div
                    className="mt-3 text-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xs font-bold text-primary">
                      Klicken zum Aktivieren
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};