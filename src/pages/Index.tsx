import { GameDemo } from "@/components/game/GameDemo";
import { Hero } from "@/components/Hero";
import { TeamSelection } from "@/components/TeamSelection";
import { CardShowcase } from "@/components/CardShowcase";
import { GameModes } from "@/components/GameModes";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <GameDemo />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Demo Button */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-cyber">
            Erlebe das Spiel live!
          </h2>
          <p className="text-muted-foreground mb-6">
            Teste die Spielmechanik in unserer interaktiven Demo mit echten NFT-Karten.
          </p>
          <Button 
            onClick={() => setShowDemo(true)} 
            variant="cyber" 
            size="lg"
            className="text-lg px-8 py-4"
          >
            🎮 DEMO SPIELEN
          </Button>
        </div>
      </section>
      
      <TeamSelection />
      <CardShowcase />
      <GameModes />
    </div>
  );
};

export default Index;
