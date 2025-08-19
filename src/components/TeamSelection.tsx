import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target } from "lucide-react";

export const TeamSelection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Wähle dein <span className="bg-gradient-cyber bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jede Entscheidung beeinflusst den Verlauf der Serie. Für wen kämpfst du?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Team Murat */}
          <Card className="relative overflow-hidden bg-gradient-dark border-bitcoin/20 hover:border-bitcoin/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-bitcoin">
            <div className="absolute inset-0 bg-gradient-bitcoin opacity-5"></div>
            <CardHeader className="relative z-10 text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-bitcoin">Team Murat</CardTitle>
              <p className="text-muted-foreground">Beschütze das Wallet</p>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-bitcoin mb-2">Deine Mission:</h4>
                <p className="text-sm text-muted-foreground">
                  Hilf Murat dabei, sein Bitcoin-Wallet vor den Jägern zu verstecken. 
                  Nutze Täuschungsmanöver und clevere Strategien.
                </p>
              </div>
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-bitcoin mb-2">Besondere Vorteile:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Täuschungsmanöver-Karten</li>
                  <li>• Versteck-Möglichkeiten</li>
                  <li>• Hacker-Unterstützung</li>
                </ul>
              </div>
              <Button variant="teamMurat" className="w-full">
                Team Murat beitreten
              </Button>
            </CardContent>
          </Card>

          {/* Team Jäger */}
          <Card className="relative overflow-hidden bg-gradient-dark border-hunter/20 hover:border-hunter/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-hunter">
            <div className="absolute inset-0 bg-gradient-hunter opacity-5"></div>
            <CardHeader className="relative z-10 text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-hunter rounded-full flex items-center justify-center shadow-glow-hunter">
                <Target className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-hunter">Team Jäger</CardTitle>
              <p className="text-muted-foreground">Verfolge das Wallet</p>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-hunter mb-2">Deine Mission:</h4>
                <p className="text-sm text-muted-foreground">
                  Spüre Murat auf und erobere sein Bitcoin-Wallet. Nutze Überwachung, 
                  Sabotage und strategische Fallen.
                </p>
              </div>
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-hunter mb-2">Besondere Vorteile:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Überwachungs-Technologie</li>
                  <li>• Sabotage-Aktionen</li>
                  <li>• Rockerbande-Support</li>
                </ul>
              </div>
              <Button variant="teamJager" className="w-full">
                Team Jäger beitreten
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};