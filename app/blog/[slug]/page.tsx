import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";
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
    <main className="max-w-3xl mx-auto px-4 pt-20 pb-12 min-h-screen">
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-muted">{formatDate(post.publishedAt)}</span>
            <span className="font-mono text-xs text-muted">&middot;</span>
            <span className="font-mono text-xs text-muted">{post.readTime} min read</span>
          </div>
          <h1 className="font-pixel text-[clamp(1.5rem,4vw,3rem)] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-muted mb-4">{post.description}</p>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>
        <BlogContent content={post.content} />
      </article>

      <div className="mt-16 pt-8 border-t border-border/50">
        <a href="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors">
          &larr; Back to feed
        </a>
      </div>
    </main>
  );
}
