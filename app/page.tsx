import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/home/Experience";
import { OpenSource } from "@/components/home/OpenSource";
import { Wins } from "@/components/home/Wins";
import { ProjectsFeed } from "@/components/home/ProjectsFeed";
import { BlogFeed } from "@/components/home/BlogFeed";
import { GithubGraph } from "@/components/home/GithubGraph";
import { Hello } from "@/components/home/Hello";

export default function Home() {
  return (
    <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6">
      <Hero />
      <Experience />
      <OpenSource />
      <Wins />
      <ProjectsFeed />
      <BlogFeed />
      <GithubGraph />
      <Hello />
    </main>
  );
}
