import { ReactNode } from "react";

interface AsciiBorderProps {
  children: ReactNode;
  className?: string;
  variant?: "single" | "double" | "rounded" | "heavy" | "dashed";
  title?: string;
  animate?: boolean;
}

const BORDER_CHARS = {
  single: {
    tl: "┌",
    tr: "┐",
    bl: "└",
    br: "┘",
    h: "─",
    v: "│",
  },
  double: {
    tl: "╔",
    tr: "╗",
    bl: "╚",
    br: "╝",
    h: "═",
    v: "║",
  },
  rounded: {
    tl: "╭",
    tr: "╮",
    bl: "╰",
    br: "╯",
    h: "─",
    v: "│",
  },
  heavy: {
    tl: "┏",
    tr: "┓",
    bl: "┗",
    br: "┛",
    h: "━",
    v: "┃",
  },
  dashed: {
    tl: "+",
    tr: "+",
    bl: "+",
    br: "+",
    h: "-",
    v: ":",
  },
};

export const AsciiBorder = ({
  children,
  className = "",
  variant = "single",
  title,
  animate = false,
}: AsciiBorderProps) => {
  const chars = BORDER_CHARS[variant];

  return (
    <div
      className={`relative ${className} ${animate ? "ascii-border-animate" : ""}`}
    >
      {/* Top border */}
      <div className="flex items-center font-mono text-[var(--accent)] text-xs select-none">
        <span>{chars.tl}</span>
        {title ? (
          <>
            <span>{chars.h.repeat(2)}</span>
            <span className="px-2 text-white/80">{title}</span>
            <span className="flex-1">{chars.h.repeat(20)}</span>
          </>
        ) : (
          <span className="flex-1">{chars.h.repeat(40)}</span>
        )}
        <span>{chars.tr}</span>
      </div>

      {/* Content with side borders */}
      <div className="flex">
        <span className="font-mono text-[var(--accent)] text-xs select-none">
          {chars.v}
        </span>
        <div className="flex-1 px-4 py-2">{children}</div>
        <span className="font-mono text-[var(--accent)] text-xs select-none">
          {chars.v}
        </span>
      </div>

      {/* Bottom border */}
      <div className="flex font-mono text-[var(--accent)] text-xs select-none">
        <span>{chars.bl}</span>
        <span className="flex-1">{chars.h.repeat(40)}</span>
        <span>{chars.br}</span>
      </div>
    </div>
  );
};

interface AsciiCardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
}

export const AsciiCard = ({
  children,
  className = "",
  header,
  footer,
  hoverable = true,
}: AsciiCardProps) => {
  return (
    <div
      className={`
        relative font-mono
        border border-white/10
        bg-black/40 backdrop-blur-sm
        transition-all duration-300
        ${hoverable ? "hover:border-[var(--accent)] hover:bg-black/60 hover:shadow-[0_0_20px_rgba(0,239,166,0.1)]" : ""}
        ${className}
      `}
    >
      {/* Corner decorations */}
      <span className="absolute -top-[1px] -left-[1px] text-[var(--accent)] text-xs">+</span>
      <span className="absolute -top-[1px] -right-[1px] text-[var(--accent)] text-xs">+</span>
      <span className="absolute -bottom-[1px] -left-[1px] text-[var(--accent)] text-xs">+</span>
      <span className="absolute -bottom-[1px] -right-[1px] text-[var(--accent)] text-xs">+</span>

      {header && (
        <div className="border-b border-white/10 px-4 py-3 text-xs text-white/60 uppercase tracking-widest">
          {header}
        </div>
      )}

      <div className="p-4">{children}</div>

      {footer && (
        <div className="border-t border-white/10 px-4 py-3 text-xs text-white/40">
          {footer}
        </div>
      )}
    </div>
  );
};

interface AsciiDividerProps {
  className?: string;
  variant?: "solid" | "dashed" | "dotted" | "wave";
  label?: string;
}

export const AsciiDivider = ({
  className = "",
  variant = "solid",
  label,
}: AsciiDividerProps) => {
  const getPattern = () => {
    switch (variant) {
      case "dashed":
        return "- ".repeat(30);
      case "dotted":
        return ". ".repeat(30);
      case "wave":
        return "~-~-".repeat(15);
      default:
        return "─".repeat(60);
    }
  };

  return (
    <div className={`flex items-center font-mono text-white/20 text-xs ${className}`}>
      <span className="flex-1 overflow-hidden whitespace-nowrap">
        {getPattern()}
      </span>
      {label && (
        <>
          <span className="px-4 text-[var(--accent)]">[{label}]</span>
          <span className="flex-1 overflow-hidden whitespace-nowrap">
            {getPattern()}
          </span>
        </>
      )}
    </div>
  );
};
