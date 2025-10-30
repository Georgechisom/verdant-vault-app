"use client";

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Users, Target, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      {/* Hero Section bg-gradient-to-br from-[#064806] to-[#0FAE0F] */}
      <section className="py-20 px-4">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white my-6">
            About Verdant Vault
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl text-center mx-auto">
            Making climate finance inclusive and accessible for green projects
            at the base level
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-100 mb-6">
                Verdant Vault is dedicated to democratizing climate finance by
                connecting investors with sustainable projects that make a real
                environmental impact. We believe that climate action should be
                accessible to everyone, regardless of their financial
                background.
              </p>
              <p className="text-lg text-gray-100 mb-8">
                Through our platform, we enable individuals to invest in
                renewable energy, reforestation, and clean water initiatives
                while earning verified carbon credits as incentives. Our mission
                is to create a more sustainable future by making green finance
                inclusive and transparent.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Target className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div className="text-white">
                    <h3 className="font-bold">Inclusive Finance</h3>
                    <p className="text-gray-400">
                      Making climate investments accessible to all
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Globe className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div className="text-white">
                    <h3 className="font-bold text-white">Global Impact</h3>
                    <p className="text-gray-400">
                      Supporting projects worldwide
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white">Community Driven</h3>
                    <p className="text-gray-400">
                      Building a community of climate advocates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-gray-600">Team and office</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-300">
        <div
          className="absolute top-[100%] left-[74%] w-[26%] h-full inset-0 bg-no-repeat bg-center opacity-10 py-10 overflow-hidden"
          style={{ backgroundImage: `url(/left-leave2.png)` }}
        />
        <div
          className="absolute top-[100%] left-[-40%] w-full h-full inset-0 bg-no-repeat bg-center opacity-10 py-10"
          style={{ backgroundImage: `url(/right-leave.png)` }}
        />
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We are committed to supporting projects that create lasting
                environmental benefits and contribute to a sustainable future.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in complete transparency in all our operations, from
                project selection to impact reporting and financial
                transactions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We leverage cutting-edge technology, including blockchain and
                decentralized finance, to make climate investing more
                accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Our Team
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Verdant Vault is built by a passionate team of climate scientists,
            financial experts, and technology innovators dedicated to making a
            difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition px-20"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Team Member {i}
                  </h3>
                  <p className="text-gray-600 text-sm">Position Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Are you passionate about climate action? We're always looking for
            talented individuals to join our mission.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-500 font-bold py-3 px-8 rounded-lg hover:bg-green-500 hover:text-white hover:border-2 hover:border-white transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
