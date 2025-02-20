import Layout from "@/components/Layout";
import { useEffect } from "react";

export const CVRedirect = () => {
  const seoData = {
    title: "Viraj Bhartiya | Resume - Blockchain & Full-Stack Engineer",
    description:
      "Professional resume of Viraj Bhartiya - Expert Blockchain Developer & Full-Stack Engineer with experience in Web3, DApps, and Smart Contracts.",
    keywords:
      "viraj bhartiya resume, blockchain developer cv, smart contract developer resume, web3 resume, full stack developer cv, blockchain engineer resume",
    image: "https://virajbhartiya.com/og-image.png",
  };

  useEffect(() => {
    window.location.href = "https://virajbhartiya.com/Viraj_Bhartiya.pdf";
  }, []);

  return (
    <Layout {...seoData}>
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Redirecting to CV...</p>
      </div>
    </Layout>
  );
};
