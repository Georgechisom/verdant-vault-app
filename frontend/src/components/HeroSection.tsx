import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 py-8"
        style={{ backgroundImage: `url(/here-bg.jpg)` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Verdant Vault
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-6">
            Unlock Earth's Wealth for African Herbs
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Hedera powered marketplace connecting investors with African
            farmers to fund agricultural expansion in exchange for tokenized
            carbon credits representing verified CO2 sequestration.
          </p>

          {/* Stats Box */}
          <div className="bg-secondary/30 backdrop-blur-sm border border-accent/30 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <p className="text-foreground text-lg">
              <span className="font-bold text-2xl">&lt;$5</span> value captured
              by farmers
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg group transition-all duration-300 shadow-lg hover:shadow-[var(--glow)]"
          >
            <Link
              href="/dashboard"
              className="btn-primary flex items-center justify-center font-bold px-5 py-4"
            >
              Joint the Vault
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            Empowering 8M+ farmers with DMRV truth from sensors at Hedera Africa
            Marketplace
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
