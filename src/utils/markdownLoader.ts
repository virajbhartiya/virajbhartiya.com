import { IBlog } from "@/types/interface";

// Function to load markdown files dynamically
export const loadBlogPosts = async (): Promise<IBlog[]> => {
  const blogFiles = import.meta.glob('/src/content/blog/*.md', { as: 'raw' });
  const blogs: IBlog[] = [];

  for (const path in blogFiles) {
    try {
      const content = await blogFiles[path]();
      
      // Extract frontmatter and content
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (frontmatterMatch) {
        const [, frontmatter, markdownContent] = frontmatterMatch;
        
        // Parse frontmatter
        const metadata: any = {};
        frontmatter.split('\n').forEach((line: string) => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            if (value.startsWith('"') && value.endsWith('"')) {
              metadata[key.trim()] = value.slice(1, -1);
            } else if (value.startsWith('[') && value.endsWith(']')) {
              metadata[key.trim()] = JSON.parse(value);
            } else {
              metadata[key.trim()] = value;
            }
          }
        });

        // Create blog post object
        const blog: IBlog = {
          id: metadata.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || '',
          title: metadata.title || '',
          description: metadata.description || '',
          content: markdownContent.trim(),
          image: metadata.image || 'images/Blog/default.jpg',
          publishedAt: metadata.publishedAt || '',
          updatedAt: metadata.updatedAt,
          tags: metadata.tags || [],
          readTime: Math.ceil(markdownContent.split(/\s+/).length / 200),
          author: metadata.author || 'Viraj Bhartiya',
          slug: metadata.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || ''
        };

        blogs.push(blog);
      }
    } catch (error) {
      console.error(`Error loading blog file ${path}:`, error);
    }
  }

  // Sort by published date (newest first)
  return blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}; 