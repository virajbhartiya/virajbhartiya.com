import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { loadBlogData, getBlogBySlug } from "@/data/blogData";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IBlog } from "@/types/interface";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        await loadBlogData();
        const foundBlog = getBlogBySlug(slug || "");
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <Layout
        title="Loading... | Viraj Bhartiya"
        description="Loading blog post..."
      >
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
          <div className="text-center">
            <div className="accent proto text-lg">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout
        title="Blog Post Not Found | Viraj Bhartiya"
        description="The requested blog post could not be found."
      >
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-thin accent proto mb-4">
              Post Not Found
            </h1>
            <p className="font-thin mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)] rounded hover:bg-white hover:text-black transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const seoData = {
    title: `${blog.title} | Viraj Bhartiya`,
    description: blog.description,
    keywords: blog.tags.join(", "),
    image: blog.image,
    type: "article" as const,
    publishedTime: blog.publishedAt,
    modifiedTime: blog.updatedAt,
    tags: blog.tags,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <div
              key={`code-${i}`}
              className="border border-[var(--accent)] rounded p-4 my-4 overflow-x-auto"
            >
              <pre className="text-sm font-thin proto">
                <code>{codeBlockContent.join("\n")}</code>
              </pre>
            </div>,
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Handle headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-3xl font-thin accent proto mt-4 mb-2">
            {line.substring(2)}
          </h1>,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-thin accent proto mt-3 mb-2">
            {line.substring(3)}
          </h2>,
        );
        continue;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-thin accent proto mt-2 mb-1">
            {line.substring(4)}
          </h3>,
        );
        continue;
      }

      // Handle empty lines
      if (line.trim() === "") {
        elements.push(<br key={i} />);
        continue;
      }

      // Handle lists
      if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="font-thin ml-4 mb-1">
            {renderInlineMarkdown(line.substring(2))}
          </li>,
        );
        continue;
      }

      // Handle regular paragraphs with inline markdown
      elements.push(
        <p key={i} className="font-thin mb-2">
          {renderInlineMarkdown(line)}
        </p>,
      );
    }

    return elements;
  };

  const renderInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let currentIndex = 0;
    
    // Handle links first
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    let processedText = text;
    
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (linkMatch.index > currentIndex) {
        elements.push(
          <span key={`text-${currentIndex}`}>
            {text.slice(currentIndex, linkMatch.index)}
          </span>
        );
      }

      // Add link
      elements.push(
        <a
          key={`link-${linkMatch.index}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="accent hover:text-white underline transition-colors duration-300"
        >
          {linkMatch[1]}
        </a>
      );

      currentIndex = linkMatch.index + linkMatch[0].length;
    }

    // Add remaining text after links
    if (currentIndex < text.length) {
      processedText = text.slice(currentIndex);
    } else {
      processedText = '';
    }

    // Handle bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatch;
    let boldIndex = 0;

    while ((boldMatch = boldRegex.exec(processedText)) !== null) {
      // Add text before the bold
      if (boldMatch.index > boldIndex) {
        elements.push(
          <span key={`text-${boldIndex}`}>
            {processedText.slice(boldIndex, boldMatch.index)}
          </span>,
        );
      }

      // Add bold text
      elements.push(
        <strong
          key={`bold-${boldMatch.index}`}
          className="accent font-normal proto"
        >
          {boldMatch[1]}
        </strong>,
      );

      boldIndex = boldMatch.index + boldMatch[0].length;
    }

    // Add remaining text after bold
    if (boldIndex < processedText.length) {
      processedText = processedText.slice(boldIndex);
    } else {
      processedText = '';
    }

    // Handle italics (both *text* and _text_)
    const italicRegex = /(\*|_)(.*?)\1/g;
    let italicMatch;
    let italicIndex = 0;

    while ((italicMatch = italicRegex.exec(processedText)) !== null) {
      // Add text before the italic
      if (italicMatch.index > italicIndex) {
        elements.push(
          <span key={`text-${italicIndex}`}>
            {processedText.slice(italicIndex, italicMatch.index)}
          </span>,
        );
      }

      // Add italic text
      elements.push(
        <em
          key={`italic-${italicMatch.index}`}
          className="italic font-thin"
        >
          {italicMatch[2]}
        </em>,
      );

      italicIndex = italicMatch.index + italicMatch[0].length;
    }

    // Add remaining text
    if (italicIndex < processedText.length) {
      elements.push(<span key={`text-end`}>{processedText.slice(italicIndex)}</span>);
    }

    return elements.length > 0 ? elements : [<span key="text">{text}</span>];
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout {...seoData}>
      <section className="min-h-screen pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 accent hover:text-white mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <article>
            <header className="mb-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="flex items-center gap-4 text-sm mb-3"
              >
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span className="proto">{formatDate(blog.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span className="proto">{blog.readTime} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:accent transition-colors duration-300"
                >
                  <Share2 size={14} />
                  <span className="proto">Share</span>
                </button>
              </div>

              <h1
                data-aos="fade-up"
                data-aos-duration="1200"
                className="text-4xl sm:text-5xl font-thin accent proto mb-3"
              >
                {blog.title}
              </h1>

              <p
                data-aos="fade-up"
                data-aos-duration="1400"
                className="text-xl font-thin mb-3"
              >
                {blog.description}
              </p>

              <div
                data-aos="fade-up"
                data-aos-duration="1600"
                className="flex flex-wrap gap-2 mb-4"
              >
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-normal proto border border-[var(--accent)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                data-aos="fade-up"
                data-aos-duration="1800"
                className="aspect-video rounded overflow-hidden mb-4 border border-[var(--accent)]"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </header>

            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="prose prose-invert prose-lg max-w-none"
            >
              {renderMarkdown(blog.content)}
            </div>

            <footer className="mt-12 pt-8 border-t border-[var(--accent)]">
              <div className="flex items-center justify-between">
                <div className="font-thin">
                  <p className="proto">Written by {blog.author}</p>
                  {blog.updatedAt && (
                    <p className="text-sm proto">
                      Last updated: {formatDate(blog.updatedAt)}
                    </p>
                  )}
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--accent)] rounded hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </Layout>
  );
};
