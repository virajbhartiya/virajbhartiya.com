import { Link } from "react-router-dom";
import { loadBlogData, getRecentBlogs } from "@/data/blogData";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { IBlog } from "@/types/interface";

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
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-thin accent proto mb-4">
            what I&apos;ve been thinking about
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="accent proto text-lg">Loading...</div>
          </div>
        ) : (
          <>
            <div className="space-y-8 mb-12">
              {recentBlogs.map((blog, index) => (
                <Link key={blog.id} to={`/blog/${blog.slug}`}>
                  <article
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={index * 50}
                    className="group border-b border-gray-800 pb-8 last:border-b-0"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <span className="text-sm proto accent">
                          [{index + 1}]
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-thin mb-2 group-hover:accent transition-colors duration-300">
                          {blog.title}
                        </h3>

                        <p className="font-thin text-gray-400 mb-4 line-clamp-2">
                          {blog.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="accent" />
                              <span className="proto">
                                {formatDate(blog.publishedAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="accent" />
                              <span className="proto">
                                {blog.readTime} MIN READ
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {blog.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs font-normal proto border border-[var(--accent)] rounded"
                                >
                                  {tag.toUpperCase()}
                                </span>
                              ))}
                              {blog.tags.length > 2 && (
                                <span className="px-2 py-0.5 text-xs font-normal proto border rounded">
                                  +{blog.tags.length - 2}
                                </span>
                              )}
                            </div>
                            <ArrowRight
                              size={14}
                              className="accent group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              className="text-center"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)] rounded hover:bg-white hover:text-black transition-colors duration-300 font-thin"
              >
                View All Posts
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
