import { About } from "@/components/Home/About";
import Layout from "@/components/Layout";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "./Projects";
import { ContactMarquee } from "@/components/Marquees/ContactMe";

export const Home = () => {
  return (
    <Layout>
      <About />
      <Projects />
      <LanguageMaqruee />
      <Hello />
      <ContactMarquee />
    </Layout>
  );
};
