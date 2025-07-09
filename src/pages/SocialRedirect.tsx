import Layout from "@/components/Layout";
import { useEffect } from "react";

interface SocialRedirectProps {
  url: string;
}

export const SocialRedirect = ({ url }: SocialRedirectProps) => {
  const getSocialData = (url: string) => {
    if (url.includes("github.com")) {
      return {
        title:
          "Viraj Bhartiya | GitHub Profile - Blockchain & Full-Stack Engineer",
        description:
          "View Viraj Bhartiya's GitHub profile - Expert Blockchain Developer & Full-Stack Engineer with open source contributions to major protocols.",
        keywords:
          "viraj bhartiya github, blockchain developer github, open source contributions, smart contract developer github",
      };
    } else if (url.includes("linkedin.com")) {
      return {
        title:
          "Viraj Bhartiya | LinkedIn Profile - Blockchain & Full-Stack Engineer",
        description:
          "Connect with Viraj Bhartiya on LinkedIn - Expert Blockchain Developer & Full-Stack Engineer specializing in Web3 and DApp development.",
        keywords:
          "viraj bhartiya linkedin, blockchain developer linkedin, web3 developer linkedin, full stack engineer linkedin",
      };
    } else if (url.includes("twitter.com")) {
      return {
        title:
          "Viraj Bhartiya | Twitter Profile - Blockchain & Full-Stack Engineer",
        description:
          "Follow Viraj Bhartiya on Twitter - Expert Blockchain Developer & Full-Stack Engineer sharing insights on Web3, DApps, and blockchain technology.",
        keywords:
          "viraj bhartiya twitter, blockchain developer twitter, web3 developer twitter, blockchain technology twitter",
      };
    } else if (url.includes("youtube.com")) {
      return {
        title:
          "Viraj Bhartiya | YouTube Channel - Blockchain & Full-Stack Engineer",
        description:
          "Subscribe to Viraj Bhartiya's YouTube channel - Expert Blockchain Developer & Full-Stack Engineer sharing tutorials and insights on Web3 development.",
        keywords:
          "viraj bhartiya youtube, blockchain developer youtube, web3 tutorials, smart contract development youtube",
      };
    }
    return {
      title: "Viraj Bhartiya | Social Media - Blockchain & Full-Stack Engineer",
      description:
        "Connect with Viraj Bhartiya - Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, and Smart Contracts.",
      keywords:
        "viraj bhartiya social media, blockchain developer social media, web3 developer social media",
    };
  };

  const socialData = getSocialData(url);
  const seoData = {
    ...socialData,
    image: "https://virajbhartiya.com/og-image.png",
  };

  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <Layout {...seoData}>
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Redirecting to social media profile...</p>
      </div>
    </Layout>
  );
};
