import { getAllPosts } from "@/lib/blog";

export function BlogFeed() {
  const posts = getAllPosts();

  if (posts.length === 0) return null;

  return (
    <section id="feed" className="mt-14">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2 className="text-xs text-accent uppercase tracking-widest">
          writing
        </h2>
        <a
          href="/blog"
          className="text-xs text-muted hover:text-fg transition-colors"
        >
          all posts &rarr;
        </a>
      </div>

      {/* Blog cards — each with left accent border */}
      <div className="space-y-3">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border-l-2 border-border hover:border-accent pl-4 py-2 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm text-fg group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <span className="text-[10px] text-accent-blue shrink-0">
                {post.readTime}m
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed mt-1 line-clamp-1">
              {post.description}
            </p>
            <div className="flex gap-2 mt-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-muted/25">
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
