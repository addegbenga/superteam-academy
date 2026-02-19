import {  Space_Grotesk } from "next/font/google";
import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { HomeLayout } from "@/components/layout";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

// const fontMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${space_grotesk.variable}  font-sans antialiased `}
      >
        <Providers>
          <HomeLayout>{children}</HomeLayout>
        </Providers>
      </body>
    </html>
  );
}
