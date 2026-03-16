import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog";
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

  // Get adjacent posts for navigation
  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12 min-h-screen">
      <article>
        {/* Header */}
        <header className="mb-10 border-b border-border pb-8">
          <a href="/blog" className="text-xs text-muted hover:text-accent transition-colors link-glow mb-6 inline-block">
            &larr; all posts
          </a>

          <h1 className="text-2xl sm:text-3xl text-fg leading-tight mt-4 mb-4">
            {post.title}
          </h1>

          <p className="text-sm text-muted leading-relaxed max-w-2xl mb-4">
            {post.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted/40">
              <span className="text-accent-blue">{formatDate(post.publishedAt)}</span>
              <span>&middot;</span>
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-accent-blue/40 border border-border px-1.5 py-0.5">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl">
          <BlogContent content={post.content} />
        </div>
      </article>

      {/* Post navigation */}
      <div className="mt-16 pt-8 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <a href={`/blog/${prevPost.slug}`} className="group block border border-border p-4 hover:border-accent/20 transition-colors">
              <span className="text-[10px] text-muted/30 uppercase tracking-wider block mb-1">&larr; older</span>
              <span className="text-sm text-fg group-hover:text-accent transition-colors">{prevPost.title}</span>
            </a>
          ) : <div />}
          {nextPost ? (
            <a href={`/blog/${nextPost.slug}`} className="group block border border-border p-4 hover:border-accent/20 transition-colors text-right">
              <span className="text-[10px] text-muted/30 uppercase tracking-wider block mb-1">newer &rarr;</span>
              <span className="text-sm text-fg group-hover:text-accent transition-colors">{nextPost.title}</span>
            </a>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}
