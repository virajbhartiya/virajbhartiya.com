import { Link } from "react-router-dom";
import { loadBlogData, getRecentBlogs } from "@/data/blogData";
import { useEffect, useState } from "react";
import { IBlog } from "@/types/interface";
import { AsciiDivider, AsciiSpinner } from "@/components/ascii";

export const BlogPreview = () => {
  const [recentBlogs, setRecentBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        await loadBlogData();
        const blogs = getRecentBlogs(3);
        setRecentBlogs(blogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  };

  return (
    <section className="mt-24 md:mt-32 px-4">
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            BLOG
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
          {!loading && (
            <span className="font-mono text-xs text-white/30">
              [{recentBlogs.length.toString().padStart(2, "0")}]
            </span>
          )}
        </div>
        <p className="font-mono text-xs text-white/50 max-w-2xl leading-relaxed">
          What I've been thinking about
        </p>
      </div>

      <AsciiDivider variant="dashed" className="mb-8" />

      {loading ? (
        <div className="flex items-center justify-center py-12 font-mono text-sm text-white/40">
          <AsciiSpinner size="md" />
          <span className="ml-3">Loading...</span>
        </div>
      ) : (
        <>
          {/* Blog posts list */}
          <div className="max-w-4xl mx-auto space-y-4">
            {recentBlogs.map((blog, index) => (
              <Link key={blog.id} to={`/blog/${blog.slug}`}>
                <article className="group relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-[var(--accent)]/30 transition-all duration-300 card-hover">
                  {/* Corner decorations */}
                  <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                  <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                  <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                  <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>

                  {/* Index */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20">
                    [{(index + 1).toString().padStart(2, "0")}]
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Meta info */}
                      <div className="flex items-center gap-4 mb-2 font-mono text-[10px] text-white/40">
                        <span className="text-[var(--accent)]">{formatDate(blog.publishedAt)}</span>
                        <span className="text-white/20">|</span>
                        <span>{blog.readTime} MIN READ</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-mono text-lg text-white group-hover:text-[var(--accent)] transition-colors mb-2">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="font-mono text-xs text-white/50 leading-relaxed line-clamp-2 mb-4">
                        {blog.description}
                      </p>

                      {/* Tags and arrow */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] px-2 py-0.5 border border-white/10 text-white/40 group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)]/60 transition-colors"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="font-mono text-[10px] text-white/30">
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[var(--accent)] text-sm opacity-0 group-hover:opacity-100 transition-opacity arrow-animate">
                          {"->"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </article>
              </Link>
            ))}
          </div>

          {/* View all button */}
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="
                inline-flex items-center gap-2 px-6 py-3 font-mono text-sm
                border border-[var(--accent)] text-[var(--accent)]
                hover:bg-[var(--accent)] hover:text-black
                transition-all duration-300 hover-bracket-bounce ascii-box-hover
              "
            >
              <span className="bracket-left">[</span>
              <span>VIEW ALL POSTS</span>
              <span className="bracket-right">]</span>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
