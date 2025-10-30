import { CheckCircle } from "lucide-react";
import { Card } from "./ui/card";

const metrics = [
  {
    value: "100 Test Tonnes",
    description: "DMRV Carbon Minted",
    subtext: "Prototype roll out for Eldoret",
  },
  {
    value: "10% Increase",
    description: "Average Yield Hit",
    subtext: "Through soil-based pay",
  },
  {
    value: "Scaling to 1M Users",
    description: "Target roll-out",
    subtext: "In next 18 months",
  },
];

const testimonials = [
  {
    name: "Amara Issa-Mwingi",
    role: "Smallholder Farmer",
    image: "/testimonial-1.jpg",
    quote:
      "Verdant lets me earn pay from 100% DMRV-DIY into verbs fees—transparent and fast! It transforms the yield I used to waste into additional income.",
  },
  {
    name: "Emmanuel Rono-Lagoa",
    role: "Mid-Scale Farmer",
    image: "/testimonial-2.jpg",
    quote:
      "The DAO's producer should educate via Sensei in new a way to trace footprint economics for the AG dev floor, finance fills the gap of capturing impact.",
  },
];

const RealReturns = () => {
  return (
    <section className="py-20 bg-primary/100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl"
          style={{ backgroundImage: `url(/background.png)` }}
        />
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Roots, Real Returns
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how Verdant Vault is transforming lives and creating wealth for
            African farming communities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Impact Metrics */}
          <Card className="p-8 bg-card animate-fade-in">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Impact Metrics
            </h3>
            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-card-foreground">
                      {metric.value}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      {metric.description}
                    </p>
                    <p className="text-xs text-black mt-1">{metric.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Testimonials */}
          <div className="space-y-6 animate-fade-in">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-card">
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-card-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-green-700">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="text-accent text-3xl leading-none">"</div>
                    </div>
                    <p className="text-sm text-black italic">
                      {testimonial.quote}
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

export default RealReturns;
