import { About } from "@/components/Home/About";
import { LanguageMaqruee } from "@/components/Marquees/LanguageMarquee";
import { Hello } from "@/components/custom/Spline/Hello";
import { Projects } from "@/components/Home/Projects";
import { ContactMarquee } from "@/components/Marquees/ContactMe";
import { Experience } from "@/components/Home/Experience";
import { HackathonWins } from "@/components/Home/HackathonWins";
import { ContributionGraph } from "@/components/Home/ContributionGraph";
import { OpenSourceContributions } from "@/components/Home/OpenSourceContributions";
import { BlogPreview } from "@/components/Home/BlogPreview";
import Header from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getRecentPosts } from "@/lib/blog";

export default function Home() {
  const recentBlogs = getRecentPosts(3);

  return (
    <div className="relative min-h-screen container">
      <Header />
      <main>
        <About />
        <Experience />
        <HackathonWins />
        <OpenSourceContributions />
        <ContributionGraph />
        <Projects />
        <BlogPreview blogs={recentBlogs} />
        <LanguageMaqruee />
        <Hello />
        <ContactMarquee />
      </main>
      <Footer />
    </div>
  );
}
