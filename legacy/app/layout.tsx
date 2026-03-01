import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import "./globals.css";

const BASE_URL = "https://virajbhartiya.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Viraj Bhartiya | Blockchain Developer & Full-Stack Engineer",
    template: "%s | Viraj Bhartiya",
  },
  description:
    "Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, Smart Contracts, and Full-Stack Development. Contributing to major protocols like Filecoin, Ethereum, and Near.",
  keywords: [
    "blockchain developer",
    "smart contract developer",
    "web3 developer",
    "full stack developer",
    "freelance developer",
    "DApp development",
    "ethereum developer",
    "filecoin developer",
    "React developer",
    "Node.js developer",
    "mobile app developer",
    "protocol engineer",
    "blockchain consultant",
  ],
  authors: [{ name: "Viraj Bhartiya", url: BASE_URL }],
  creator: "Viraj Bhartiya",
  publisher: "Viraj Bhartiya",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Viraj Bhartiya",
    title: "Viraj Bhartiya | Blockchain Developer & Full-Stack Engineer",
    description:
      "Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, Smart Contracts, and Full-Stack Development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viraj Bhartiya - Blockchain Developer & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viraj Bhartiya | Blockchain Developer & Full-Stack Engineer",
    description:
      "Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, Smart Contracts, and Full-Stack Development.",
    creator: "@heyxviraj",
    site: "@heyxviraj",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#00efa6"
          media="(prefers-color-scheme: dark)"
        />
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nbanlx7gep");
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
