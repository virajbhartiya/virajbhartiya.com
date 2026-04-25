import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://virajbhartiya.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Viraj Bhartiya",
    template: "%s — Viraj Bhartiya",
  },
  description:
    "Blockchain developer and full-stack engineer building decentralized systems, smart contracts, and high-performance web applications.",
  openGraph: {
    type: "website",
    siteName: "Viraj Bhartiya",
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viraj Bhartiya — software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@heyxviraj",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Viraj Bhartiya",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description:
    "Blockchain developer and full-stack engineer building decentralized systems, smart contracts, and high-performance web applications.",
  sameAs: [
    "https://github.com/virajbhartiya",
    "https://www.linkedin.com/in/viraj-bhartiya/",
    "https://twitter.com/heyxviraj",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Viraj Bhartiya",
  url: SITE_URL,
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
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
