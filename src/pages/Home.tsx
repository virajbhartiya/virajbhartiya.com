import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "../components/Home/Projects";
import { ContactMarquee } from "@/components/Marquees/ContactMe";
import { Experience } from "@/components/Home/Experience";
import { HackathonWins } from "@/components/Home/HackathonWins";
// import { DrawPad } from "@/components/Home/DrawPad";
import { ContributionGraph } from "@/components/Home/ContributionGraph";
import { OpenSourceContributions } from "@/components/Home/OpenourceContributions";
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
      {/* <DrawPad /> */}
      <Experience />
      <HackathonWins />
      <OpenSourceContributions />
      <ContributionGraph />
      <Projects />
      <BlogPreview />
      <LanguageMaqruee />
      <Hello />
      <ContactMarquee />
    </Layout>
  );
};
