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
      <h1 className="text-xs text-accent uppercase tracking-widest mb-1">
        writing
      </h1>
      <p className="text-xs text-muted mb-8">
        Blockchain, distributed systems, and software engineering.
      </p>

      <div>
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border-t border-border last:border-b py-2.5 flex items-baseline justify-between gap-4 block"
          >
            <span className="text-sm text-fg group-hover:text-accent transition-colors truncate">
              {post.title}
            </span>
            <span className="text-xs text-muted/40 shrink-0">
              {formatDate(post.publishedAt)}
            </span>
          </a>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-xs text-muted py-12 text-center">No posts yet.</p>
      )}
    </main>
  );
}
