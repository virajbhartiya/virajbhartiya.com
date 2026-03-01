import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";
import { Experience } from "@/components/home/Experience";
import { ProjectsFeed } from "@/components/home/ProjectsFeed";
import { BlogFeed } from "@/components/home/BlogFeed";
import { projectData } from "@/data/projectData";
import { getRecentPosts } from "@/lib/blog";

export default function Home() {
  const recentPost = getRecentPosts(1)[0];
  const featuredProject = projectData[0];

  return (
    <main className="max-w-6xl mx-auto px-6">
      <Hero />
      {featuredProject && recentPost && (
        <Featured
          project={{
            title: featuredProject.title,
            description: featuredProject.description,
            tags: featuredProject.tags,
            link: featuredProject.link,
          }}
          post={{
            title: recentPost.title,
            description: recentPost.description,
            tags: recentPost.tags,
            slug: recentPost.slug,
          }}
        />
      )}
      <Experience />
      <ProjectsFeed />
      <BlogFeed />
    </main>
  );
}
