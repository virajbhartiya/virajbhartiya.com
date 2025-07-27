import { IBlog } from "@/types/interface";

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const validateBlogPost = (blog: Partial<IBlog>): string[] => {
  const errors: string[] = [];

  if (!blog.title) errors.push('Title is required');
  if (!blog.description) errors.push('Description is required');
  if (!blog.content) errors.push('Content is required');
  if (!blog.author) errors.push('Author is required');
  if (!blog.publishedAt) errors.push('Published date is required');
  if (!blog.tags || blog.tags.length === 0) errors.push('At least one tag is required');
  if (!blog.image) errors.push('Image is required');

  return errors;
};

export const createBlogPost = (data: Omit<IBlog, 'id' | 'slug' | 'readTime'>): IBlog => {
  const id = Date.now().toString();
  const slug = generateSlug(data.title);
  const readTime = calculateReadTime(data.content);

  return {
    id,
    slug,
    readTime,
    ...data,
  };
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getBlogBySlug = (slug: string, blogs: IBlog[]): IBlog | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

export const getRecentBlogs = (blogs: IBlog[], count: number = 3): IBlog[] => {
  return blogs
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
};

export const getBlogsByTag = (tag: string, blogs: IBlog[]): IBlog[] => {
  return blogs.filter(blog => blog.tags.includes(tag));
}; 