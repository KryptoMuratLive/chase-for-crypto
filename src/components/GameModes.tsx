import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users } from "lucide-react";

export const GameModes = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-hunter bg-clip-text text-transparent">Spiel</span>modi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verschiedene Wege, die Geschichte zu beeinflussen und wertvolle Belohnungen zu erhalten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hauptmodus */}
          <Card className="bg-gradient-dark border-bitcoin/20 hover:border-bitcoin/50 transition-all duration-300 hover:shadow-glow-bitcoin">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-bitcoin rounded-full flex items-center justify-center shadow-glow-bitcoin">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-bitcoin">Story-Modus</CardTitle>
              <p className="text-muted-foreground">Monatliche Episoden</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-bitcoin mb-3">Wie es funktioniert:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>🎬 Eine neue Episode jeden Monat</li>
                  <li>🗳️ Community entscheidet über Handlung</li>
                  <li>🃏 Wöchentliche Kartenspiel-Phasen</li>
                  <li>📺 Live-Stream auf kryptomurat.live</li>
                </ul>
              </div>
              
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-bitcoin mb-3">Belohnungen:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>🏆 Exklusive Episode-NFTs</li>
                  <li>🪙 $MURAT Token</li>
                  <li>🎮 Neue Charakterkarten</li>
                  <li>📈 Einfluss auf Serie</li>
                </ul>
              </div>

              <Button variant="bitcoin" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Story-Modus beitreten
              </Button>
            </CardContent>
          </Card>

          {/* Turnier-Modus */}
          <Card className="bg-gradient-dark border-hunter/20 hover:border-hunter/50 transition-all duration-300 hover:shadow-glow-hunter">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-hunter rounded-full flex items-center justify-center shadow-glow-hunter">
                <Trophy className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold text-hunter">Turnier-Modus</CardTitle>
              <p className="text-muted-foreground">Monatliche Turniere</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-hunter mb-3">Wie es funktioniert:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>⚔️ Großes monatliches Turnier</li>
                  <li>🎯 Von Spielern geführt</li>
                  <li>🔄 Verknüpft mit Serie</li>
                  <li>📱 Live-Events und Specials</li>
                </ul>
              </div>
              
              <div className="bg-dark-surface p-4 rounded-lg">
                <h4 className="font-semibold text-hunter mb-3">Belohnungen:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>🏅 Ultra-seltene NFTs</li>
                  <li>💰 Große Token-Belohnungen</li>
                  <li>👑 Exklusive Titel</li>
                  <li>🎖️ Ruhmeshalle-Eintrag</li>
                </ul>
              </div>

              <Button variant="teamJager" className="w-full">
                <Trophy className="w-4 h-4 mr-2" />
                Turnier beitreten
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Features */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-dark border-cyber/20 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cyber">Community-Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-cyber rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-foreground font-bold">💸</span>
                  </div>
                  <h4 className="font-semibold text-cyber mb-2">Live-Spenden</h4>
                  <p className="text-xs text-muted-foreground">
                    Beeinflusse das Spiel durch Token-Spenden während Live-Streams
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-cyber rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-foreground font-bold">🗳️</span>
                  </div>
                  <h4 className="font-semibold text-cyber mb-2">Abstimmungen</h4>
                  <p className="text-xs text-muted-foreground">
                    Entscheide über geheime Pfade und wichtige Wendungen
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-cyber rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-foreground font-bold">📱</span>
                  </div>
                  <h4 className="font-semibold text-cyber mb-2">Social Media</h4>
                  <p className="text-xs text-muted-foreground">
                    Virale Aktionen schalten spezielle Community-Karten frei
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};