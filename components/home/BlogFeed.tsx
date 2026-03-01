import { Tag } from "@/components/ui/Tag";
import { getAllPosts } from "@/lib/blog";
import { playClick } from "@/lib/audio";

export function BlogFeed() {
  const posts = getAllPosts();

  if (posts.length === 0) return null;

  return (
    <section id="feed" className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight">
          Blogs
        </h2>
        <a
          href="/blog"
          className="font-mono text-xs text-accent uppercase tracking-wider hover:text-fg transition-colors mb-2"
        >
          View all &rarr;
        </a>
      </div>

      {/* Route table */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
        {posts.map((post, i) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-[var(--bg)] p-4 hover:bg-white/[0.02] transition-colors block"
          >
            {/* Route path */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-accent/40">
                /{String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-muted/50">
                {post.readTime}m
              </span>
              <div className="flex gap-1 ml-auto">
                {post.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors leading-snug">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted leading-relaxed mt-1.5 line-clamp-2">
              {post.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
