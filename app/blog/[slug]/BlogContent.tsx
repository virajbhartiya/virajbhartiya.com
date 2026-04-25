"use client";

import { slugify } from "@/lib/utils";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const renderInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let keyIndex = 0;

    // Inline tokens, in order of priority:
    //   1. [text](url)    — link
    //   2. **bold**       — bold (asterisk)
    //   3. __bold__       — bold (underscore)
    //   4. *italic*       — italic (asterisk, not part of **)
    //   5. _italic_       — italic (underscore, not part of __ or inside a word)
    //   6. `code`         — inline code
    const inlineRegex =
      /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|__(.+?)__|(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<![A-Za-z0-9_])_(?!_)(.+?)(?<!_)_(?![A-Za-z0-9_])|`([^`]+)`/g;
    let match;
    let lastIndex = 0;

    while ((match = inlineRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <span key={`t-${keyIndex++}`}>
            {text.slice(lastIndex, match.index)}
          </span>,
        );
      }

      if (match[1] !== undefined && match[2] !== undefined) {
        const isExternal = /^https?:\/\//i.test(match[2]);
        elements.push(
          <a
            key={`a-${keyIndex++}`}
            href={match[2]}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-accent decoration-accent/40 underline underline-offset-[3px] hover:decoration-accent hover:text-fg transition-colors"
          >
            {match[1]}
          </a>,
        );
      } else if (match[3] !== undefined || match[4] !== undefined) {
        elements.push(
          <strong key={`b-${keyIndex++}`} className="text-fg font-medium">
            {match[3] ?? match[4]}
          </strong>,
        );
      } else if (match[5] !== undefined || match[6] !== undefined) {
        elements.push(
          <em key={`i-${keyIndex++}`} className="italic text-fg/95">
            {match[5] ?? match[6]}
          </em>,
        );
      } else if (match[7] !== undefined) {
        elements.push(
          <code
            key={`c-${keyIndex++}`}
            className="bg-accent/[0.08] text-accent px-1.5 py-0.5 text-[0.85em] rounded-sm"
          >
            {match[7]}
          </code>,
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      elements.push(
        <span key={`t-${keyIndex++}`}>{text.slice(lastIndex)}</span>,
      );
    }

    return elements.length > 0 ? elements : [<span key="text">{text}</span>];
  };

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = "";
    let currentList: { type: "ul" | "ol"; items: JSX.Element[] } | null = null;
    let paragraphIndex = 0;
    const slugCounts = new Map<string, number>();

    const uniqueSlug = (text: string) => {
      const base = slugify(text) || `section-${elements.length + 1}`;
      const count = slugCounts.get(base) ?? 0;
      slugCounts.set(base, count + 1);
      return count === 0 ? base : `${base}-${count}`;
    };

    const flushList = () => {
      if (!currentList) return;
      const { type, items } = currentList;
      if (type === "ul") {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-6 space-y-2.5 pl-1">
            {items}
          </ul>,
        );
      } else {
        elements.push(
          <ol key={`list-${elements.length}`} className="my-6 space-y-2.5 pl-1">
            {items}
          </ol>,
        );
      }
      currentList = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushList();
          elements.push(
            <div key={`code-${i}`} className="my-8 relative group">
              <div className="flex items-center justify-between border border-border border-b-0 bg-[rgba(0,239,166,0.03)] px-4 py-1.5">
                <span className="text-[10px] text-muted uppercase tracking-widest">
                  {codeBlockLang || "code"}
                </span>
                <div className="flex items-center gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                </div>
              </div>
              <pre className="bg-[rgba(10,10,10,0.6)] border border-border p-4 overflow-x-auto text-[13px] leading-relaxed">
                <code className="text-fg/95 font-mono">
                  {codeBlockContent.join("\n")}
                </code>
              </pre>
            </div>,
          );
          codeBlockContent = [];
          codeBlockLang = "";
          inCodeBlock = false;
        } else {
          flushList();
          codeBlockLang = line.slice(3).trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Headers
      if (line.startsWith("### ")) {
        flushList();
        const text = line.substring(4);
        const id = uniqueSlug(text);
        elements.push(
          <h3
            key={i}
            id={id}
            className="text-[15px] text-accent uppercase tracking-widest mt-12 mb-4"
          >
            {text}
          </h3>,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        flushList();
        const text = line.substring(3);
        const id = uniqueSlug(text);
        elements.push(
          <h2
            key={i}
            id={id}
            className="text-[22px] sm:text-2xl text-fg leading-tight mt-16 mb-5 flex items-baseline gap-3"
          >
            <span className="text-accent text-base shrink-0" aria-hidden="true">
              ##
            </span>
            <span>{text}</span>
          </h2>,
        );
        continue;
      }
      if (line.startsWith("# ")) {
        flushList();
        const text = line.substring(2);
        const id = uniqueSlug(text);
        elements.push(
          <h1
            key={i}
            id={id}
            className="text-2xl sm:text-3xl text-fg leading-tight mt-16 mb-6"
          >
            {text}
          </h1>,
        );
        continue;
      }

      // Images
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        flushList();
        elements.push(
          <figure key={i} className="my-10 -mx-4 sm:mx-0">
            <div className="border border-border overflow-hidden relative aspect-[16/9] bg-[var(--bg)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block"
              />
            </div>
            {imageMatch[1] && (
              <figcaption className="text-[11px] text-muted mt-3 uppercase tracking-widest flex items-center gap-2 px-4 sm:px-0">
                <span className="text-accent/40 select-none" aria-hidden="true">
                  └&gt;
                </span>
                <span>{imageMatch[1]}</span>
              </figcaption>
            )}
          </figure>,
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={i}
            className="relative my-8 pl-6 pr-4 py-2 text-[16px] sm:text-[17px] text-fg/90 leading-relaxed italic border-l-2 border-accent"
          >
            <span
              className="absolute -top-1 -left-1 text-accent/30 text-3xl select-none font-serif leading-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            {renderInlineMarkdown(line.substring(2))}
          </blockquote>,
        );
        continue;
      }

      // Horizontal rules
      if (line.trim() === "---" || line.trim() === "***") {
        flushList();
        elements.push(
          <div
            key={i}
            className="my-12 flex items-center gap-3 text-muted"
            aria-hidden="true"
          >
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] tracking-widest">§</span>
            <div className="flex-1 h-px bg-border" />
          </div>,
        );
        continue;
      }

      // Empty lines
      if (line.trim() === "") {
        flushList();
        continue;
      }

      // Unordered list items
      if (line.match(/^[-*] /)) {
        if (!currentList || currentList.type !== "ul") {
          flushList();
          currentList = { type: "ul", items: [] };
        }
        currentList.items.push(
          <li
            key={i}
            className="text-[16px] text-fg/90 leading-[1.75] pl-6 relative"
          >
            <span
              className="absolute left-0 top-0 text-accent/70 select-none"
              aria-hidden="true"
            >
              ›
            </span>
            {renderInlineMarkdown(line.replace(/^[-*] /, ""))}
          </li>,
        );
        continue;
      }

      // Ordered list items
      const olMatch = line.match(/^(\d+)\. /);
      if (olMatch) {
        if (!currentList || currentList.type !== "ol") {
          flushList();
          currentList = { type: "ol", items: [] };
        }
        currentList.items.push(
          <li
            key={i}
            className="text-[16px] text-fg/90 leading-[1.75] pl-8 relative"
          >
            <span
              className="absolute left-0 top-0 text-accent-blue tabular-nums text-[14px]"
              aria-hidden="true"
            >
              {olMatch[1].padStart(2, "0")}.
            </span>
            {renderInlineMarkdown(line.replace(/^\d+\. /, ""))}
          </li>,
        );
        continue;
      }

      // Paragraphs — first paragraph gets lede treatment
      flushList();
      const isLede = paragraphIndex === 0;
      elements.push(
        <p
          key={i}
          className={
            isLede
              ? "text-[17px] sm:text-[18px] text-fg/95 leading-[1.7] mb-6"
              : "text-[16px] text-fg/90 leading-[1.8] mb-6"
          }
        >
          {renderInlineMarkdown(line)}
        </p>,
      );
      paragraphIndex++;
    }

    // Flush any trailing list
    flushList();

    return elements;
  };

  return <div>{renderMarkdown(content)}</div>;
}
