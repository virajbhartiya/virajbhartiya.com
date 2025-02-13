import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "../components/Home/Projects";
import { ContactMarquee } from "@/components/Marquees/ContactMe";
import { Experience } from "@/components/Home/Experience";
// import { DrawPad } from "@/components/Home/DrawPad";
import { ContributionGraph } from "@/components/Home/ContributionGraph";
import { OpenSourceContributions } from "@/components/Home/OpenourceContributions";

export const Home = () => {
  return (
    <Layout>
      <About />
      {/* <DrawPad /> */}
      <Experience />
      <OpenSourceContributions />
      <ContributionGraph />
      <Projects />
      <LanguageMaqruee />
      <Hello />
      <ContactMarquee />
    </Layout>
  );
};
