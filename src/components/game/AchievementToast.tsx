import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: "trophy" | "star" | "zap" | "shield";
  rarity: "common" | "rare" | "legendary";
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onComplete?: () => void;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "trophy": return Trophy;
    case "star": return Star;
    case "zap": return Zap;
    case "shield": return Shield;
    default: return Trophy;
  }
};

const getRarityStyle = (rarity: string) => {
  switch (rarity) {
    case "legendary": return "bg-gradient-bitcoin border-bitcoin/50 text-bitcoin";
    case "rare": return "bg-gradient-cyber border-cyber/50 text-cyber";
    case "common": return "bg-gradient-hunter border-hunter/50 text-hunter";
    default: return "bg-gradient-dark border-border";
  }
};

export const AchievementToast = ({ achievement, onComplete }: AchievementToastProps) => {
  if (!achievement) return null;

  const Icon = getIcon(achievement.icon);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -100, opacity: 0, scale: 0.8 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
        className="fixed top-4 right-4 z-[100] pointer-events-none"
        onAnimationComplete={() => {
          setTimeout(() => onComplete?.(), 3000);
        }}
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(255, 193, 7, 0.5)",
              "0 0 40px rgba(255, 193, 7, 0.8)",
              "0 0 20px rgba(255, 193, 7, 0.5)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`p-4 rounded-lg border-2 ${getRarityStyle(achievement.rarity)} backdrop-blur-md shadow-2xl max-w-sm`}
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 0.6, 
                repeat: 2, 
                ease: "easeInOut" 
              }}
              className="flex-shrink-0"
            >
              <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-sm truncate">
                  {achievement.title}
                </h4>
                <Badge variant="outline" className="text-xs capitalize">
                  {achievement.rarity}
                </Badge>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};