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
      "https://linkedin.com/in/virajbhartiya",
      "https://twitter.com/virajbhartiya",
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
        <meta name="twitter:creator" content="@virajbhartiya" />
        <meta name="twitter:site" content="@virajbhartiya" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Additional SEO */}
        <link rel="author" href="https://virajbhartiya.com" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* Schema.org markup */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="relative min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
