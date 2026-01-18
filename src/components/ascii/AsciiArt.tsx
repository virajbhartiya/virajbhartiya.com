import { useEffect, useRef, useCallback } from "react";

interface AsciiArtProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

// Generative ASCII art inspired by stripe.dev
export const AsciiHeroArt = ({
  className = "",
  width = 60,
  height = 20,
  color = "#00efa6",
}: AsciiArtProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const chars = " .:░▒▓█";

  const render = useCallback(() => {
    if (!preRef.current) return;

    let output = "";
    const t = timeRef.current;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Create flowing wave patterns
        const wave1 = Math.sin(x * 0.1 + t) * Math.cos(y * 0.2 + t * 0.7);
        const wave2 = Math.sin((x + y) * 0.08 + t * 1.3);
        const wave3 = Math.cos(x * 0.15 - y * 0.1 + t * 0.5);

        // Radial gradient from center
        const cx = width / 2;
        const cy = height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radial = Math.cos(dist * 3 - t * 2);

        // Combine patterns
        const combined = (wave1 + wave2 + wave3 + radial) / 4;
        const normalized = (combined + 1) / 2;

        const charIndex = Math.floor(normalized * (chars.length - 1));
        output += chars[Math.max(0, Math.min(chars.length - 1, charIndex))];
      }
      output += "\n";
    }

    preRef.current.textContent = output;
    timeRef.current += 0.03;
    frameRef.current = requestAnimationFrame(render);
  }, [width, height, chars]);

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
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize: "8px",
        color,
        lineHeight: "1",
        letterSpacing: "0.15em",
        textShadow: `0 0 10px ${color}40`,
      }}
      aria-hidden="true"
    />
  );
};

// Matrix-style rain effect
export const AsciiMatrixRain = ({
  className = "",
  width = 80,
  height = 30,
  color = "#00efa6",
}: AsciiArtProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);
  const columnsRef = useRef<{ y: number; speed: number; chars: string[] }[]>([]);

  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

  useEffect(() => {
    // Initialize columns
    columnsRef.current = [];
    for (let x = 0; x < width; x++) {
      columnsRef.current.push({
        y: Math.random() * height * 2 - height,
        speed: 0.3 + Math.random() * 0.5,
        chars: Array(height).fill("").map(() => chars[Math.floor(Math.random() * chars.length)]),
      });
    }
  }, [width, height, chars]);

  const render = useCallback(() => {
    if (!preRef.current) return;

    let output = "";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const col = columnsRef.current[x];
        const charY = Math.floor(y - col.y);

        if (charY >= 0 && charY < col.chars.length) {
          const brightness = 1 - charY / col.chars.length;
          if (brightness > 0.8) {
            output += col.chars[charY % col.chars.length];
          } else if (brightness > 0.3) {
            output += col.chars[charY % col.chars.length].toLowerCase();
          } else {
            output += " ";
          }
        } else {
          output += " ";
        }
      }
      output += "\n";
    }

    // Update column positions
    columnsRef.current.forEach((col) => {
      col.y += col.speed;
      if (col.y > height + 10) {
        col.y = -10;
        col.speed = 0.3 + Math.random() * 0.5;
        col.chars = col.chars.map(() => chars[Math.floor(Math.random() * chars.length)]);
      }
    });

    preRef.current.textContent = output;
    frameRef.current = requestAnimationFrame(render);
  }, [width, height, chars]);

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
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize: "10px",
        color,
        lineHeight: "1.1",
        letterSpacing: "0.1em",
      }}
      aria-hidden="true"
    />
  );
};

// Geometric ASCII patterns
export const AsciiGeometric = ({
  className = "",
  width = 40,
  height = 20,
  color = "#00efa6",
}: AsciiArtProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const render = useCallback(() => {
    if (!preRef.current) return;

    let output = "";
    const t = timeRef.current;
    const chars = "╔╗╚╝═║╠╣╦╩╬░▒▓█";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Create geometric patterns
        const pattern1 = Math.sin(x * 0.3 + t) + Math.sin(y * 0.3 + t);
        const pattern2 = Math.cos((x * y) * 0.02 + t * 0.5);
        const pattern3 = Math.sin(Math.sqrt(x * x + y * y) * 0.3 - t);

        const combined = (pattern1 + pattern2 + pattern3) / 3;
        const normalized = (combined + 1.5) / 3;

        const charIndex = Math.floor(normalized * (chars.length - 1));
        output += chars[Math.max(0, Math.min(chars.length - 1, charIndex))];
      }
      output += "\n";
    }

    preRef.current.textContent = output;
    timeRef.current += 0.02;
    frameRef.current = requestAnimationFrame(render);
  }, [width, height]);

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
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize: "12px",
        color,
        lineHeight: "1",
        letterSpacing: "0",
      }}
      aria-hidden="true"
    />
  );
};

// Static ASCII logo
export const AsciiLogo = ({ className = "" }: { className?: string }) => {
  const logo = `
██╗   ██╗██╗██████╗  █████╗      ██╗
██║   ██║██║██╔══██╗██╔══██╗     ██║
██║   ██║██║██████╔╝███████║     ██║
╚██╗ ██╔╝██║██╔══██╗██╔══██║██   ██║
 ╚████╔╝ ██║██║  ██║██║  ██║╚█████╔╝
  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝
`;

  return (
    <pre
      className={`font-mono text-[var(--accent)] text-xs leading-none select-none ${className}`}
      style={{ letterSpacing: "-0.05em" }}
    >
      {logo}
    </pre>
  );
};

// Animated loading spinner
export const AsciiSpinner = ({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const preRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (preRef.current) {
        indexRef.current = (indexRef.current + 1) % frames.length;
        preRef.current.textContent = frames[indexRef.current];
      }
    }, 80);

    return () => clearInterval(interval);
  }, [frames]);

  const sizeClass = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
  }[size];

  return (
    <span
      ref={preRef}
      className={`font-mono text-[var(--accent)] ${sizeClass} ${className}`}
    >
      {frames[0]}
    </span>
  );
};
