import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameMap } from "./GameMap";
import { PlayerHand } from "./PlayerHand";
import { PlayableCard, GameCard } from "./PlayableCard";
import { Trophy, RotateCcw } from "lucide-react";

type GamePhase = "setup" | "round1" | "round2" | "round3" | "finished";
type ActivePlayer = "murat" | "jager" | "both";

const DEMO_CARDS: GameCard[] = [
  // Team Murat
  {
    id: "murat-friend",
    name: "Murats Freund",
    type: "character",
    team: "murat",
    stats: { skill: 3, intelligence: 5, strength: 2 },
    ability: "Ablenkung schaffen - Blockiert die nächste gegnerische Aktionskarte.",
    description: "Ein treuer Freund, der durch geschickte Ablenkung hilft."
  },
  {
    id: "hack-action",
    name: "Hacken",
    type: "action",
    team: "murat",
    ability: "Deaktiviert elektronische Geräte des Gegners für einen Zug.",
    description: "Technische Sabotage, die den Gegner verwirrt."
  },
  {
    id: "crowdsourcing",
    name: "Crowdsourcing-Hinweis",
    type: "community",
    team: "murat",
    ability: "Öffnet einen geheimen Pfad auf der Karte.",
    description: "Die Community hilft mit einem versteckten Weg."
  },
  // Team Jäger
  {
    id: "hunter-main",
    name: "Der Jäger",
    type: "character",
    team: "jager",
    stats: { skill: 8, intelligence: 10, strength: 7 },
    ability: "Komplette Überwachung - Scannt die gesamte Karte und deckt Murats Position auf.",
    description: "Der Meister der Überwachung mit modernster Technologie."
  },
  {
    id: "biker-gang",
    name: "Rockerbande",
    type: "character",
    team: "jager",
    stats: { skill: 6, intelligence: 4, strength: 9 },
    ability: "Straßenblockade - Blockiert einen zufälligen Weg auf der Karte.",
    description: "Rohe Gewalt und Motorräder schaffen Hindernisse."
  }
];

export const GameDemo = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>("setup");
  const [activePlayer, setActivePlayer] = useState<ActivePlayer>("murat");
  const [round, setRound] = useState(1);
  const [playedCards, setPlayedCards] = useState<string[]>([]);
  const [currentPlayedCard, setCurrentPlayedCard] = useState<GameCard | null>(null);
  
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

  const handlePlayCard = async (card: GameCard) => {
    setCurrentPlayedCard(card);
    setPlayedCards(prev => [...prev, card.id]);
    
    // Apply card effects
    await applyCardEffect(card);
    
    // Advance game logic
    if (gamePhase === "round1") {
      if (activePlayer === "murat") {
        setActivePlayer("jager");
      } else {
        setGamePhase("round2");
        setActivePlayer("jager");
        setRound(2);
      }
    } else if (gamePhase === "round2") {
      if (activePlayer === "jager") {
        setActivePlayer("murat");
      } else {
        setGamePhase("round3");
        setActivePlayer("both");
        setRound(3);
      }
    } else if (gamePhase === "round3") {
      // Game ends after round 3
      setTimeout(() => determineWinner(), 2000);
    }

    // Clear current played card after animation
    setTimeout(() => setCurrentPlayedCard(null), 3000);
  };

  const applyCardEffect = async (card: GameCard) => {
    switch (card.id) {
      case "murat-friend":
        // Block next enemy action (visual effect)
        break;
      case "hack-action":
        setGameEffects(prev => ({ ...prev, confusion: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, confusion: false })), 3000);
        break;
      case "crowdsourcing":
        setGameEffects(prev => ({ ...prev, secretPath: true }));
        setMuratPosition({ x: 80, y: 40 }); // Move via secret path
        break;
      case "hunter-main":
        setGameEffects(prev => ({ ...prev, scanEffect: true }));
        setTimeout(() => setGameEffects(prev => ({ ...prev, scanEffect: false })), 2000);
        break;
      case "biker-gang":
        const newBlockade = { x: 50 + Math.random() * 20, y: 30 + Math.random() * 20 };
        setGameEffects(prev => ({ 
          ...prev, 
          blockades: [...prev.blockades, newBlockade] 
        }));
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
    setGamePhase("setup");
    setActivePlayer("murat");
    setRound(1);
    setPlayedCards([]);
    setCurrentPlayedCard(null);
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
    setGamePhase("round1");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-bitcoin bg-clip-text text-transparent">
            Jagd auf den Bitcoin - Demo
          </h1>
          <p className="text-muted-foreground">
            Runde {round} von 3 • {gamePhase === "setup" ? "Bereit zum Start" : 
                                    gamePhase === "finished" ? "Spiel beendet" : 
                                    `${activePlayer === "both" ? "Beide Teams" : `Team ${activePlayer}`} am Zug`}
          </p>
        </div>

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
        {gamePhase === "setup" && (
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
        {(gamePhase === "round1" || gamePhase === "round2" || gamePhase === "round3") && (
          <div className="space-y-4">
            <PlayerHand
              cards={muratCards}
              team="murat"
              isActivePlayer={activePlayer === "murat" || activePlayer === "both"}
              onPlayCard={handlePlayCard}
              playedCards={playedCards}
            />
            <PlayerHand
              cards={jagerCards}
              team="jager"
              isActivePlayer={activePlayer === "jager" || activePlayer === "both"}
              onPlayCard={handlePlayCard}
              playedCards={playedCards}
            />
          </div>
        )}
      </div>
    </div>
  );
};