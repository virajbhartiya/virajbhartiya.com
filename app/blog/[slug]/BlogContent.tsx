"use client";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const renderInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let keyIndex = 0;

    const inlineRegex =
      /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|`([^`]+)`/g;
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
        elements.push(
          <a
            key={`a-${keyIndex++}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 decoration-accent/30 hover:decoration-accent hover:text-fg transition-colors"
          >
            {match[1]}
          </a>,
        );
      } else if (match[3] !== undefined) {
        elements.push(
          <strong key={`b-${keyIndex++}`} className="font-semibold text-fg">
            {match[3]}
          </strong>,
        );
      } else if (match[4] !== undefined) {
        elements.push(
          <em key={`i-${keyIndex++}`} className="italic text-fg/80">
            {match[4]}
          </em>,
        );
      } else if (match[5] !== undefined) {
        elements.push(
          <code
            key={`c-${keyIndex++}`}
            className="bg-accent/8 border border-accent/10 px-1.5 py-0.5 text-[0.8em] text-accent"
          >
            {match[5]}
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

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="my-6 relative group">
              {codeBlockLang && (
                <span className="absolute top-2 right-3 text-[10px] text-muted/20 uppercase tracking-wider">
                  {codeBlockLang}
                </span>
              )}
              <pre className="bg-[rgba(10,10,10,0.8)] border border-border p-4 overflow-x-auto text-[0.8rem] leading-relaxed">
                <code className="text-fg/90">{codeBlockContent.join("\n")}</code>
              </pre>
            </div>,
          );
          codeBlockContent = [];
          codeBlockLang = "";
          inCodeBlock = false;
        } else {
          codeBlockLang = line.slice(3).trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Headers with ASCII prefix
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-fg text-base mt-10 mb-3">
            {line.substring(4)}
          </h3>,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-fg text-lg mt-12 mb-3">
            {line.substring(3)}
          </h2>,
        );
        continue;
      }
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-fg text-xl mt-12 mb-3">
            {line.substring(2)}
          </h1>,
        );
        continue;
      }

      // Images
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        elements.push(
          <figure key={i} className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="max-w-full border border-border"
            />
            {imageMatch[1] && (
              <figcaption className="text-[10px] text-muted/30 mt-2 uppercase tracking-wider">
                {imageMatch[1]}
              </figcaption>
            )}
          </figure>,
        );
        continue;
      }

      // Blockquotes
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="border-l-2 border-accent pl-4 text-muted italic my-6 text-sm"
          >
            {renderInlineMarkdown(line.substring(2))}
          </blockquote>,
        );
        continue;
      }

      // Horizontal rules
      if (line.trim() === "---" || line.trim() === "***") {
        elements.push(
          <div key={i} className="my-10 flex items-center gap-3" aria-hidden="true">
            <span className="text-border text-[10px]">*</span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-border text-[10px]">*</span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-border text-[10px]">*</span>
          </div>,
        );
        continue;
      }

      // Empty lines
      if (line.trim() === "") continue;

      // Unordered lists
      if (line.match(/^[-*] /)) {
        elements.push(
          <li key={i} className="text-sm text-fg/90 leading-7 mb-1 ml-4 pl-2 relative before:content-['›'] before:absolute before:-left-0 before:text-accent/40">
            {renderInlineMarkdown(line.replace(/^[-*] /, ""))}
          </li>,
        );
        continue;
      }

      // Ordered lists
      const olMatch = line.match(/^(\d+)\. /);
      if (olMatch) {
        elements.push(
          <li key={i} className="text-sm text-fg/90 leading-7 mb-1 ml-4 pl-2 relative">
            <span className="absolute -left-1 text-accent-blue/40 text-xs">{olMatch[1]}.</span>
            {renderInlineMarkdown(line.replace(/^\d+\. /, ""))}
          </li>,
        );
        continue;
      }

      // Paragraphs
      elements.push(
        <p key={i} className="text-sm text-fg/85 leading-7 mb-5">
          {renderInlineMarkdown(line)}
        </p>,
      );
    }

    return elements;
  };

  return <div className="prose-ascii">{renderMarkdown(content)}</div>;
}
