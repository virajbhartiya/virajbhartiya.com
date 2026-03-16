import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
import { Wins } from "@/components/home/Wins";
import { ProjectsFeed } from "@/components/home/ProjectsFeed";
import { BlogFeed } from "@/components/home/BlogFeed";
import { GithubGraph } from "@/components/home/GithubGraph";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6">
      <Hero />
      <Experience />
      <Wins />
      <ProjectsFeed />
      <BlogFeed />
      <GithubGraph />
    </main>
  );
}
