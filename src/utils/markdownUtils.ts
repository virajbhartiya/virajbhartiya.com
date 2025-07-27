export interface BlogFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
  author: string;
  updatedAt?: string;
  readTime?: number;
  slug?: string;
}

export const parseMarkdownFile = (content: string): { frontmatter: BlogFrontmatter; content: string } => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('Invalid markdown file: missing frontmatter');
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  // Parse frontmatter
  const frontmatter: Partial<BlogFrontmatter> = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle arrays (tags)
    if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
      const tagsString = value.slice(1, -1);
      frontmatter.tags = tagsString.split(',').map(tag => tag.trim().replace(/"/g, '').replace(/'/g, ''));
    } else {
      (frontmatter as Record<string, unknown>)[key] = value;
    }
  }

  // Validate required fields
  const requiredFields = ['title', 'description', 'publishedAt', 'tags', 'image', 'author'];
  for (const field of requiredFields) {
    if (!frontmatter[field as keyof BlogFrontmatter]) {
      throw new Error(`Missing required frontmatter field: ${field}`);
    }
  }

  return {
    frontmatter: frontmatter as BlogFrontmatter,
    content: markdownContent.trim()
  };
};

export const calculateReadTime = (content: string): number => {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}; 