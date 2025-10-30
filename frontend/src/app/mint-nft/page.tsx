"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function MintNFTPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMintNFT = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("NFT minted successfully for 50 tons CO2");
    } catch (error) {
      toast.error("Failed to mint NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container-custom max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">
            Mint Carbon Credit NFT
          </h1>
          <p className="text-gray-100 mb-12">
            Tokenize your verified carbon impact into a secure NFT
          </p>

          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl text-gray-900">
                Convert Your Impact to Digital Assets
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Mint NFT
                </h2>
                <p className="text-gray-600 mb-4">
                  Your farm project has been verified. Now mint an NFT
                  representing your carbon credits.
                </p>

                <Button
                  onClick={handleMintNFT}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? "Minting NFT..." : "Mint Carbon Credit NFT"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
