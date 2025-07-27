import { IBlog } from "@/types/interface";
import { loadBlogPosts } from "@/utils/markdownLoader";

// Helper function to create blog posts from markdown content
export const createBlogPost = (
  title: string,
  description: string,
  content: string,
  publishedAt: string,
  tags: string[],
  image: string = "images/Blog/default.jpg",
  author: string = "Viraj Bhartiya",
  updatedAt?: string,
): IBlog => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  const readTime = Math.ceil(content.split(/\s+/).length / 200);

  return {
    id: slug,
    title,
    description,
    content,
    image,
    publishedAt,
    updatedAt,
    tags,
    readTime,
    author,
    slug,
  };
};

// Blog posts array - will be populated from markdown files
export let blogData: IBlog[] = [];

// Function to load blog posts from markdown files
export const loadBlogData = async (): Promise<IBlog[]> => {
  try {
    blogData = await loadBlogPosts();
    return blogData;
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
};

// Function to get blog by slug
export const getBlogBySlug = (slug: string): IBlog | undefined => {
  return blogData.find((blog) => blog.slug === slug);
};

// Function to get recent blogs
export const getRecentBlogs = (count: number = 3): IBlog[] => {
  return blogData.slice(0, count);
};
