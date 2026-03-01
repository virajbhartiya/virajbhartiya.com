import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viraj Bhartiya",
  description:
    "Blockchain developer and full-stack engineer building decentralized systems, smart contracts, and high-performance web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--fg)] font-sans antialiased pt-12">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
