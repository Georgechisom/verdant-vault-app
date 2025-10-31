import { FileCheck, Split, Users, Award } from "lucide-react";
import { Card } from "./ui/card";

const tools = [
  {
    icon: FileCheck,
    title: "Irrevocable Audits",
    description:
      "To your credit-logs are every carbon act. All data perm-stored on guardian network for full supply-chain trace for life.",
  },
  {
    icon: Split,
    title: "Fractional Credits",
    description:
      "Own 'slices' of impact from 5K—perfect for crowd-funds or co-op in-kind buyer pools.",
  },
  {
    icon: Users,
    title: "Community DAO",
    description:
      "To select a grant-native credit, run co-finance. Dig new reconciliations as a credit governance.",
  },
  {
    icon: Award,
    title: "Certified Rewards",
    description:
      "Earn fractured credits for ecosystem steps. Exchange for discounts, re-investment, and worldview benefits.",
  },
];

const VaultTools = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Vault-Powered Tools for Inclusion
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform provides innovative solutions designed especially for
            farmers across Africa's Hedera tokens
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="p-6 bg-card hover:shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-grow">
                  {tool.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VaultTools;
