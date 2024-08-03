import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "../components/Home/Projects";
import { ContactMarquee } from "@/components/Marquees/ContactMe";
import { Experience } from "@/components/Home/Experience";
import { DrawPad } from "@/components/Home/DrawPad";

export const Home = () => {
  return (
    <Layout>
      <About />
      <DrawPad />
      <Experience />
      <LanguageMaqruee />
      <Projects />
      <Hello />
      <ContactMarquee />
    </Layout>
  );
};
