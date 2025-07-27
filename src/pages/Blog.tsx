import Layout from "@/components/Layout";
import { loadBlogData } from "@/data/blogData";
import { IBlog } from "@/types/interface";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Blog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const loadedBlogs = await loadBlogData();
        setBlogs(loadedBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const seoData = {
    title: "Blog | Viraj Bhartiya - Blockchain Developer & Full-Stack Engineer",
    description: "Insights, tutorials, and thoughts on blockchain development, Web3, smart contracts, and full-stack engineering from Viraj Bhartiya.",
    keywords: "blog, blockchain development, web3, smart contracts, full stack development, tutorials, insights, viraj bhartiya",
    image: "https://virajbhartiya.com/og-image.png",
  };

  return (
    <Layout {...seoData}>
      <section className="min-h-screen pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-thin accent proto mb-4">
              thoughts & stuff
            </h1>
            <p className="font-thin text-lg">
              Random thoughts on{" "}
              <span className="accent font-normal proto">
                blockchain, Web3, and engineering
              </span>
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="accent proto text-lg">Loading...</div>
            </div>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const BlogCard = ({ blog, index }: { blog: IBlog; index: number }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${blog.slug}`}>
      <article
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay={index * 50}
        className="group border-b border-gray-800 pb-8 last:border-b-0"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <span className="text-sm proto accent">[{String(index + 1).padStart(2, '0')}]</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-thin mb-2 group-hover:accent transition-colors duration-300">
              {blog.title}
            </h2>
            
            <p className="font-thin text-gray-400 mb-4 line-clamp-2">
              {blog.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="accent" />
                  <span className="proto">{formatDate(blog.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="accent" />
                  <span className="proto">{blog.readTime} min</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-normal proto border border-[var(--accent)] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="px-2 py-0.5 text-xs font-normal proto border rounded">
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>
                <ArrowRight size={14} className="accent group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}; 