import React from "react";
import LoginPage from "./login/page";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Welcome to Verdant Vault</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your gateway to sustainable investments and carbon credits
          <LoginPage />
        </p>
      </div>
    </main>
  );
}
