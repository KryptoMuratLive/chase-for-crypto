import { GameCard } from "@/components/GameCard";

const sampleCards = [
  {
    name: "Murat",
    rarity: "legendary" as const,
    team: "murat" as const,
    stats: { skill: 9, intelligence: 8, strength: 7 },
    ability: "Täuschungsmanöver - Kann eine gegnerische Aktion neutralisieren und gewinnt einen Zug Vorsprung.",
    description: "Der geheimnisvolle Protagonist mit dem wertvollen Bitcoin-Wallet. Geschickt, intelligent und immer einen Schritt voraus."
  },
  {
    name: "Der Jäger",
    rarity: "legendary" as const,
    team: "jager" as const,
    stats: { skill: 8, intelligence: 10, strength: 7 },
    ability: "Komplette Überwachung - Deckt die Position von Murat auf der gesamten Karte für 3 Runden auf.",
    description: "Der gnadenlose Verfolger mit modernster Überwachungstechnologie. Intelligent, methodisch und sehr gefährlich."
  },
  {
    name: "Der Hacker",
    rarity: "rare" as const,
    team: "murat" as const,
    stats: { skill: 5, intelligence: 10, strength: 2 },
    ability: "Digitale Ablenkung - Blockiert die Ortungsfähigkeiten von Team Jäger für 3 Züge.",
    description: "Ein Meister der digitalen Welt. Schwach in körperlicher Hinsicht, aber unschlagbar im Cyberspace."
  },
  {
    name: "Rockerbande",
    rarity: "common" as const,
    team: "jager" as const,
    stats: { skill: 6, intelligence: 4, strength: 9 },
    ability: "Straßenblockade - Blockiert eine bestimmte Zone auf der Karte für zwei Runden.",
    description: "Eine Gruppe rauer Biker. Nicht die hellsten Köpfe, aber ihre rohe Kraft macht sie zu einer effektiven Barriere."
  }
];

export const CardShowcase = () => {
  return (
    <section className="py-20 px-4 bg-darker-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sammle <span className="bg-gradient-bitcoin bg-clip-text text-transparent">NFT-Karten</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jede Karte hat einzigartige Fähigkeiten und beeinflusst das Spielgeschehen. 
            Baue dein Deck strategisch auf!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {sampleCards.map((card, index) => (
            <GameCard key={index} {...card} />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-card p-6 rounded-lg border border-bitcoin/20">
              <div className="w-12 h-12 bg-gradient-bitcoin rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">L</span>
              </div>
              <h3 className="font-bold text-bitcoin mb-2">Legendär</h3>
              <p className="text-sm text-muted-foreground">Sehr seltene Hauptcharaktere mit mächtigen Fähigkeiten</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-cyber/20">
              <div className="w-12 h-12 bg-gradient-cyber rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-foreground font-bold">R</span>
              </div>
              <h3 className="font-bold text-cyber mb-2">Selten</h3>
              <p className="text-sm text-muted-foreground">Wichtige Unterstützer mit speziellen Fähigkeiten</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-muted/20">
              <div className="w-12 h-12 bg-card border border-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-muted-foreground font-bold">C</span>
              </div>
              <h3 className="font-bold text-muted-foreground mb-2">Häufig</h3>
              <p className="text-sm text-muted-foreground">Grundlegende Charaktere für taktische Manöver</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};