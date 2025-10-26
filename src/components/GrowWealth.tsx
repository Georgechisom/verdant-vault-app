import { Database, CheckCircle, Coins, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Database,
    title: "Soil Sensor Data",
    description: "Capture real-time farming data directly from your fields"
  },
  {
    icon: CheckCircle,
    title: "AI Validation",
    description: "Ensure data's authenticity via climate impact verification"
  },
  {
    icon: Coins,
    title: "Mint NFT",
    description: "Convert verified data into a secure digital credit"
  },
  {
    icon: TrendingUp,
    title: "Trade & Reward",
    description: "Access global markets and earn additional incentives"
  }
];

const GrowWealth = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Grow Wealth from the Ground Up
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Verdant Vault bridges the Gap—3% carbon data trust your fields in HTS NFTs for instant
              liquidity. We make education ESG industries, gamified rewards, and HCS health-tier
              transparent.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that every smallholder farmer deserves access to global carbon markets,
              turning their sustainable practices into verifiable digital assets—your investment in
              greenhouse.
            </p>
          </div>

          {/* Right Features */}
          <div className="space-y-4 animate-fade-in">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-card hover:shadow-[var(--card-shadow)] transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowWealth;
