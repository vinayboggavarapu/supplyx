"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import merge from "lodash.merge";

const inter = Inter({ subsets: ["latin"] });

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { StateProvider } from "@/context/states";
const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_ID}` }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      // rainbowWallet({ projectId, chains }),
      // walletConnectWallet({ projectId, chains }),
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#dff896",
    accentColorForeground: "#1b1b1b",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SupplyX</title>
      </head>
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={myTheme}>
            <StateProvider>{children}</StateProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
