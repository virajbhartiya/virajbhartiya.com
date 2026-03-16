import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
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
      className={GeistMono.variable}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--fg)] font-mono antialiased pt-12">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
