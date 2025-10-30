import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../components/providers";

// In development, the URL will be localhost
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Verdant Vault - Unlock Earth's Wealth for African Roots",
  description:
    "Tokenize your farm's carbon impact into secure NFTs. Transparent finance on Hedera, from soil to global markets. Join 8M+ African farmers building wealth.",
  authors: [{ name: "Verdant Vault" }],
  openGraph: {
    title: "Verdant Vault - Unlock Earth's Wealth for African Roots",
    description:
      "Tokenize your farm's carbon impact into secure NFTs. Transparent finance on Hedera, from soil to global markets.",
    type: "website",
    siteName: "Verdant Vault",
    locale: "en_US",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@verdant_vault_dev",
    creator: "@verdant_vault_dev",
    title: "Verdant Vault - Unlock Earth's Wealth for African Roots",
    description:
      "Tokenize your farm's carbon impact into secure NFTs. Transparent finance on Hedera, from soil to global markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
