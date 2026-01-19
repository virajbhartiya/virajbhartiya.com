import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Header from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ShareButton, MarkdownContent } from "./BlogContent";

const BASE_URL = "https://virajbhartiya.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const absoluteImageUrl = post.image.startsWith("http")
    ? post.image
    : `${BASE_URL}${post.image.startsWith("/") ? post.image : `/${post.image}`}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteImageUrl],
    },
    other: {
      "article:published_time": post.publishedAt,
      ...(post.updatedAt && { "article:modified_time": post.updatedAt }),
      "article:author": post.author,
      "article:section": "Technology",
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen container">
      <Header />
      <main>
        <section className="min-h-screen pt-20 pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
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
                    <span className="proto">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="proto">{post.readTime} min read</span>
                  </div>
                  <ShareButton
                    title={post.title}
                    description={post.description}
                  />
                </div>

                <h1
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  className="text-4xl sm:text-5xl font-thin accent proto mb-3"
                >
                  {post.title}
                </h1>

                <p
                  data-aos="fade-up"
                  data-aos-duration="1400"
                  className="text-xl font-thin mb-3"
                >
                  {post.description}
                </p>

                <div
                  data-aos="fade-up"
                  data-aos-duration="1600"
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {post.tags.map((tag) => (
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </header>

              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="prose prose-invert prose-lg max-w-none"
              >
                <MarkdownContent content={post.content} />
              </div>

              <footer className="mt-12 pt-8 border-t border-[var(--accent)]">
                <div className="flex items-center justify-between">
                  <div className="font-thin">
                    <p className="proto">Written by {post.author}</p>
                    {post.updatedAt && (
                      <p className="text-sm proto">
                        Last updated: {formatDate(post.updatedAt)}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/blog"
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
      </main>
      <Footer />
    </div>
  );
}
