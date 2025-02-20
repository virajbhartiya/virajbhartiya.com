import Layout from "@/components/Layout";
import { useEffect } from "react";

export const MeetRedirect = () => {
  const seoData = {
    title:
      "Schedule a Meeting with Viraj Bhartiya - Blockchain & Full-Stack Engineer",
    description:
      "Book a consultation with Viraj Bhartiya - Expert Blockchain Developer & Full-Stack Engineer. Discuss Web3, DApps, Smart Contracts, and Full-Stack Development projects.",
    keywords:
      "schedule meeting viraj bhartiya, blockchain consultation, web3 consultation, smart contract development meeting, full stack development consultation",
    image: "https://virajbhartiya.com/og-image.png",
  };

  useEffect(() => {
    window.location.href = "https://calendly.com/virajbhartiya/30min";
  }, []);

  return (
    <Layout {...seoData}>
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Redirecting to scheduling page...</p>
      </div>
    </Layout>
  );
};
