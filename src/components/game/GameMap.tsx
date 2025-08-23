import { motion } from "framer-motion";
import { MapPin, Target, Zap, Shield, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [mapInitialized, setMapInitialized] = useState(false);

  // Bielefeld old town coordinates
  const bielefeldCenter: [number, number] = [8.5325, 52.0302];

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapInitialized) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: bielefeldCenter,
        zoom: 14,
        pitch: 0,
        bearing: 0
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setMapInitialized(true);
      });

    } catch (error) {
      console.error("Mapbox initialization error:", error);
    }

    return () => {
      map.current?.remove();
      setMapInitialized(false);
    };
  }, [mapboxToken, mapInitialized]);

  const initializeMap = () => {
    if (mapboxToken.trim()) {
      setMapInitialized(false); // Reset to trigger useEffect
    }
  };

  return (
    <div className="space-y-4">
      {/* Mapbox Token Input */}
      {!mapInitialized && (
        <div className="p-4 bg-dark-surface rounded-lg border border-bitcoin/20">
          <h4 className="text-sm font-medium mb-2 text-bitcoin">Mapbox Token benötigt</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Holen Sie sich Ihren kostenlosen Public Token auf{" "}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-cyber hover:underline">
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGp..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1 text-xs"
            />
            <Button onClick={initializeMap} variant="cyber" size="sm">
              Karte laden
            </Button>
          </div>
        </div>
      )}

      <div className="relative w-full h-96 bg-dark-surface rounded-lg border border-bitcoin/20 overflow-hidden">
        {/* Mapbox Container - Real Streets Map */}
        <div ref={mapContainer} className="absolute inset-0 rounded-lg opacity-90" />
        
        {/* Game Overlay Container - Game Elements on Real Map */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10">
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
              className={`absolute w-16 h-16 ${zone.color} rounded-full opacity-40 flex items-center justify-center backdrop-blur-sm`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="text-xs font-bold text-white drop-shadow-lg">{zone.name}</span>
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
                strokeWidth="3"
                strokeDasharray="8,4"
                opacity="0.8"
                filter="drop-shadow(0 0 4px rgba(0,0,0,0.5))"
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
                strokeWidth="4"
                strokeDasharray="12,6"
                opacity="0.9"
                filter="drop-shadow(0 0 8px hsl(var(--bitcoin-gold)))"
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
              <div className="w-10 h-10 bg-hunter rounded-full flex items-center justify-center shadow-glow-hunter border-2 border-white/20">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}

          {/* Start Point */}
          <div
            className="absolute z-5 flex items-center justify-center"
            style={{ left: "10%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="w-8 h-8 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin border-2 border-white/20">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -bottom-8 text-xs text-bitcoin font-bold bg-black/50 px-2 py-1 rounded">START</span>
          </div>

          {/* End Point */}
          <div
            className="absolute z-5 flex items-center justify-center"
            style={{ left: "90%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="w-8 h-8 bg-gradient-cyber rounded-full flex items-center justify-center shadow-glow-cyber border-2 border-white/20">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -bottom-8 text-xs text-cyber font-bold bg-black/50 px-2 py-1 rounded">ZIEL</span>
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
            <div className={`w-10 h-10 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin border-2 border-white/30 ${effects.confusion ? 'animate-pulse' : ''}`}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-8 text-xs text-bitcoin font-bold bg-black/70 px-2 py-1 rounded">MURAT</span>
            {effects.confusion && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Zap className="w-5 h-5 text-hunter drop-shadow-lg" />
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
            <div className="w-10 h-10 bg-gradient-hunter rounded-full flex items-center justify-center shadow-glow-hunter border-2 border-white/30">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-8 text-xs text-hunter font-bold bg-black/70 px-2 py-1 rounded">JÄGER</span>
          </motion.div>
        </div>
        
        {/* Loading overlay when map is not initialized */}
        {!mapInitialized && mapboxToken && (
          <div className="absolute inset-0 bg-gradient-dark rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-bitcoin border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Lade Bielefeld Karte...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};