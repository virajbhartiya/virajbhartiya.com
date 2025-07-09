import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Footer } from "@/components/shared/Footer";
import Header from "./shared/Header";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

const Layout = ({
  children,
  title = "Viraj Bhartiya | Blockchain Developer & Full-Stack Engineer",
  description = "Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, Smart Contracts, and Full-Stack Development. Contributing to major protocols like Filecoin, Ethereum, and Near.",
  keywords = "blockchain developer, smart contract developer, web3 developer, full stack developer, freelance developer, DApp development, ethereum developer, filecoin developer",
  image = "https://virajbhartiya.com/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: LayoutProps) => {
  const location = useLocation();
  const canonicalUrl = `https://virajbhartiya.com${location.pathname}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://virajbhartiya.com/#person",
    name: "Viraj Bhartiya",
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      "@id": "https://virajbhartiya.com/#logo",
      url: image,
      contentUrl: image,
    },
    sameAs: [
      "https://github.com/virajbhartiya",
      "https://linkedin.com/in/viraj-bhartiya",
      "https://twitter.com/heyxviraj",
    ],
    jobTitle: "Blockchain Developer & Full-Stack Engineer",
    description: description,
    knowsAbout: [
      "Blockchain Development",
      "Smart Contracts",
      "Web Development",
      "DApp Development",
      "Mobile App Development",
      "Full Stack Development",
      "Protocol Engineering",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Blockchain Developer",
      occupationLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
      },
      skills: [
        "Web3",
        "DApps",
        "Smart Contracts",
        "React",
        "Node.js",
        "TypeScript",
        "Solidity",
      ],
    },
    worksFor: [
      {
        "@type": "Organization",
        name: "Protocol Labs",
        url: "https://protocol.ai",
      },
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "KJSCE CodeCell",
        url: "https://github.com/kjsce-codecell",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Viraj Bhartiya" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="Viraj Bhartiya" />
        <meta property="og:locale" content="en_US" />
        {publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}
        {section && <meta property="article:section" content={section} />}
        {tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@heyxviraj" />
        <meta name="twitter:site" content="@heyxviraj" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={title} />

        {/* Additional SEO */}
        <link rel="author" href="https://virajbhartiya.com" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="color-scheme" content="dark light" />
        <meta name="supported-color-schemes" content="dark light" />
        <meta
          name="twitter:app:name:iphone"
          content="Viraj Bhartiya Portfolio"
        />
        <meta name="twitter:app:name:ipad" content="Viraj Bhartiya Portfolio" />
        <meta
          name="twitter:app:name:googleplay"
          content="Viraj Bhartiya Portfolio"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="google-site-verification"
          content="your-verification-code"
        />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta property="og:updated_time" content={new Date().toISOString()} />
        <meta
          property="og:see_also"
          content="https://github.com/virajbhartiya"
        />
        <meta
          property="og:see_also"
          content="https://linkedin.com/in/viraj-bhartiya"
        />
        <meta property="og:see_also" content="https://twitter.com/heyxviraj" />
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
        <meta property="og:determiner" content="the" />
        <meta property="og:audio" content="" />
        <meta property="og:video" content="" />
        <meta name="generator" content="React, Vite, TypeScript" />
        <meta name="application-name" content="Viraj Bhartiya Portfolio" />
        <meta
          name="twitter:app:url:iphone"
          content="https://virajbhartiya.com"
        />
        <meta name="twitter:app:url:ipad" content="https://virajbhartiya.com" />
        <meta
          name="twitter:app:url:googleplay"
          content="https://virajbhartiya.com"
        />
        <meta name="twitter:app:id:iphone" content="virajbhartiya-portfolio" />
        <meta name="twitter:app:id:ipad" content="virajbhartiya-portfolio" />
        <meta
          name="twitter:app:id:googleplay"
          content="virajbhartiya-portfolio"
        />
        <meta name="twitter:app:country" content="IN" />
        <meta
          name="twitter:app:name:iphone"
          content="Viraj Bhartiya Portfolio"
        />
        <meta name="twitter:app:name:ipad" content="Viraj Bhartiya Portfolio" />
        <meta
          name="twitter:app:name:googleplay"
          content="Viraj Bhartiya Portfolio"
        />

        {/* Schema.org markup */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="relative min-h-screen container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
