import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Viraj Bhartiya",
  description: "Writing about blockchain, distributed systems, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 min-h-screen">
      <div className="mb-10">
        <h1 className="section-heading text-xs text-accent uppercase tracking-widest mb-3">
          writing
        </h1>
        <p className="text-sm text-muted max-w-lg">
          Thoughts on blockchain, distributed systems, and software engineering.
        </p>
      </div>

      <div className="space-y-1">
        {posts.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card group block border-l-2 border-border pl-4 py-4 relative"
          >
            {/* Index */}
            <span className="absolute -left-[1px] top-2 -translate-x-full pr-2 text-[10px] text-muted/10 group-hover:text-muted/25 transition-colors select-none hidden sm:inline" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h2 className="text-base text-fg group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-muted leading-relaxed mt-1.5 line-clamp-2 group-hover:text-muted/80 transition-colors max-w-xl">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-accent-blue/40 group-hover:text-accent-blue/60 transition-colors">
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right hidden sm:block">
                <span className="text-xs text-muted/30 block">{formatDate(post.publishedAt)}</span>
                <span className="text-[10px] text-accent-blue mt-1 block">{post.readTime}m read</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-20 text-center">
          <pre className="text-muted/15 text-[10px] mb-3 select-none" aria-hidden="true">{`
  ¯\\_(ツ)_/¯
`}</pre>
          <p className="text-xs text-muted">No posts yet.</p>
        </div>
      )}
    </main>
  );
}
