import { Smartphone, Shield, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Smartphone,
    title: "Capture Impact",
    description:
      "Log your regenerative acts simply—Snap a photo, tap the app. Transparent farming for one dollar cash-in trusts.",
  },
  {
    icon: Shield,
    title: "Verify & Tokenize",
    description:
      "AI validates with eco AI-IoE, pack the carbon footprint. Convert into Hedera NFTs automatically. Tamper-proof, eco.",
  },
  {
    icon: RefreshCcw,
    title: "Trade & Thrive",
    description:
      "List credits on our marketplace or for NFTs, receive payment—Hedera–HBARs pay off—or USDC. Instant cash through ecosystem.",
  },
];

const ThreeSteps = () => {
  return (
    <section className="py-20 bg-green-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
          style={{ backgroundImage: `url(/here-bg.jpg)` }}
        />
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Farm to Fortune in 3 Steps
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Our platform simplifies the process of turning your sustainable
            farming practices into verifiable NFTs or credits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 bg-white hover:shadow-[var(--card-shadow)] transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-black">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[0, 1, 2].map((dot) => (
            <div key={dot} className="w-3 h-3 rounded-full bg-white" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeSteps;
