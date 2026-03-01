import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeedRow } from "@/components/ui/FeedRow";

export const metadata: Metadata = {
  title: "Blog — Viraj Bhartiya",
  description: "Writing about blockchain, distributed systems, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 pt-20 min-h-screen">
      <h1 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-3">
        Feed
      </h1>
      <p className="font-mono text-xs text-muted mb-8">
        Writing about blockchain, distributed systems, and software engineering.
      </p>

      <SectionLabel label="All Posts" count={posts.length} className="mb-4" />
      <div className="border-t border-border/50">
        {/* Column headers */}
        <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] md:grid-cols-[100px_1fr_auto] gap-3 sm:gap-4 py-2 px-2 -mx-2">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">Date</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">Name</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60 hidden md:block">Type</span>
        </div>
        {posts.map((post) => (
          <FeedRow
            key={post.slug}
            date={formatDate(post.publishedAt)}
            name={post.title}
            type="BLOG"
            tags={post.tags.slice(0, 2)}
            href={`/blog/${post.slug}`}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="font-mono text-sm text-muted py-12 text-center">No posts yet.</p>
      )}
    </main>
  );
}
