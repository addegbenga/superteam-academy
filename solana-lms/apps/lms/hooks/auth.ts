"use client"
import { useWallet } from "@solana/wallet-adapter-react";

export function getCurrentUserId(): string {
  const { publicKey } = useWallet();
  return publicKey?.toBase58() ?? "1234"; // fallback for unauthenticated
}