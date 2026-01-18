import { IProject } from "@/types/interface";
import { useState, useEffect, useRef, useCallback } from "react";

interface ProjectProps {
  project: IProject;
  index: number;
}

// Mini ASCII art generator for project thumbnails
const AsciiThumbnail = ({ seed }: { seed: string }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const chars = " .:-=+*#%@";

  // Generate a consistent pattern based on seed
  const hashCode = (s: string) => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  };

  const seedValue = hashCode(seed);

  const render = useCallback(() => {
    if (!preRef.current) return;

    let output = "";
    const t = timeRef.current;
    const width = 20;
    const height = 8;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const wave1 = Math.sin(x * 0.3 + t + seedValue * 0.01);
        const wave2 = Math.cos(y * 0.4 + t * 0.7 + seedValue * 0.02);
        const combined = (wave1 + wave2 + 2) / 4;
        const charIndex = Math.floor(combined * (chars.length - 1));
        output += chars[Math.max(0, Math.min(chars.length - 1, charIndex))];
      }
      output += "\n";
    }

    preRef.current.textContent = output;
    timeRef.current += 0.05;
    frameRef.current = requestAnimationFrame(render);
  }, [seedValue, chars]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(render);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [render]);

  return (
    <pre
      ref={preRef}
      className="font-mono text-[6px] leading-none text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity"
      aria-hidden="true"
    />
  );
};

export const Project = ({ project, index }: ProjectProps) => {
  const indexLabel = (index + 1).toString().padStart(2, "0");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
      className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-black/60 card-hover">
        {/* ASCII corner decorations */}
        <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
        <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
        <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
        <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">+</span>

        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* ASCII Art Thumbnail */}
            <div className="hidden md:flex items-center justify-center w-24 h-20 border border-white/10 bg-black/40">
              <AsciiThumbnail seed={project.title} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--accent)] opacity-60">
                    [{indexLabel}]
                  </span>
                  <h3 className="font-mono text-lg text-white group-hover:text-[var(--accent)] transition-colors truncate">
                    {project.title}
                  </h3>
                </div>
                <span className="font-mono text-[var(--accent)] text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0 group-hover:arrow-animate">
                  {"->"}
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-xs text-white/50 leading-relaxed line-clamp-2 mb-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 border border-white/10 text-white/40 group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)]/60 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="font-mono text-[10px] text-white/30">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hover scan line */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/5 to-transparent animate-scan" />
          </div>
        )}
      </article>
    </a>
  );
};
