import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bitcoin-hunt.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-bitcoin bg-clip-text text-transparent">
          JAGD AUF DEN
        </h1>
        <h2 className="text-6xl md:text-8xl font-black mb-8 text-foreground drop-shadow-2xl">
          BITCOIN
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Eine interaktive Web3-Miniserie, in der <strong className="text-primary">DU</strong> über 
          das Schicksal von Murat und seinem Bitcoin-Wallet entscheidest.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="bitcoin" size="lg" className="text-lg px-8 py-4">
            Spiel Starten
          </Button>
          <Button variant="cyber" size="lg" className="text-lg px-8 py-4">
            Mehr Erfahren
          </Button>
        </div>

        {/* Live Status */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="w-3 h-3 bg-hunter rounded-full animate-pulse shadow-glow-hunter"></div>
          <span className="text-hunter font-semibold">LIVE auf kryptomurat.live</span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-bitcoin rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-cyber rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-hunter rounded-full blur-lg opacity-40 animate-pulse"></div>
    </section>
  );
};