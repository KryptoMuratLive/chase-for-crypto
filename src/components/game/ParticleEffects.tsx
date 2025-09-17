import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: string;
  x: number;
  y: number;
  type: "explosion" | "success" | "sparkle";
}

interface ParticleEffectsProps {
  trigger: { x: number; y: number; type: "explosion" | "success" | "sparkle" } | null;
  onComplete?: () => void;
}

export const ParticleEffects = ({ trigger, onComplete }: ParticleEffectsProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles: Particle[] = [];
    const particleCount = trigger.type === "explosion" ? 12 : 8;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: `${trigger.type}-${i}-${Date.now()}`,
        x: trigger.x + (Math.random() - 0.5) * 100,
        y: trigger.y + (Math.random() - 0.5) * 100,
        type: trigger.type
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [trigger, onComplete]);

  const getParticleStyle = (type: string) => {
    switch (type) {
      case "explosion":
        return "w-3 h-3 bg-hunter rounded-full shadow-glow-hunter";
      case "success":
        return "w-2 h-2 bg-bitcoin rounded-full shadow-glow-bitcoin";
      case "sparkle":
        return "w-1 h-1 bg-cyber rounded-full shadow-glow-cyber";
      default:
        return "w-2 h-2 bg-white rounded-full";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{ 
              x: particle.x + (Math.random() - 0.5) * 200,
              y: particle.y + (Math.random() - 0.5) * 200,
              scale: [0, 1, 0],
              opacity: [1, 1, 0] 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut" 
            }}
            className={`absolute ${getParticleStyle(particle.type)}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};