import { Hero } from "@/components/Hero";
import { TeamSelection } from "@/components/TeamSelection";
import { CardShowcase } from "@/components/CardShowcase";
import { GameModes } from "@/components/GameModes";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TeamSelection />
      <CardShowcase />
      <GameModes />
    </div>
  );
};

export default Index;
