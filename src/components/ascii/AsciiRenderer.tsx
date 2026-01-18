import { useEffect, useRef, useCallback } from "react";

interface AsciiRendererProps {
  width?: number;
  height?: number;
  className?: string;
  fontSize?: number;
  chars?: string;
  color?: string;
  speed?: number;
  pattern?: "wave" | "spiral" | "noise" | "matrix" | "pulse";
  amplitude?: number;
  frequency?: number;
}

const ASCII_CHARS = " .:-=+*#%@";
const ASCII_DENSE = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export const AsciiRenderer = ({
  width = 80,
  height = 30,
  className = "",
  fontSize = 12,
  chars = ASCII_CHARS,
  color = "#00efa6",
  speed = 0.02,
  pattern = "wave",
  amplitude = 1,
  frequency = 1,
}: AsciiRendererProps) => {
  const canvasRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const getChar = useCallback(
    (value: number): string => {
      const normalized = Math.max(0, Math.min(1, value));
      const index = Math.floor(normalized * (chars.length - 1));
      return chars[index];
    },
    [chars]
  );

  const generateWave = useCallback(
    (x: number, y: number, time: number): number => {
      const wave1 = Math.sin(x * 0.1 * frequency + time) * amplitude;
      const wave2 = Math.cos(y * 0.15 * frequency + time * 0.7) * amplitude;
      const wave3 = Math.sin((x + y) * 0.08 * frequency + time * 1.3) * amplitude * 0.5;
      return (wave1 + wave2 + wave3 + 3) / 6;
    },
    [amplitude, frequency]
  );

  const generateSpiral = useCallback(
    (x: number, y: number, time: number): number => {
      const cx = width / 2;
      const cy = height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const spiral = Math.sin(dist * 0.3 * frequency - time * 2 + angle * 3) * amplitude;
      return (spiral + 1) / 2;
    },
    [width, height, amplitude, frequency]
  );

  const generateNoise = useCallback(
    (x: number, y: number, time: number): number => {
      const noise1 = Math.sin(x * 0.5 + time) * Math.cos(y * 0.3 + time * 0.8);
      const noise2 = Math.sin((x + y) * 0.2 + time * 1.5) * amplitude;
      const noise3 = Math.cos(x * 0.8 - y * 0.4 + time * 0.5) * amplitude * 0.5;
      return (noise1 + noise2 + noise3 + 2.5) / 5;
    },
    [amplitude]
  );

  const generateMatrix = useCallback(
    (x: number, y: number, time: number): number => {
      const fall = (y + time * 10 * speed) % height;
      const column = Math.sin(x * 0.5) > 0.3 ? 1 : 0;
      const brightness = (1 - fall / height) * column * amplitude;
      const flicker = Math.random() > 0.98 ? 1 : 0;
      return Math.max(brightness, flicker * 0.5);
    },
    [height, speed, amplitude]
  );

  const generatePulse = useCallback(
    (x: number, y: number, time: number): number => {
      const cx = width / 2;
      const cy = height / 2;
      const dx = x - cx;
      const dy = (y - cy) * 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pulse = Math.sin(dist * 0.2 * frequency - time * 3) * amplitude;
      const fade = Math.max(0, 1 - dist / (width / 2));
      return ((pulse + 1) / 2) * fade;
    },
    [width, height, amplitude, frequency]
  );

  const getPatternValue = useCallback(
    (x: number, y: number, time: number): number => {
      switch (pattern) {
        case "wave":
          return generateWave(x, y, time);
        case "spiral":
          return generateSpiral(x, y, time);
        case "noise":
          return generateNoise(x, y, time);
        case "matrix":
          return generateMatrix(x, y, time);
        case "pulse":
          return generatePulse(x, y, time);
        default:
          return generateWave(x, y, time);
      }
    },
    [pattern, generateWave, generateSpiral, generateNoise, generateMatrix, generatePulse]
  );

  const render = useCallback(() => {
    if (!canvasRef.current) return;

    let output = "";
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = getPatternValue(x, y, timeRef.current);
        output += getChar(value);
      }
      output += "\n";
    }

    canvasRef.current.textContent = output;
    timeRef.current += speed;
    frameRef.current = requestAnimationFrame(render);
  }, [width, height, speed, getPatternValue, getChar]);

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
      ref={canvasRef}
      className={`font-mono leading-none select-none ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        color,
        lineHeight: "1",
        letterSpacing: "0.1em",
      }}
      aria-hidden="true"
    />
  );
};

export const AsciiBackground = ({
  className = "",
  ...props
}: AsciiRendererProps & { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden opacity-20 pointer-events-none ${className}`}>
      <AsciiRenderer width={120} height={40} fontSize={10} {...props} />
    </div>
  );
};

export { ASCII_CHARS, ASCII_DENSE };
