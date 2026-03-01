import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readTime: number;
  author: string;
  slug: string;
}

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const slug =
        data.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim() || fileName.replace(/\.md$/, "");

      const readTime = Math.ceil(content.split(/\s+/).length / 200);

      return {
        id: slug,
        title: data.title || "",
        description: data.description || "",
        content: content.trim(),
        image: data.image || "/images/Blog/default.jpg",
        publishedAt: data.publishedAt || "",
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        readTime,
        author: data.author || "Viraj Bhartiya",
        slug,
      } as BlogPost;
    });

  // Sort by published date (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  const posts = getAllPosts();
  return posts.slice(0, count);
}

export function getAllSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.slug);
}
