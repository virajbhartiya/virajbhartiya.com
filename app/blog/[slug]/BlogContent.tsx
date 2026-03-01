"use client";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const renderInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let remaining = text;
    let keyIndex = 0;

    // Process inline elements with a single pass using a combined regex
    const inlineRegex =
      /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|`([^`]+)`/g;
    let match;
    let lastIndex = 0;

    while ((match = inlineRegex.exec(remaining)) !== null) {
      // Push preceding text
      if (match.index > lastIndex) {
        elements.push(
          <span key={`t-${keyIndex++}`}>
            {remaining.slice(lastIndex, match.index)}
          </span>,
        );
      }

      if (match[1] !== undefined && match[2] !== undefined) {
        // Link: [text](url)
        elements.push(
          <a
            key={`a-${keyIndex++}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-fg transition-colors"
          >
            {match[1]}
          </a>,
        );
      } else if (match[3] !== undefined) {
        // Bold: **text**
        elements.push(
          <strong key={`b-${keyIndex++}`} className="font-semibold text-fg">
            {match[3]}
          </strong>,
        );
      } else if (match[4] !== undefined) {
        // Italic: *text*
        elements.push(
          <em key={`i-${keyIndex++}`} className="italic">
            {match[4]}
          </em>,
        );
      } else if (match[5] !== undefined) {
        // Inline code: `code`
        elements.push(
          <code
            key={`c-${keyIndex++}`}
            className="font-mono bg-[rgba(0,239,166,0.1)] px-1.5 py-0.5 rounded text-[0.8em] text-accent"
          >
            {match[5]}
          </code>,
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Push remaining text
    if (lastIndex < remaining.length) {
      elements.push(
        <span key={`t-${keyIndex++}`}>{remaining.slice(lastIndex)}</span>,
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

      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${i}`}
              className="bg-[rgba(15,23,42,0.8)] border border-border rounded p-4 overflow-x-auto my-6 text-[0.8rem]"
            >
              <code className="font-mono text-fg">{codeBlockContent.join("\n")}</code>
            </pre>,
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

      // Handle headers
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="font-mono text-fg text-base mt-8 mb-2">
            {line.substring(4)}
          </h3>,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="font-mono text-fg text-xl mt-8 mb-2">
            {line.substring(3)}
          </h2>,
        );
        continue;
      }
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="font-mono text-fg text-2xl mt-8 mb-2">
            {line.substring(2)}
          </h1>,
        );
        continue;
      }

      // Handle images: ![alt](src)
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        elements.push(
          <div key={i} className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="max-w-full border border-border rounded"
            />
          </div>,
        );
        continue;
      }

      // Handle blockquotes
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

      // Handle horizontal rules
      if (line.trim() === "---" || line.trim() === "***") {
        elements.push(
          <hr key={i} className="border-none border-t border-border my-8" />,
        );
        continue;
      }

      // Handle empty lines
      if (line.trim() === "") {
        continue;
      }

      // Handle unordered lists
      if (line.match(/^[-*] /)) {
        elements.push(
          <li
            key={i}
            className="text-sm text-fg leading-7 mb-1 ml-6 list-disc"
          >
            {renderInlineMarkdown(line.replace(/^[-*] /, ""))}
          </li>,
        );
        continue;
      }

      // Handle ordered lists
      const olMatch = line.match(/^(\d+)\. /);
      if (olMatch) {
        elements.push(
          <li
            key={i}
            className="text-sm text-fg leading-7 mb-1 ml-6 list-decimal"
          >
            {renderInlineMarkdown(line.replace(/^\d+\. /, ""))}
          </li>,
        );
        continue;
      }

      // Regular paragraphs
      elements.push(
        <p key={i} className="text-sm text-fg leading-7 mb-4">
          {renderInlineMarkdown(line)}
        </p>,
      );
    }

    return elements;
  };

  return <div className="prose-ascii">{renderMarkdown(content)}</div>;
}
