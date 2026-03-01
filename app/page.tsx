import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
import { Wins } from "@/components/home/Wins";
import { ProjectsFeed } from "@/components/home/ProjectsFeed";
import { BlogFeed } from "@/components/home/BlogFeed";
import { GithubGraph } from "@/components/home/GithubGraph";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Hero />
      <ScrollReveal delay={0.1}>
        <Experience />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Wins />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ProjectsFeed />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BlogFeed />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <GithubGraph />
      </ScrollReveal>
    </main>
  );
}
