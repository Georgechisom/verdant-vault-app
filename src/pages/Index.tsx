import HeroSection from "@/components/HeroSection";
import GrowWealth from "@/components/GrowWealth";
import ThreeSteps from "@/components/ThreeSteps";
import VaultTools from "@/components/VaultTools";
import RealReturns from "@/components/RealReturns";
import ContactForm from "@/components/ContactForm";
import leafLeft from "@/images/background.png";
import leafRight from "@/images/palmtree.png";

const Index = () => {
  return (
    <main className="relative overflow-hidden">
      {/* Decorative Leaves */}
      <img
        src={(leafLeft as any).src ?? leafLeft}
        alt=""
        className="leaf-decoration w-64 h-96 -left-20 top-20 animate-float"
      />
      <img
        src={(leafRight as any).src ?? leafRight}
        alt=""
        className="leaf-decoration w-64 h-96 -right-20 top-[800px] animate-float"
        style={{ animationDelay: "1s" }}
      />

      <HeroSection />
      <GrowWealth />
      <ThreeSteps />
      <VaultTools />
      <RealReturns />
      <ContactForm />
    </main>
  );
};

export default Index;
