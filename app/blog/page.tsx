import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about blockchain, distributed systems, and software engineering.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog — Viraj Bhartiya",
    description:
      "Writing about blockchain, distributed systems, and software engineering.",
    url: "/blog",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Viraj Bhartiya",
    description:
      "Writing about blockchain, distributed systems, and software engineering.",
    creator: "@heyxviraj",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main
      id="main"
      className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 min-h-screen"
    >
      <div className="mb-10">
        <h1 className="section-heading text-xs text-accent uppercase tracking-widest mb-3">
          writing
        </h1>
        <p className="text-sm text-fg/85 max-w-lg leading-relaxed">
          Thoughts on blockchain, distributed systems, and software engineering.
        </p>
      </div>

      {posts.length > 0 ? (
        <ul className="space-y-7 list-none m-0 p-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <a
                href={`/blog/${post.slug}`}
                className="group block min-h-[44px] py-1"
              >
                <div className="flex items-start gap-4">
                  <span className="text-xs text-muted tabular-nums shrink-0 w-[5.5rem] mt-1">
                    {formatDate(post.publishedAt)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-base sm:text-lg text-fg group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <span className="shrink-0 text-xs text-accent-blue tabular-nums hidden sm:inline">
                        {post.readTime} min
                      </span>
                    </div>
                    <p className="text-[14px] text-fg/75 leading-relaxed mt-1.5 max-w-2xl">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                      <span className="text-[11px] text-accent-blue tabular-nums sm:hidden">
                        {post.readTime} min read
                      </span>
                      {post.tags.length > 0 &&
                        post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-accent-blue/80"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-20 text-center">
          <pre
            className="text-muted text-[10px] mb-3 select-none"
            aria-hidden="true"
          >{`
  ¯\\_(ツ)_/¯
`}</pre>
          <p className="text-xs text-fg/80">No posts yet.</p>
        </div>
      )}
    </main>
  );
}
