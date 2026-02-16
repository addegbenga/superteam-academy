import { Space_Grotesk } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/sonner";
import { GlobalProviders } from "@/components/global-providers";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${space_grotesk.variable} font-sans antialiased `}>
        <GlobalProviders>
          <Providers>{children}</Providers>
        </GlobalProviders>
        <Toaster />
      </body>
    </html>
  );
}
