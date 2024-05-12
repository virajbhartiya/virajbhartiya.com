import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "./Projects";

export const Home = () => {
  return (
    <Layout>
      <About />
      <LanguageMaqruee />
      <Projects />
      <Hello />
    </Layout>
  );
};
