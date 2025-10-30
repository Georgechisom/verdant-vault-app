import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    language: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description:
        "We'll be in touch soon to start your farming credits journey.",
    });
    setFormData({ name: "", email: "", country: "", language: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Vault In?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our community of farmers, buyers, and climate advocates
              building a more equitable future for African agriculture.
            </p>
          </div>

          <Card className="p-8 bg-card animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-card-foreground mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-card-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-card-foreground mb-2"
                >
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Your country"
                />
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-card-foreground mb-2"
                >
                  Preferred Language
                </label>
                <Input
                  id="language"
                  name="language"
                  type="text"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="English, Swahili, etc."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-[var(--glow)]"
              >
                Start Farming Credits
              </Button>
            </form>
          </Card>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="text-foreground border-border hover:bg-muted"
            >
              About the HBAR
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Join HBAR world farmers or enrich with future farm live now
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
