"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chains, config } from "@/config/walletConfig";
import "@rainbow-me/rainbowkit/styles.css";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable auto-refetch on window focus
            refetchOnWindowFocus: false,
            // Disable auto-refetch on mount
            refetchOnMount: false,
            // Disable auto-refetch on reconnect
            refetchOnReconnect: false,
            // Cache data for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Never mark data as stale
            cacheTime: Infinity,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
