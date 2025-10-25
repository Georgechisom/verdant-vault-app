'use client';

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Leaf, TrendingUp, Shield, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Top leaves decoration */}
        <div
          className="absolute top-0 left-0 w-full h-64 bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/Top leaves.png')",
            backgroundPosition: 'top left'
          }}
        ></div>

        {/* Bottom right leaves decoration */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/right bottom leaves.png')",
            backgroundPosition: 'bottom right'
          }}
        ></div>

        {/* Palm tree decoration */}
        <div
          className="absolute bottom-0 left-1/4 w-64 h-96 bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/images/palmtree.png')",
            backgroundPosition: 'bottom center'
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Invest in a
            <span className="text-green-400 block">Sustainable Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the carbon credit revolution. Trade verified carbon credits, invest in green projects,
            and make a positive impact on our planet with blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              href="/projects"
              className="btn-secondary text-lg px-8 py-4 bg-white bg-opacity-20 text-white border-white hover:bg-opacity-30 transition-all"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Verdant Vault?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of sustainable finance with our cutting-edge platform
              built on Hedera's fast, secure, and eco-friendly blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Carbon Credits</h3>
              <p className="text-gray-600">
                Trade authentic, verified carbon credits from certified environmental projects worldwide.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Investments</h3>
              <p className="text-gray-600">
                Invest in sustainable projects with transparent tracking and guaranteed returns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                Powered by Hedera's enterprise-grade blockchain for maximum security and transparency.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Community</h3>
              <p className="text-gray-600">
                Join thousands of investors making a positive impact on climate change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Start your journey towards sustainable investing today. Connect your wallet and
            begin trading carbon credits in minutes.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            Connect Wallet <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
