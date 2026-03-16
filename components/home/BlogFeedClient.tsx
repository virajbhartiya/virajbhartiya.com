"use client";

import { AsciiCycle } from "@/components/ui/AsciiAnimate";

interface BlogPostPreview {
  slug: string;
  title: string;
  description: string;
  readTime: number;
  tags: string[];
}

export function BlogFeedClient({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section id="feed" className="mt-20">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="section-heading text-xs text-accent uppercase tracking-widest">
          writing
        </h2>
        <a
          href="/blog"
          className="link-glow text-xs text-muted hover:text-fg transition-colors"
        >
          all posts &rarr;
        </a>
      </div>

      <div className="space-y-2">
        {posts.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card group block border-l-2 border-border pl-4 py-3 relative"
          >
            <span className="absolute -left-[1px] top-0 -translate-x-full pr-2 text-[10px] text-muted/10 group-hover:text-muted/25 transition-colors select-none hidden sm:inline" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm text-fg group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <AsciiCycle
                  chars={["◦", "●", "◦", "○"]}
                  interval={1200 + i * 300}
                  className="text-[6px] text-accent-blue/40"
                />
                <span className="text-[10px] text-accent-blue">
                  {post.readTime}m
                </span>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-1 group-hover:text-muted/80 transition-colors">
              {post.description}
            </p>
            <div className="flex gap-2 mt-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-muted/20 group-hover:text-muted/35 transition-colors">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
