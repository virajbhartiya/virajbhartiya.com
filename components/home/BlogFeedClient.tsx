"use client";

import { formatDate } from "@/lib/utils";

interface BlogPostPreview {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export function BlogFeedClient({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section
      id="feed"
      className="mt-16 sm:mt-20"
      aria-labelledby="writing-heading"
    >
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2
          id="writing-heading"
          className="section-heading text-xs text-accent uppercase tracking-widest"
        >
          writing
        </h2>
        <a
          href="/blog"
          className="link-glow text-xs text-muted hover:text-fg transition-colors"
        >
          all posts &rarr;
        </a>
      </div>

      <ul className="space-y-5 sm:space-y-6 list-none m-0 p-0">
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`} className="group block relative">
              <div className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-x-4">
                <div className="hidden sm:block pt-1">
                  <span className="text-[11px] sm:text-xs text-muted tabular-nums">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 sm:hidden">
                    <span className="text-[10px] uppercase tracking-wider text-muted tabular-nums">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span
                      className="text-border select-none"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-accent-blue tabular-nums">
                      {post.readTime} min read
                    </span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <h3 className="text-[15px] sm:text-[17px] font-medium tracking-tight text-fg group-hover:text-accent transition-colors flex-1 min-w-0 leading-snug">
                      {post.title}
                    </h3>
                    <span className="hidden sm:inline text-[11px] sm:text-xs text-accent-blue shrink-0 tabular-nums pt-0.5">
                      {post.readTime} min
                    </span>
                  </div>

                  <p className="text-[12px] sm:text-[13px] text-fg/62 leading-relaxed mt-2 max-w-2xl line-clamp-2">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] sm:text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
