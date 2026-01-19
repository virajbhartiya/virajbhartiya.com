"use client";

import { Share2 } from "lucide-react";

export function ShareButton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1 hover:accent transition-colors duration-300"
    >
      <Share2 size={14} />
      <span className="proto">Share</span>
    </button>
  );
}

export function MarkdownContent({ content }: { content: string }) {
  const renderInlineMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    // Handle links first
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    let processedText = text;

    while ((linkMatch = linkRegex.exec(text)) !== null) {
      if (linkMatch.index > currentIndex) {
        elements.push(
          <span key={`text-${currentIndex}`}>
            {text.slice(currentIndex, linkMatch.index)}
          </span>,
        );
      }

      elements.push(
        <a
          key={`link-${linkMatch.index}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="accent hover:text-white underline transition-colors duration-300"
        >
          {linkMatch[1]}
        </a>,
      );

      currentIndex = linkMatch.index + linkMatch[0].length;
    }

    if (currentIndex < text.length) {
      processedText = text.slice(currentIndex);
    } else {
      processedText = "";
    }

    // Handle bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatch;
    let boldIndex = 0;

    while ((boldMatch = boldRegex.exec(processedText)) !== null) {
      if (boldMatch.index > boldIndex) {
        elements.push(
          <span key={`bold-text-${boldIndex}`}>
            {processedText.slice(boldIndex, boldMatch.index)}
          </span>,
        );
      }

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

    if (boldIndex < processedText.length) {
      processedText = processedText.slice(boldIndex);
    } else {
      processedText = "";
    }

    // Handle italics
    const italicRegex = /(\*|_)(.*?)\1/g;
    let italicMatch;
    let italicIndex = 0;

    while ((italicMatch = italicRegex.exec(processedText)) !== null) {
      if (italicMatch.index > italicIndex) {
        elements.push(
          <span key={`italic-text-${italicIndex}`}>
            {processedText.slice(italicIndex, italicMatch.index)}
          </span>,
        );
      }

      elements.push(
        <em key={`italic-${italicMatch.index}`} className="italic font-thin">
          {italicMatch[2]}
        </em>,
      );

      italicIndex = italicMatch.index + italicMatch[0].length;
    }

    if (italicIndex < processedText.length) {
      processedText = processedText.slice(italicIndex);
    } else {
      processedText = "";
    }

    // Handle inline code
    const codeRegex = /`([^`]+)`/g;
    let codeMatch;
    let codeIndex = 0;

    while ((codeMatch = codeRegex.exec(processedText)) !== null) {
      if (codeMatch.index > codeIndex) {
        elements.push(
          <span key={`code-text-${codeIndex}`}>
            {processedText.slice(codeIndex, codeMatch.index)}
          </span>,
        );
      }

      elements.push(
        <code
          key={`code-${codeMatch.index}`}
          className="bg-[#07251c] text-[#00efa6] px-1 py-0.5 rounded text-sm font-mono"
        >
          {codeMatch[1]}
        </code>,
      );

      codeIndex = codeMatch.index + codeMatch[0].length;
    }

    if (codeIndex < processedText.length) {
      elements.push(
        <span key="text-end">{processedText.slice(codeIndex)}</span>,
      );
    }

    return elements.length > 0 ? elements : [<span key="text">{text}</span>];
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

      // Handle regular paragraphs
      elements.push(
        <p key={i} className="font-thin mb-2">
          {renderInlineMarkdown(line)}
        </p>,
      );
    }

    return elements;
  };

  return <>{renderMarkdown(content)}</>;
}
