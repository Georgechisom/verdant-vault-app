"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import GrowWealth from "@/components/GrowWealth";
import ThreeSteps from "@/components/ThreeSteps";
import VaultTools from "@/components/VaultTools";
import RealReturns from "@/components/RealReturns";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative overflow-hidden">
        {/* Decorative Leaves */}
        <img
          src="/leaf-left.png"
          alt=""
          className="leaf-decoration w-64 h-96 -left-20 top-20 animate-float"
        />
        <img
          src="/leaf-right.png"
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

      <Footer />
    </div>
  );
}
