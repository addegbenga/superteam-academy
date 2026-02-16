// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import {
//   PhantomWalletAdapter,
//   SolflareWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
// import { clusterApiUrl } from "@solana/web3.js";
// import { useState } from "react";
// import "@solana/wallet-adapter-react-ui/styles.css";
// import { AuthProvider } from "./auth-provider";

// // ✅ Static Solana config (module scope)
// const network = WalletAdapterNetwork.Devnet;
// const endpoint = clusterApiUrl(network);

// const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

// export function GlobalProviders({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60 * 1000,
//             gcTime: 5 * 60 * 1000,
//             retry: 1,
//             refetchOnWindowFocus: false,
//           },
//         },
//       }),
//   );

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ConnectionProvider endpoint={endpoint}>
//         <WalletProvider wallets={wallets} autoConnect>
//           <WalletModalProvider>
//             <AuthProvider>{children}</AuthProvider>
//             <ReactQueryDevtools initialIsOpen={false} />
//           </WalletModalProvider>
//         </WalletProvider>
//       </ConnectionProvider>
//     </QueryClientProvider>
//   );
// }


"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, useState } from "react";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "sonner";

import "@solana/wallet-adapter-react-ui/styles.css";

// ✅ Static Solana config (module scope)
const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );



  // Popular Solana wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),      // Most popular
      new CoinbaseWalletAdapter(),     // CEX integration
      new TrustWalletAdapter(),        // Mobile-first
    ],
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <AuthProvider>
              {children}
              <Toaster position="top-right" richColors />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
}