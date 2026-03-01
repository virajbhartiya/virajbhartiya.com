import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeedRow } from "@/components/ui/FeedRow";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function BlogFeed() {
  const posts = getAllPosts();

  if (posts.length === 0) return null;

  return (
    <section id="feed" className="mt-24">
      <SectionLabel label="Feed" className="mb-6" />
      <div className="border-t border-border/50">
        {/* Column headers */}
        <div className="grid grid-cols-[100px_1fr_auto] gap-4 py-2 px-2 -mx-2">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
            Date
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
            Name
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">
            Type
          </span>
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
    </section>
  );
}
