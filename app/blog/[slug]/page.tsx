import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { getPostBySlug, getAllSlugs, getAllPosts } from "@/lib/blog";
import { formatDate, extractToc } from "@/lib/utils";
import { BlogContent } from "./BlogContent";
import { BackLink } from "@/components/ui/BackLink";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { TableOfContents } from "@/components/ui/TableOfContents";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://virajbhartiya.com";

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

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@heyxviraj",
    },
  };
}

function bannerImageIfExists(imagePath: string | undefined): string | null {
  if (!imagePath) return null;
  if (imagePath.includes("default")) return null;
  try {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    if (fs.existsSync(fullPath)) return imagePath;
  } catch {
    return null;
  }
  return null;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const banner = bannerImageIfExists(post.image);
  const toc = extractToc(post.content);

  // Get adjacent posts for navigation
  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: banner ? `${SITE_URL}${banner}` : `${SITE_URL}/og-image.png`,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Viraj Bhartiya",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <main
        id="main"
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 min-h-screen"
      >
        <article id="top">
          {/* Back nav */}
          <div className="mb-8 sm:mb-10">
            <BackLink
              fallback="/blog"
              fallbackLabel="all posts"
              backLabel="back"
              className="text-xs text-muted hover:text-accent transition-colors link-glow"
            />
          </div>

          {/* Header */}
          <header className="mb-10 sm:mb-12">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-widest text-muted mb-5">
              <span className="text-accent-blue tabular-nums">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-border select-none" aria-hidden="true">
                ·
              </span>
              <span className="tabular-nums">{post.readTime} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span className="text-border select-none" aria-hidden="true">
                    ·
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-accent-blue/80 normal-case tracking-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-fg leading-[1.1] tracking-tight mb-5">
              {post.title}
            </h1>

            {/* Description / subtitle */}
            <p className="text-[15px] sm:text-base text-fg/80 leading-relaxed max-w-2xl">
              {post.description}
            </p>

            {/* Author line */}
            <div className="mt-6 flex items-center gap-2 text-[11px] text-muted uppercase tracking-widest">
              <span className="text-accent" aria-hidden="true">
                $
              </span>
              <span>by</span>
              <span className="text-fg/90 normal-case tracking-normal">
                {post.author}
              </span>
            </div>
          </header>

          {/* Banner image — only if it actually exists */}
          {banner && (
            <figure className="mb-10 sm:mb-14 -mx-4 sm:mx-0 border border-border overflow-hidden">
              <div className="relative aspect-[16/9] bg-[var(--bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner}
                  alt={post.title}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover block"
                />
              </div>
            </figure>
          )}

          {/* Mobile TOC — collapsible, quiet styling */}
          {toc.length > 1 && (
            <details className="lg:hidden mb-10 max-w-[68ch] group">
              <summary className="list-none cursor-pointer min-h-[44px] flex items-center justify-between border-y border-border py-3 text-[11px] uppercase tracking-widest text-muted hover:text-fg transition-colors">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="text-accent transition-transform group-open:rotate-90"
                  >
                    ›
                  </span>
                  on this page
                </span>
                <span className="text-muted/70 tabular-nums">{toc.length}</span>
              </summary>
              <div className="pt-4 pb-2">
                <TableOfContents items={toc} showHeader={false} />
              </div>
            </details>
          )}

          {/* Content + desktop sidebar TOC */}
          <div
            className={
              toc.length > 1
                ? "lg:grid lg:grid-cols-[minmax(0,68ch)_minmax(0,200px)] lg:gap-12"
                : ""
            }
          >
            <div className="max-w-[68ch] min-w-0">
              <BlogContent content={post.content} />

              {/* End marker — inside content column so it aligns with the article */}
              <div
                className="mt-16 flex items-center gap-3 text-muted"
                aria-hidden="true"
              >
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] uppercase tracking-widest">
                  end of file
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>

            {toc.length > 1 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            )}
          </div>
        </article>

        {/* Post navigation */}
        {(prevPost || nextPost) && (
          <nav
            aria-label="Adjacent posts"
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prevPost ? (
                <a
                  href={`/blog/${prevPost.slug}`}
                  className="group block border border-border p-4 sm:p-5 hover:border-accent/30 hover:bg-accent/[0.02] transition-colors"
                >
                  <span className="text-[10px] text-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span className="text-accent-blue" aria-hidden="true">
                      &larr;
                    </span>
                    <span>older post</span>
                  </span>
                  <span className="text-[15px] text-fg group-hover:text-accent transition-colors leading-snug">
                    {prevPost.title}
                  </span>
                </a>
              ) : (
                <div className="hidden sm:block" />
              )}
              {nextPost ? (
                <a
                  href={`/blog/${nextPost.slug}`}
                  className="group block border border-border p-4 sm:p-5 hover:border-accent/30 hover:bg-accent/[0.02] transition-colors sm:text-right"
                >
                  <span className="text-[10px] text-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5 sm:justify-end">
                    <span>newer post</span>
                    <span className="text-accent-blue" aria-hidden="true">
                      &rarr;
                    </span>
                  </span>
                  <span className="text-[15px] text-fg group-hover:text-accent transition-colors leading-snug">
                    {nextPost.title}
                  </span>
                </a>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>

            {/* Back to top / all posts */}
            <div className="mt-6 flex items-center justify-between text-xs text-muted">
              <a
                href="/blog"
                className="link-glow hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
              >
                <span aria-hidden="true">&larr;</span>&nbsp;all posts
              </a>
              <a
                href="#top"
                className="link-glow hover:text-accent transition-colors min-h-[44px] inline-flex items-center"
              >
                back to top&nbsp;<span aria-hidden="true">&uarr;</span>
              </a>
            </div>
          </nav>
        )}
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
