export interface IRoute {
  href: string;
  label: string;
}

export interface IShareIcon {
  icon: React.ReactNode;
  link: string;
}

export interface IProject {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  // date: string;
}

export interface IBlog {
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
