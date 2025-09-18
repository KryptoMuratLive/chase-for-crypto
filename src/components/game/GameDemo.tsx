import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameMap } from "./GameMap";
import { PlayerHand } from "./PlayerHand";
import { PlayableCard, GameCard } from "./PlayableCard";
import { ParticleEffects } from "./ParticleEffects";
import { AchievementToast } from "./AchievementToast";
import { ResourceManager } from "./ResourceManager";
import { ComboSystem } from "./ComboSystem";
import { GamePhaseManager } from "./GamePhaseManager";
import { Trophy, RotateCcw, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GamePhase = "preparation" | "action" | "resolution" | "endgame" | "finished";
type ActivePlayer = "murat" | "jager" | "both";

interface Resources {
  energy: number;
  maxEnergy: number;
  influence: number;
  maxInfluence: number;
  tech: number;
  maxTech: number;
}

interface Buff {
  id: string;
  name: string;
  type: "buff" | "debuff";
  duration: number;
  effect: string;
  target: "murat" | "jager" | "both";
}

interface ComboDefinition {
  id: string;
  name: string;
  requiredCards: string[];
  effect: string;
  multiplier: number;
  rarity: "common" | "rare" | "legendary";
}

const DEMO_CARDS: GameCard[] = [
  // Team Murat - Charakter-NFT-Karten
  {
    id: "murat-main",
    name: "Murat",
    type: "character",
    team: "murat",
    rarity: "legendary",
    stats: { skill: 9, intelligence: 8, strength: 7 },
    ability: "Täuschungsmanöver - Kann eine gegnerische Aktion neutralisieren und gewinnt einen Zug Vorsprung.",
    description: "Der Held der Geschichte, der die Bitcoin sicher an sein Ziel bringen muss. Seine Beweglichkeit und Cleverness sind seine größten Stärken."
  },
  {
    id: "hacker",
    name: "Der Hacker",
    type: "character",
    team: "murat",
    rarity: "rare",
    stats: { skill: 5, intelligence: 10, strength: 2 },
    ability: "Digitale Ablenkung - Blockiert die Ortungsfähigkeiten von Team Jäger für 3 Züge.",
    description: "Ein Meister der digitalen Welt, der Überwachungssysteme und Ortungsversuche des Jägers sabotieren kann."
  },
  {
    id: "informant",
    name: "Der Informant",
    type: "character",
    team: "murat",
    rarity: "common",
    stats: { skill: 3, intelligence: 7, strength: 3 },
    ability: "Versteckter Hinweis - Findet einen geheimen Pfad auf der Karte, der Murats Bewegung zum nächsten Checkpoint beschleunigt.",
    description: "Ein Unterstützer aus der Community, der im Verborgenen agiert und wichtige Informationen überbringt."
  },
  {
    id: "urban-climber",
    name: "Städtischer Kletterer",
    type: "character",
    team: "murat",
    rarity: "rare",
    stats: { skill: 9, intelligence: 4, strength: 6 },
    ability: "Parkour - Ignoriert eine Straßenblockade, die von Team Jäger platziert wurde.",
    description: "Ein Athlet, der sich schnell durch urbane Landschaften bewegt und physische Hindernisse überwinden kann."
  },
  {
    id: "murat-friend",
    name: "Murats Freund",
    type: "character",
    team: "murat",
    rarity: "common",
    stats: { skill: 3, intelligence: 5, strength: 2 },
    ability: "Ablenkung schaffen - Blockiert eine einzelne gegnerische Karte für einen Zug.",
    description: "Eine loyale Unterstützung, die zwar nicht im Rampenlicht steht, aber im entscheidenden Moment helfen kann."
  },
  // Team Murat - Aktionskarten (Keine NFTs)
  {
    id: "hide",
    name: "Verstecken",
    type: "action",
    team: "murat",
    rarity: "common",
    ability: "Verhindert für eine Runde, dass Murat von Team Jäger aufgedeckt werden kann.",
    description: "Eine wichtige Verteidigungskarte, die den Jäger in die Irre führt."
  },
  {
    id: "call-police-murat",
    name: "Polizei rufen",
    type: "action",
    team: "murat",
    rarity: "common",
    ability: "Ruft die Polizei, die entweder Murat oder den Jäger für einen Zug blockiert.",
    description: "Kann strategisch eingesetzt werden, um entweder Murat zu schützen oder den Jäger aufzuhalten."
  },
  {
    id: "crowdsourcing",
    name: "Crowdsourcing-Hinweis",
    type: "community",
    team: "murat",
    rarity: "rare",
    ability: "Öffnet einen geheimen Pfad.",
    description: "Eine Community-Karte, die durch eine Abstimmung ausgelöst wird und einen neuen, nicht sichtbaren Weg auf der Karte freischaltet."
  },
  {
    id: "live-donation",
    name: "Live-Spender",
    type: "community",
    team: "murat",
    rarity: "rare",
    ability: "Schaltet eine besondere Fortbewegungsmethode frei (z.B. ein Taxi), die Murat eine weite Distanz schnell zurücklegen lässt.",
    description: "Eine Community-Karte, die durch Spenden ausgelöst wird und den Spielern die Möglichkeit gibt, direkt in das Spiel einzugreifen."
  },
  
  // Team Jäger - Charakter-NFT-Karten
  {
    id: "hunter-main",
    name: "Der Jäger",
    type: "character",
    team: "jager",
    rarity: "legendary",
    stats: { skill: 8, intelligence: 10, strength: 7 },
    ability: "Komplette Überwachung - Deckt die Position von Murat auf der gesamten Karte für 3 Runden auf.",
    description: "Der Hauptantagonist der Serie, der über beispiellose Ressourcen und taktische Fähigkeiten verfügt. Er ist das größte Hindernis für Murat."
  },
  {
    id: "drone-pilot",
    name: "Der Drohnenpilot",
    type: "character",
    team: "jager",
    rarity: "rare",
    stats: { skill: 4, intelligence: 9, strength: 3 },
    ability: "Luftüberwachung - Deckt die Position aller Team Murat-Karten im Umkreis von zwei Zonen auf.",
    description: "Ein Spezialist für die Luftüberwachung. Seine Drohnen ermöglichen es, versteckte Wege zu entdecken und Murats Fortschritt zu verfolgen."
  },
  {
    id: "saboteur",
    name: "Der Saboteur",
    type: "character",
    team: "jager",
    rarity: "common",
    stats: { skill: 8, intelligence: 6, strength: 7 },
    ability: "Sprengfalle - Platziert eine Bombe auf dem Weg, die Murat dazu zwingt, 2 Runden lang zu pausieren.",
    description: "Ein gefährlicher Experte für Sprengstoffe und Fallen, der mit seinen Fallen Murats Route unpassierbar machen kann."
  },
  {
    id: "biker-gang",
    name: "Rockerbande",
    type: "character",
    team: "jager",
    rarity: "common",
    stats: { skill: 6, intelligence: 4, strength: 9 },
    ability: "Straßenblockade - Blockiert eine bestimmte Zone auf der Karte für zwei Runden. Murat muss diese Zone umgehen, was seinen Fortschritt verlangsamt.",
    description: "Eine Gruppe rauer Biker, die für den Jäger arbeiten. Ihre rohe Kraft macht sie zu einer effektiven physischen Barriere."
  },
  {
    id: "passerby",
    name: "Der Passant",
    type: "character",
    team: "jager",
    rarity: "common",
    stats: { skill: 4, intelligence: 3, strength: 3 },
    ability: "Hinweis geben - Kann die Position von Murat für eine Runde aufdecken, wenn er sich in der Nähe befindet.",
    description: "Ein unwissender Bürger, der Murat zufällig sieht und seinen Standort an den Jäger weitergibt."
  },
  // Team Jäger - Aktionskarten (Keine NFTs)
  {
    id: "set-trap",
    name: "Falle Stellen",
    type: "action",
    team: "jager",
    rarity: "common",
    ability: "Platziert eine einfache Falle auf der Karte, die Murats Geschwindigkeit für einen Zug reduziert.",
    description: "Eine einfache, aber nützliche Karte, um den Fortschritt von Murat zu behindern."
  },
  {
    id: "call-police",
    name: "Polizei rufen",
    type: "action",
    team: "jager",
    rarity: "common",
    ability: "Ruft die Polizei, die entweder Murat oder den Jäger für einen Zug blockiert.",
    description: "Kann strategisch eingesetzt werden, um entweder Murat aufzuhalten oder den Jäger zu schützen."
  },
  {
    id: "bitcoin-transaction",
    name: "Bitcoin-Transaktion",
    type: "action",
    team: "jager",
    rarity: "rare",
    ability: "Kann eine Spur legen, indem sie die Transaktion des Wallets auf der Blockchain sichtbar macht.",
    description: "Erhöht die Sichtbarkeit von Murats Figur auf der Karte, damit das Team Jäger ihn besser verfolgen kann."
  }
];

interface GameDemoProps {
  onBackToHome?: () => void;
}

export const GameDemo = ({ onBackToHome }: GameDemoProps = {}) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("preparation");
  const [activePlayer, setActivePlayer] = useState<ActivePlayer>("murat");
  const [round, setRound] = useState(1);
  const [playedCards, setPlayedCards] = useState<string[]>([]);
  const [currentPlayedCard, setCurrentPlayedCard] = useState<GameCard | null>(null);
  const [recentlyPlayedCards, setRecentlyPlayedCards] = useState<GameCard[]>([]);
  const [playedCardAnimation, setPlayedCardAnimation] = useState<{x: number, y: number} | null>(null);
  
  // Enhanced Game State
  const [phaseTimer, setPhaseTimer] = useState(30);
  const [maxPhaseTime] = useState(30);
  const [detectedCombos, setDetectedCombos] = useState<any[]>([]);
  const [activeBuffs, setActiveBuffs] = useState<Buff[]>([]);
  
  // Resource System - Start with high resources for demo
  const [muratResources, setMuratResources] = useState<Resources>({
    energy: 10, maxEnergy: 10,
    influence: 8, maxInfluence: 10,
    tech: 8, maxTech: 10
  });
  const [jagerResources, setJagerResources] = useState<Resources>({
    energy: 10, maxEnergy: 10,
    influence: 8, maxInfluence: 10,
    tech: 8, maxTech: 10
  });
  
  // Visual effects
  const [particleEffect, setParticleEffect] = useState<{x: number, y: number, type: "explosion" | "success" | "sparkle"} | null>(null);
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const { toast } = useToast();
  
  // Score system
  const [scores, setScores] = useState({
    murat: 0,
    jager: 0
  });
  
  // Game state
  const [muratPosition, setMuratPosition] = useState({ x: 10, y: 50 });
  const [jagerPosition, setJagerPosition] = useState({ x: 15, y: 70 });
  const [gameEffects, setGameEffects] = useState({
    scanEffect: false,
    blockades: [] as { x: number; y: number }[],
    secretPath: false,
    confusion: false,
  });
  const [winner, setWinner] = useState<string | null>(null);

  const muratCards = DEMO_CARDS.filter(card => card.team === "murat");
  const jagerCards = DEMO_CARDS.filter(card => card.team === "jager");

  // Enhanced Combo System
  const COMBO_DEFINITIONS: ComboDefinition[] = [
    {
      id: "stealth-master",
      name: "Stealth Master",
      requiredCards: ["murat-main", "hacker", "hide"],
      effect: "Murat wird für 2 Runden völlig unsichtbar und kann durch Blockaden gehen",
      multiplier: 3.0,
      rarity: "legendary"
    },
    {
      id: "digital-warfare",
      name: "Digitaler Krieg",
      requiredCards: ["hacker", "crowdsourcing"],
      effect: "Alle Team Jäger Scan-Effekte werden für 3 Runden blockiert",
      multiplier: 2.5,
      rarity: "rare"
    },
    {
      id: "community-power",
      name: "Community Power",
      requiredCards: ["crowdsourcing", "live-donation"],
      effect: "Öffnet 2 geheime Pfade und gewährt +50 Bonus-Punkte",
      multiplier: 2.0,
      rarity: "rare"
    },
    {
      id: "hunter-supremacy",
      name: "Jäger Suprematie",
      requiredCards: ["hunter-main", "drone-pilot", "saboteur"],
      effect: "Komplette Kartenüberwachung + 3 Fallen gleichzeitig",
      multiplier: 3.5,
      rarity: "legendary"
    }
  ];

  // Phase Timer Effect
  useEffect(() => {
    if (gamePhase === "finished") return;
    
    const timer = setInterval(() => {
      setPhaseTimer(prev => {
        if (prev <= 1) {
          advancePhase();
          return maxPhaseTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase]);

  // Check for combos when cards are played
  useEffect(() => {
    checkForCombos();
  }, [playedCards]);

  // Update buffs duration
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBuffs(prev => prev
        .map(buff => ({ ...buff, duration: buff.duration - 1 }))
        .filter(buff => buff.duration > 0)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const advancePhase = () => {
    switch (gamePhase) {
      case "preparation":
        setGamePhase("action");
        // Restore resources at start of action phase
        restoreResources();
        break;
      case "action":
        setGamePhase("resolution");
        break;
      case "resolution":
        if (round >= 5) {
          setGamePhase("endgame");
        } else {
          setGamePhase("preparation");
          setRound(prev => prev + 1);
          setActivePlayer(activePlayer === "murat" ? "jager" : "murat");
        }
        break;
      case "endgame":
        determineWinner();
        break;
    }
  };

  const restoreResources = () => {
    setMuratResources(prev => ({
      ...prev,
      energy: Math.min(prev.energy + 2, prev.maxEnergy),
      influence: Math.min(prev.influence + 1, prev.maxInfluence),
      tech: Math.min(prev.tech + 1, prev.maxTech)
    }));
    
    setJagerResources(prev => ({
      ...prev,
      energy: Math.min(prev.energy + 2, prev.maxEnergy),
      influence: Math.min(prev.influence + 1, prev.maxInfluence),
      tech: Math.min(prev.tech + 1, prev.maxTech)
    }));
  };

  const checkForCombos = () => {
    const availableCombos = COMBO_DEFINITIONS.filter(combo => {
      return combo.requiredCards.every(cardId => playedCards.includes(cardId));
    });

    const newCombos = availableCombos.filter(combo => 
      !detectedCombos.some(detected => detected.id === combo.id)
    );

    if (newCombos.length > 0) {
      setDetectedCombos(prev => [...prev, ...newCombos.map(combo => ({
        ...combo,
        cards: combo.requiredCards.map(cardId => 
          DEMO_CARDS.find(card => card.id === cardId)!
        )
      }))]);
    }
  };

  const activateCombo = (comboId: string) => {
    const combo = detectedCombos.find(c => c.id === comboId);
    if (!combo) return;

    // Apply combo effects
    applyComboEffect(combo);
    
    // Remove combo from available list
    setDetectedCombos(prev => prev.filter(c => c.id !== comboId));
    
    // Add achievement for combo
    setCurrentAchievement({
      id: `combo-${comboId}`,
      title: `${combo.name} Combo!`,
      description: `${combo.multiplier}x Multiplikator aktiviert`,
      icon: "sparkles",
      rarity: combo.rarity
    });
  };

  const applyComboEffect = (combo: any) => {
    const team = combo.cards[0]?.team || "murat";
    
    // Apply score multiplier
    setScores(prev => ({
      ...prev,
      [team]: prev[team] * combo.multiplier
    }));

    // Apply specific combo effects
    switch (combo.id) {
      case "stealth-master":
        setActiveBuffs(prev => [...prev, {
          id: "stealth",
          name: "Stealth Master",
          type: "buff",
          duration: 6, // 2 rounds = 6 phases
          effect: "Unsichtbarkeit + Blockaden ignorieren",
          target: "murat"
        }]);
        break;
      case "digital-warfare":
        setActiveBuffs(prev => [...prev, {
          id: "scan-block",
          name: "Scan Blocker",
          type: "debuff",
          duration: 9, // 3 rounds
          effect: "Scan-Effekte blockiert",
          target: "jager"
        }]);
        break;
      case "hunter-supremacy":
        setActiveBuffs(prev => [...prev, {
          id: "supremacy",
          name: "Jäger Suprematie",
          type: "buff",
          duration: 6,
          effect: "Komplette Überwachung + 3 Fallen",
          target: "jager"
        }]);
        break;
    }
  };

  const handlePlayCard = async (card: GameCard) => {
    // Check if card was already played
    if (playedCards.includes(card.id)) {
      toast({
        title: "Karte bereits gespielt!",
        description: "Diese Karte wurde bereits in dieser Runde gespielt.",
        variant: "destructive",
      });
      return;
    }

    // Simplified resource check - always allow card play if player has at least 1 energy
    const currentResources = card.team === "murat" ? muratResources : jagerResources;
    if (currentResources.energy < 1) {
      toast({
        title: "Keine Energie!",
        description: "Du benötigst mindestens 1 Energie um eine Karte zu spielen.",
        variant: "destructive",
      });
      return;
    }

    // Consume only 1 energy per card (simplified)
    if (card.team === "murat") {
      setMuratResources(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - 1)
      }));
    } else {
      setJagerResources(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - 1)
      }));
    }
    
    setCurrentPlayedCard(card);
    setPlayedCards(prev => [...prev, card.id]);
    setRecentlyPlayedCards(prev => [card, ...prev].slice(0, 3));
    
    // Animated card playing - card flies to map
    setPlayedCardAnimation({ x: 50, y: 50 });
    setTimeout(() => setPlayedCardAnimation(null), 1000);
    
    // Update scores based on card effects
    updateScore(card);
    
    // Check for achievements
    checkAchievements(card);
    
    // Apply card effects with visual feedback
    await applyCardEffect(card);
    
    // Show success particle effect
    if (card.team === "murat" && card.rarity === "legendary") {
      setParticleEffect({ x: muratPosition.x * 4, y: muratPosition.y * 2, type: "success" });
    }

    // Clear current played card after animation
    setTimeout(() => setCurrentPlayedCard(null), 2000);
  };

  const calculateResourceCost = (card: GameCard) => {
    const baseCost = { energy: 1, influence: 0, tech: 0 };
    
    if (card.rarity === "legendary") {
      return { energy: 3, influence: 2, tech: 1 };
    } else if (card.rarity === "rare") {
      return { energy: 2, influence: 1, tech: 1 };
    } else if (card.type === "character") {
      return { energy: 2, influence: 1, tech: 0 };
    } else if (card.type === "community") {
      return { energy: 1, influence: 2, tech: 1 };
    }
    
    return baseCost;
  };

  const canAffordCard = (card: GameCard, resources: Resources) => {
    const cost = calculateResourceCost(card);
    return resources.energy >= cost.energy && 
           resources.influence >= cost.influence &&
           resources.tech >= cost.tech;
  };

  const consumeResources = (card: GameCard) => {
    const cost = calculateResourceCost(card);
    
    if (card.team === "murat") {
      setMuratResources(prev => ({
        ...prev,
        energy: prev.energy - cost.energy,
        influence: prev.influence - cost.influence,
        tech: prev.tech - cost.tech
      }));
    } else {
      setJagerResources(prev => ({
        ...prev,
        energy: prev.energy - cost.energy,
        influence: prev.influence - cost.influence,
        tech: prev.tech - cost.tech
      }));
    }
  };
  
  const updateScore = (card: GameCard) => {
    let points = 0;
    
    // Score based on rarity and type
    if (card.rarity === "legendary") points = 30;
    else if (card.rarity === "rare") points = 20;
    else points = 10;
    
    // Bonus for character cards
    if (card.type === "character") points += 10;
    
    const oldScore = scores[card.team];
    const newScore = oldScore + points;
    
    setScores(prev => ({
      ...prev,
      [card.team]: newScore
    }));

    // Visual feedback for score increase
    toast({
      title: `+${points} Punkte!`,
      description: `Team ${card.team === "murat" ? "Murat" : "Jäger"} erhält ${points} Punkte für ${card.name}`,
      duration: 2000,
    });
  };

  const checkAchievements = (card: GameCard) => {
    const achievements = [];
    
    // First legendary card
    if (card.rarity === "legendary" && !playedCards.some(id => {
      const playedCard = DEMO_CARDS.find(c => c.id === id);
      return playedCard?.rarity === "legendary";
    })) {
      achievements.push({
        id: "first-legendary",
        title: "Legendärer Zug!",
        description: "Erste legendäre Karte gespielt",
        icon: "trophy",
        rarity: "legendary"
      });
    }
    
    // High score milestone
    if (scores[card.team] + (card.rarity === "legendary" ? 40 : card.rarity === "rare" ? 30 : 20) >= 100) {
      achievements.push({
        id: "high-score",
        title: "Punktejäger",
        description: "100 Punkte erreicht!",
        icon: "star",
        rarity: "rare"
      });
    }
    
    // Show achievement
    if (achievements.length > 0) {
      setCurrentAchievement(achievements[0]);
    }
  };

  const applyCardEffect = async (card: GameCard) => {
    switch (card.id) {
      // Team Murat - Charakter-NFT-Karten
      case "murat-main":
        // Täuschungsmanöver - neutralisiert gegnerische Aktion und gewinnt Vorsprung
        setMuratPosition(prev => ({ x: Math.min(prev.x + 25, 90), y: prev.y }));
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 2000);
        break;
      case "hacker":
        // Digitale Ablenkung - blockiert Ortungsfähigkeiten für 3 Züge
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 5000);
        break;
      case "informant":
        // Versteckter Hinweis - findet geheimen Pfad
        setGameEffects(prev => ({ ...prev, secretPath: true }));
        setMuratPosition(prev => ({ x: Math.min(prev.x + 20, 85), y: prev.y - 10 }));
        break;
      case "urban-climber":
        // Parkour - ignoriert Straßenblockaden
        setGameEffects(prev => ({ ...prev, blockades: [] })); // Entfernt alle Blockaden
        setMuratPosition(prev => ({ x: Math.min(prev.x + 15, 80), y: prev.y }));
        break;
      case "murat-friend":
        // Ablenkung schaffen - blockiert gegnerische Karte für einen Zug
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 1500);
        break;
      
      // Team Murat - Aktionskarten
      case "hide":
        // Verstecken - verhindert Aufdeckung für eine Runde
        // Visueller Effekt: Murat wird temporär unsichtbar
        break;
      case "call-police-murat":
        // Polizei rufen - blockiert beide Seiten temporär
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 2500);
        break;
      case "crowdsourcing":
        // Crowdsourcing-Hinweis - öffnet geheimen Pfad
        setGameEffects(prev => ({ ...prev, secretPath: true }));
        setMuratPosition(prev => ({ x: Math.min(prev.x + 30, 85), y: 40 }));
        break;
      case "live-donation":
        // Live-Spender - besondere Fortbewegung (Taxi)
        setMuratPosition(prev => ({ x: Math.min(prev.x + 35, 90), y: prev.y }));
        // Visueller Effekt für schnelle Bewegung
        break;
      
      // Team Jäger - Charakter-NFT-Karten
      case "hunter-main":
        // Komplette Überwachung - 3 Runden Scan-Effekt
        setGameEffects(prev => ({ ...prev, scanEffect: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, scanEffect: false })), 6000);
        break;
      case "drone-pilot":
        // Luftüberwachung - Kurzzeitiger Scan-Effekt
        setGameEffects(prev => ({ ...prev, scanEffect: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, scanEffect: false })), 2000);
        break;
      case "saboteur":
        // Sprengfalle - stoppt Murat für 2 Runden (visuell durch Explosion)
        const explosionSite = { x: muratPosition.x + 10, y: muratPosition.y };
        setGameEffects(prev => ({ 
          ...prev, 
          blockades: [...prev.blockades, explosionSite] 
        }));
        // Explosion particle effect
        setParticleEffect({ x: muratPosition.x * 4, y: muratPosition.y * 2, type: "explosion" });
        break;
      case "biker-gang":
        // Straßenblockade - blockiert Zone für zwei Runden
        const roadBlock = { x: 50 + Math.random() * 20, y: 30 + Math.random() * 20 };
        setGameEffects(prev => ({ 
          ...prev, 
          blockades: [...prev.blockades, roadBlock] 
        }));
        break;
      case "passerby":
        // Hinweis geben - kurze Aufdeckung von Murats Position
        setGameEffects(prev => ({ ...prev, scanEffect: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, scanEffect: false })), 1500);
        break;
      
      // Team Jäger - Aktionskarten
      case "set-trap":
        // Falle stellen - reduziert Murats Geschwindigkeit
        const trapLocation = { x: muratPosition.x + 15, y: muratPosition.y + 5 };
        setGameEffects(prev => ({ 
          ...prev, 
          blockades: [...prev.blockades, trapLocation] 
        }));
        break;
      case "call-police":
        // Polizei rufen - temporäre Verwirrung beider Seiten
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 2500);
        break;
      case "bitcoin-transaction":
        // Bitcoin-Transaktion - macht Murat sichtbarer
        setGameEffects(prev => ({ ...prev, scanEffect: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, scanEffect: false })), 4000);
        break;
    }
  };

  const determineWinner = () => {
    // Simple win condition: if Murat reached close to target (x > 80)
    if (muratPosition.x >= 80) {
      setWinner("Team Murat");
    } else {
      setWinner("Team Jäger");
    }
    setGamePhase("finished");
  };

  const resetGame = () => {
    setGamePhase("preparation");
    setActivePlayer("murat");
    setRound(1);
    setPlayedCards([]);
    setCurrentPlayedCard(null);
    setDetectedCombos([]);
    setActiveBuffs([]);
    setPhaseTimer(maxPhaseTime);
    
    // Reset resources
    setMuratResources({
      energy: 5, maxEnergy: 5,
      influence: 3, maxInfluence: 5,
      tech: 2, maxTech: 5
    });
    setJagerResources({
      energy: 4, maxEnergy: 5,
      influence: 4, maxInfluence: 5,
      tech: 3, maxTech: 5
    });
    setRecentlyPlayedCards([]);
    setScores({ murat: 0, jager: 0 });
    setMuratPosition({ x: 10, y: 50 });
    setJagerPosition({ x: 15, y: 70 });
    setGameEffects({
      scanEffect: false,
      blockades: [],
      secretPath: false,
      confusion: false,
    });
    setWinner(null);
  };

  const startGame = () => {
    setGamePhase("action");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center relative">
          {onBackToHome && (
            <Button
              onClick={onBackToHome}
              variant="outline"
              size="sm"
              className="absolute left-0 top-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
          )}
          <h1 className="text-4xl font-bold mb-2 bg-gradient-bitcoin bg-clip-text text-transparent">
            Jagd auf den Bitcoin - Demo
          </h1>
          <p className="text-muted-foreground">
            Runde {round} von 5 • {gamePhase === "preparation" ? "Bereit zum Start" : 
                                     gamePhase === "finished" ? "Spiel beendet" : 
                                     `${activePlayer === "both" ? "Beide Teams" : `Team ${activePlayer}`} am Zug`}
          </p>
        </div>

        {/* Score Display and Recently Played Cards */}
        {gamePhase !== "preparation" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Score Display */}
            <Card className="bg-gradient-dark border-cyber/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-cyber text-lg">Punktestand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-bitcoin/10 border border-bitcoin/30 rounded-lg">
                    <div className="text-bitcoin font-bold text-2xl">{scores.murat}</div>
                    <div className="text-xs text-muted-foreground">Team Murat</div>
                  </div>
                  <div className="text-center p-3 bg-hunter/10 border border-hunter/30 rounded-lg">
                    <div className="text-hunter font-bold text-2xl">{scores.jager}</div>
                    <div className="text-xs text-muted-foreground">Team Jäger</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recently Played Cards */}
            <Card className="lg:col-span-2 bg-gradient-dark border-cyber/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-cyber text-lg">Zuletzt gespielte Karten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto">
                  {recentlyPlayedCards.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8 w-full">
                      Noch keine Karten gespielt
                    </div>
                  ) : (
                    recentlyPlayedCards.map((card, index) => (
                      <motion.div
                        key={`${card.id}-${index}`}
                        initial={{ scale: 1.2, opacity: 0, y: -50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        className="flex-shrink-0"
                      >
                        <Card className={`w-48 h-64 ${
                          card.team === "murat" 
                            ? "bg-gradient-bitcoin border-bitcoin/50" 
                            : "bg-gradient-hunter border-hunter/50"
                        } shadow-lg`}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-xs text-foreground">{card.name}</h3>
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
                              {card.team === "murat" ? "Murat" : "Jäger"}
                            </Badge>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {card.stats && (
                              <div className="grid grid-cols-3 gap-1 text-center">
                                <div className="bg-dark-surface p-1 rounded text-xs">
                                  <div className="text-muted-foreground text-xs">Skill</div>
                                  <div className="font-bold text-bitcoin text-sm">{card.stats.skill}</div>
                                </div>
                                <div className="bg-dark-surface p-1 rounded text-xs">
                                  <div className="text-muted-foreground text-xs">Intel</div>
                                  <div className="font-bold text-cyber text-sm">{card.stats.intelligence}</div>
                                </div>
                                <div className="bg-dark-surface p-1 rounded text-xs">
                                  <div className="text-muted-foreground text-xs">Stärke</div>
                                  <div className="font-bold text-hunter text-sm">{card.stats.strength}</div>
                                </div>
                              </div>
                            )}
                            <div className="bg-dark-surface p-2 rounded-lg">
                              <h4 className="font-semibold text-primary text-xs mb-1">Fähigkeit</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{card.ability}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Map */}
        <Card className="bg-gradient-dark border-bitcoin/20">
          <CardHeader>
            <CardTitle className="text-center text-cyber">Spielfeld</CardTitle>
          </CardHeader>
          <CardContent>
            <GameMap
              muratPosition={muratPosition}
              jagerPosition={jagerPosition}
              effects={gameEffects}
            />
          </CardContent>
        </Card>

        {/* Currently Played Card */}
        <AnimatePresence>
          {currentPlayedCard && (
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-primary">Karte gespielt!</h3>
                <PlayableCard
                  card={currentPlayedCard}
                  isPlayable={false}
                  isPlayed={false}
                  onPlay={() => {}}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Setup Phase */}
        {gamePhase === "preparation" && (
          <Card className="bg-gradient-dark border-cyber/20">
            <CardContent className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 text-cyber">Bereit für die Demo?</h2>
              <p className="text-muted-foreground mb-6">
                Erlebe das rundenbasierte Kartenspiel in Aktion. Jedes Team hat verschiedene Karten mit einzigartigen Fähigkeiten.
              </p>
              <Button onClick={startGame} variant="cyber" size="lg">
                Demo starten
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Finished */}
        {gamePhase === "finished" && winner && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-background/90 backdrop-blur-sm"
          >
            <Card className="bg-gradient-dark border-bitcoin/50 shadow-glow-bitcoin">
              <CardContent className="text-center p-8">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-bitcoin" />
                <h2 className="text-3xl font-bold mb-4 text-bitcoin">
                  {winner} gewinnt!
                </h2>
                <p className="text-muted-foreground mb-6">
                  {winner === "Team Murat" 
                    ? "Murat hat erfolgreich das Ziel erreicht!" 
                    : "Die Jäger haben Murat erfolgreich aufgehalten!"}
                </p>
                <Button onClick={resetGame} variant="bitcoin">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Nochmal spielen
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Player Hands */}
        {(gamePhase === "action" || gamePhase === "resolution") && (
          <div className="space-y-4">
            <PlayerHand
              cards={muratCards}
              team="murat"
              isActivePlayer={true}
              onPlayCard={handlePlayCard}
              playedCards={playedCards}
            />
            <PlayerHand
              cards={jagerCards}
              team="jager"
              isActivePlayer={true}
              onPlayCard={handlePlayCard}
              playedCards={playedCards}
            />
          </div>
        )}
      </div>
      
      {/* Achievement Toast */}
      <AchievementToast 
        achievement={currentAchievement} 
        onComplete={() => setCurrentAchievement(null)} 
      />
    </div>
  );
};