import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { BlogContent } from "./BlogContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Viraj Bhartiya`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12 min-h-screen">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-xs text-muted">
            <span>{formatDate(post.publishedAt)}</span>
            <span>&middot;</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="text-xl sm:text-2xl text-fg leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-muted">{post.description}</p>
          <div className="flex gap-2 flex-wrap mt-3">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-muted/50">#{tag}</span>
            ))}
          </div>
        </header>
        <BlogContent content={post.content} />
      </article>

      <div className="mt-16 pt-6 border-t border-border">
        <a href="/blog" className="text-xs text-muted hover:text-accent transition-colors">
          &larr; back
        </a>
      </div>
    </main>
  );
}
