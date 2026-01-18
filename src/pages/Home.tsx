import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { Projects } from "../components/Home/Projects";
import { Experience } from "@/components/Home/Experience";
import { HackathonWins } from "@/components/Home/HackathonWins";
import { ContributionGraph } from "@/components/Home/ContributionGraph";
import { OpenSourceContributions } from "@/components/Home/OpenSourceContributions";
import { BlogPreview } from "@/components/Home/BlogPreview";

export const Home = () => {
  const seoData = {
    title:
      "Viraj Bhartiya | Blockchain Developer & Full-Stack Engineer - Web3, DApps, Smart Contracts",
    description:
      "Expert Blockchain Developer & Full-Stack Engineer specializing in Web3, DApps, Smart Contracts, and Full-Stack Development. Contributing to major protocols like Filecoin, Ethereum, and Near.",
    keywords:
      "blockchain developer, smart contract developer, web3 developer, full stack developer, freelance developer, DApp development, ethereum developer, filecoin developer, React developer, Node.js developer, mobile app developer, protocol engineer, blockchain consultant",
    image: "https://virajbhartiya.com/og-image.png",
  };

  return (
    <Layout {...seoData}>
      <About />
      <Experience />
      <HackathonWins />
      <OpenSourceContributions />
      <ContributionGraph />
      <Projects />
      <BlogPreview />
    </Layout>
  );
};
