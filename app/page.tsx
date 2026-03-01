import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
import { ProjectsFeed } from "@/components/home/ProjectsFeed";
import { BlogFeed } from "@/components/home/BlogFeed";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6">
      <Hero />
      <ScrollReveal delay={0.1}>
        <Experience />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ProjectsFeed />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <BlogFeed />
      </ScrollReveal>
    </main>
  );
}
