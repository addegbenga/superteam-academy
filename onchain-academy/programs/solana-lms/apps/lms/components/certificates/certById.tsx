"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import Image from "next/image";
import {
  Copy,
  Download,
  Share2,
  ExternalLink,
  Check,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Mock certificate data
const MOCK_CERTIFICATES: Record<string, any> = {
  "cert-001": {
    id: "cert-001",
    title: "Solana Developer Bootcamp",
    recipient: "SolanaDev_2024",
    recipientAddress: "7X9...aB2d",
    completedDate: "2024-03-15",
    issuer: "Superteam Academy",
    course: "Solana Development Fundamentals",
    description:
      "Successfully completed the comprehensive Solana Developer Bootcamp, demonstrating mastery in blockchain development, smart contracts, and Solana ecosystem tools.",
    xp: 2500,
    mintAddress: "7X9aB2d4mK9nP3qR5sT7uV9wX2yZ4aB2d",
    contractAddress: "TokenkegQfeZyiNwAJsyFbPVwwQnLPC...",
    tokenId: "42",
    blockNumber: "245123456",
    transactionHash: "5kL8mN2pQ6rS9tU3vW5xY7zA1bC3dE5f...",
    metadata: {
      image:
        "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
      attributes: [
        { trait_type: "Skill Level", value: "Advanced" },
        { trait_type: "Course Duration", value: "8 weeks" },
        { trait_type: "Projects Completed", value: "5" },
      ],
    },
  },
  "cert-002": {
    id: "cert-002",
    title: "Web3 Security Fundamentals",
    recipient: "SolanaDev_2024",
    recipientAddress: "7X9...aB2d",
    completedDate: "2024-02-20",
    issuer: "Superteam Academy",
    course: "Smart Contract Security",
    description:
      "Mastered security best practices for Web3 applications, including auditing, vulnerability assessment, and secure coding patterns.",
    xp: 1800,
    mintAddress: "8Y0bC3e5mK2nP4qR6sT8uV0wX3yZ5aB3e",
    contractAddress: "TokenkegQfeZyiNwAJsyFbPVwwQnLPC...",
    tokenId: "41",
    blockNumber: "244123456",
    transactionHash: "6lM9nO3pR7sT0uV4wX6yZ8aB2cD4eE6g...",
    metadata: {
      image:
        "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?w=800&q=80",
      attributes: [
        { trait_type: "Skill Level", value: "Intermediate" },
        { trait_type: "Course Duration", value: "6 weeks" },
        { trait_type: "Projects Completed", value: "3" },
      ],
    },
  },
};

export default function CertificateById() {
  const params = useParams();
  const certificateId = params.id as string;
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const certificate =
    MOCK_CERTIFICATES[certificateId] || MOCK_CERTIFICATES["cert-001"];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image
    const link = document.createElement("a");
    link.href = certificate.metadata.image;
    link.download = `${certificate.title.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (platform: string) => {
    const title = certificate.title;
    const text = `I just completed "${title}" on Superteam Academy! Check it out:`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-secondary/60 text-foreground/80 border-border font-medium">
              NFT Certificate
            </Badge>
          </div>
          <h1 className="text-4xl tracking-tighter font-heading font-bold text-foreground mb-2">
            {certificate.title}
          </h1>
          <p className="text-muted-foreground tracking-tight text-base">
            {t("certificate.verifyOnchain")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Certificate Display - Left/Center */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certificate Card */}
          <Card className="border-secondary/10 pt-0 bg-secondary/5 overflow-hidden hover:border-secondary/20 transition-colors">
            <div className="aspect-video bg-linear-to-br from-secondary/30 to-primary/30 relative overflow-hidden">
              <Image
                width={100}
                height={100}
                src={certificate.metadata.image}
                alt={certificate.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-heading font-bold text-white text-balance">
                    {certificate.title}
                  </h2>
                  <p className="text-white/80">
                    {certificate.issuer} • Completed on{" "}
                    {new Date(certificate.completedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Certificate Details */}
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("certificate.certificate")} {t("common.details")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {t("certificate.recipient")}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {certificate.recipient}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {t("certificate.completedDate")}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {new Date(certificate.completedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div className="border-t border-secondary/10 pt-6 space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {t("certificate.course")}
                </p>
                <p className="text-base font-medium text-foreground">
                  {certificate.course}
                </p>
              </div>

              <div className="border-t border-secondary/10 pt-6 space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              {/* XP Badge */}
              <div className="border-t border-border pt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border">
                  <span className="text-sm font-medium text-foreground">
                    +{certificate.xp} XP
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Metadata */}
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("certificate.metadata")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certificate.metadata.attributes.map((attr: any, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-secondary/10 border border-secondary/10"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {attr.trait_type}
                  </span>
                  <Badge
                    variant="secondary"
                    className=" text-foreground/80 border-secondary/30"
                  >
                    {attr.value}
                  </Badge>
                </div>
              ))}

              {/* On-Chain Details */}
              <div className="border-t border-secondary/10 pt-4 space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-muted-foreground mb-1">
                    {t("certificate.mintAddress")}
                  </p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10 border border-secondary/20 text-xs font-mono text-foreground truncate">
                    {certificate.mintAddress}
                    <button
                      onClick={() =>
                        handleCopy(certificate.mintAddress, "mint")
                      }
                      className="shrink-0 p-1 hover:bg-secondary/30 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied === "mint" ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium text-muted-foreground mb-1">
                    {t("certificate.contractAddress")}
                  </p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10 border border-secondary/20 text-xs font-mono text-foreground truncate">
                    {certificate.contractAddress}
                    <button
                      onClick={() =>
                        handleCopy(certificate.contractAddress, "contract")
                      }
                      className="shrink-0 p-1 hover:bg-secondary/30 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied === "contract" ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-sm">
                    <p className="font-medium text-muted-foreground mb-1">
                      {t("certificate.tokenId")}
                    </p>
                    <p className="font-mono text-foreground text-xs">
                      {certificate.tokenId}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-muted-foreground mb-1">
                      {t("certificate.blockNumber")}
                    </p>
                    <p className="font-mono text-foreground text-xs">
                      {certificate.blockNumber}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel - Right */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          {/* Download & Share Card */}
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                Share & Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-white h-10"
              >
                <Download className="w-4 h-4" />
                {t("certificate.downloadImage")}
              </Button>

              <div className="space-y-2 border-t border-secondary/10 pt-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("certificate.shareOn")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => handleShare("twitter")}
                    className="p-3 rounded-lg flex items-center justify-center"
                    title="Share on Twitter"
                    variant="outline"
                  >
                    <Twitter className="w-4 h-4 " />
                  </Button>
                  <Button
                    onClick={() => handleShare("linkedin")}
                    className="p-3 rounded-lg transition-colors flex items-center justify-center"
                    title="Share on LinkedIn"
                    variant="outline"
                  >
                    <Linkedin className="w-4 h-4 " />
                  </Button>
                  <Button
                    onClick={() => handleShare("facebook")}
                    className="p-3 rounded-lg flex items-center justify-center"
                    title="Share on Facebook"
                    variant="outline"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Card */}
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("certificate.ownership")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Recipient Address
                </p>
                <p className="text-sm font-mono text-foreground">
                  {certificate.recipientAddress}
                </p>
              </div>

              <Button
                onClick={() =>
                  window.open(
                    `https://solscan.io/token/${certificate.mintAddress}`,
                    "_blank",
                  )
                }
                variant="outline"
                className="w-full gap-2  text-foreground h-10"
              >
                <ExternalLink className="w-4 h-4" />
                {t("certificate.verifyOnchain")} (Solscan)
              </Button>

              <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                This certificate is a soulbound NFT on the Solana blockchain and
                cannot be transferred.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
