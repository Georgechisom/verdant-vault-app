"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "react-hot-toast";

export function NFTMinter() {
  const [farmId, setFarmId] = useState("");
  const [tons, setTons] = useState(0);

  const handleMintNFT = async () => {
    try {
      if (tons <= 0) {
        toast.error("Please enter a valid amount of carbon tons");
        return;
      }

      // Mock NFT minting process
      toast.success(`NFT minted for ${tons} tons CO2`);
    
      // Reset form
      setFarmId("");
      setTons(0);
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      toast.error("Failed to mint NFT. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mint Carbon Credit NFT</CardTitle>
        <CardDescription>
          Tokenize your farm's carbon impact into secure NFTs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="farmId">Farm ID</Label>
          <Input
            id="farmId"
            placeholder="e.g., NG-001"
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tons">Carbon Tons</Label>
          <Input
            id="tons"
            type="number"
            placeholder="e.g., 50"
            value={tons}
            onChange={(e) => setTons(Number(e.target.value))}
          />
        </div>
        <Button onClick={handleMintNFT} className="w-full">
          Mint NFT
        </Button>
      </CardContent>
    </Card>
  );
}