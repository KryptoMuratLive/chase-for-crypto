import { motion } from "framer-motion";
import { MapPin, Target, Zap, Shield, AlertTriangle } from "lucide-react";

interface GameMapProps {
  muratPosition: { x: number; y: number };
  jagerPosition: { x: number; y: number };
  effects: {
    scanEffect: boolean;
    blockades: { x: number; y: number }[];
    secretPath: boolean;
    confusion: boolean;
  };
}

const zones = [
  { id: "city", name: "Stadt", x: 20, y: 40, color: "bg-gradient-cyber" },
  { id: "forest", name: "Wald", x: 60, y: 20, color: "bg-gradient-bitcoin" },
  { id: "mountain", name: "Berg", x: 80, y: 60, color: "bg-gradient-hunter" },
];

const paths = [
  { from: { x: 10, y: 50 }, to: { x: 30, y: 45 }, id: "path1" },
  { from: { x: 30, y: 45 }, to: { x: 50, y: 25 }, id: "path2" },
  { from: { x: 50, y: 25 }, to: { x: 70, y: 30 }, id: "path3" },
  { from: { x: 70, y: 30 }, to: { x: 90, y: 50 }, id: "path4" },
  { from: { x: 30, y: 45 }, to: { x: 70, y: 65 }, id: "path5" },
  { from: { x: 70, y: 65 }, to: { x: 90, y: 50 }, id: "path6" },
];

const secretPaths = [
  { from: { x: 20, y: 60 }, to: { x: 80, y: 40 }, id: "secret1" },
];

export const GameMap = ({ muratPosition, jagerPosition, effects }: GameMapProps) => {
  return (
    <div className="relative w-full h-96 bg-gradient-dark rounded-lg border border-bitcoin/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-bitcoin/20 via-transparent to-hunter/20" />
      </div>

      {/* Scan Effect */}
      {effects.scanEffect && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-hunter/50 to-transparent z-20"
        />
      )}

      {/* Zones */}
      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`absolute w-16 h-16 ${zone.color} rounded-full opacity-30 flex items-center justify-center`}
          style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <span className="text-xs font-bold text-foreground">{zone.name}</span>
        </div>
      ))}

      {/* Normal Paths */}
      {paths.map((path) => (
        <svg
          key={path.id}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <line
            x1={`${path.from.x}%`}
            y1={`${path.from.y}%`}
            x2={`${path.to.x}%`}
            y2={`${path.to.y}%`}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>
      ))}

      {/* Secret Paths */}
      {effects.secretPath && secretPaths.map((path) => (
        <motion.svg
          key={path.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <line
            x1={`${path.from.x}%`}
            y1={`${path.from.y}%`}
            x2={`${path.to.x}%`}
            y2={`${path.to.y}%`}
            stroke="hsl(var(--bitcoin-gold))"
            strokeWidth="3"
            strokeDasharray="10,5"
            opacity="0.8"
          />
        </motion.svg>
      ))}

      {/* Blockades */}
      {effects.blockades.map((blockade, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute z-10 flex items-center justify-center"
          style={{ 
            left: `${blockade.x}%`, 
            top: `${blockade.y}%`, 
            transform: "translate(-50%, -50%)" 
          }}
        >
          <div className="w-8 h-8 bg-hunter rounded-full flex items-center justify-center shadow-glow-hunter">
            <AlertTriangle className="w-4 h-4 text-foreground" />
          </div>
        </motion.div>
      ))}

      {/* Start Point */}
      <div
        className="absolute z-5 flex items-center justify-center"
        style={{ left: "10%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="w-6 h-6 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin">
          <MapPin className="w-3 h-3 text-primary-foreground" />
        </div>
        <span className="absolute -bottom-6 text-xs text-bitcoin font-bold">START</span>
      </div>

      {/* End Point */}
      <div
        className="absolute z-5 flex items-center justify-center"
        style={{ left: "90%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="w-6 h-6 bg-gradient-cyber rounded-full flex items-center justify-center shadow-glow-cyber">
          <Target className="w-3 h-3 text-foreground" />
        </div>
        <span className="absolute -bottom-6 text-xs text-cyber font-bold">ZIEL</span>
      </div>

      {/* Murat Character */}
      <motion.div
        animate={{ 
          left: `${muratPosition.x}%`, 
          top: `${muratPosition.y}%` 
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute z-10 flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className={`w-8 h-8 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin ${effects.confusion ? 'animate-pulse' : ''}`}>
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="absolute -bottom-6 text-xs text-bitcoin font-bold">MURAT</span>
        {effects.confusion && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-3 -right-3"
          >
            <Zap className="w-4 h-4 text-hunter" />
          </motion.div>
        )}
      </motion.div>

      {/* Jäger Character */}
      <motion.div
        animate={{ 
          left: `${jagerPosition.x}%`, 
          top: `${jagerPosition.y}%` 
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute z-10 flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-8 h-8 bg-gradient-hunter rounded-full flex items-center justify-center shadow-glow-hunter">
          <Target className="w-4 h-4 text-foreground" />
        </div>
        <span className="absolute -bottom-6 text-xs text-hunter font-bold">JÄGER</span>
      </motion.div>
    </div>
  );
};