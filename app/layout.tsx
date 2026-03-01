import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--fg)] font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
