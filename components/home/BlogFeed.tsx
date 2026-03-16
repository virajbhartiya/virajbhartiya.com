import { getAllPosts } from "@/lib/blog";
import { BlogFeedClient } from "./BlogFeedClient";

export function BlogFeed() {
  const posts = getAllPosts();

  if (posts.length === 0) return null;

  const serialized = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    readTime: p.readTime,
    tags: p.tags,
  }));

  return <BlogFeedClient posts={serialized} />;
}
