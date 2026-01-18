import { useEffect, useState, useCallback, useRef } from "react";

interface AsciiTextProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleChars?: string;
  delay?: number;
  loop?: boolean;
  onComplete?: () => void;
}

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const AsciiScrambleText = ({
  text,
  className = "",
  speed = 50,
  scrambleChars = SCRAMBLE_CHARS,
  delay = 0,
  onComplete,
}: AsciiTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(true);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const scramble = useCallback(() => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        result += " ";
      } else {
        result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
    }
    return result;
  }, [text, scrambleChars]);

  useEffect(() => {
    let revealIndex = 0;
    let scrambleFrame = 0;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      if (elapsed < delay) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      scrambleFrame++;

      if (scrambleFrame % 3 === 0 && revealIndex < text.length) {
        revealIndex++;
      }

      const revealed = text.slice(0, revealIndex);
      const remaining = text.slice(revealIndex);
      let scrambled = "";

      for (let i = 0; i < remaining.length; i++) {
        if (remaining[i] === " ") {
          scrambled += " ";
        } else {
          scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }

      setDisplayText(revealed + scrambled);

      if (revealIndex >= text.length) {
        setIsScrambling(false);
        onComplete?.();
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, speed, scrambleChars, delay, scramble, onComplete]);

  return (
    <span className={`font-mono ${className}`} data-scrambling={isScrambling}>
      {displayText || scramble()}
    </span>
  );
};

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export const AsciiTypewriter = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      const typeChar = () => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          timeoutId = setTimeout(typeChar, speed + Math.random() * 30);
        } else {
          onComplete?.();
        }
      };
      typeChar();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, onComplete]);

  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      {cursor && (
        <span
          className={`inline-block w-[0.6em] h-[1.1em] ml-[2px] align-middle transition-opacity duration-100 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "currentColor" }}
        />
      )}
    </span>
  );
};

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
  active?: boolean;
}

export const AsciiGlitchText = ({
  text,
  className = "",
  intensity = 0.1,
  active = true,
}: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    const glitch = () => {
      if (Math.random() < intensity) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (Math.random() < 0.1) {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          } else {
            result += text[i];
          }
        }
        setDisplayText(result);
      } else {
        setDisplayText(text);
      }
      frameRef.current = requestAnimationFrame(glitch);
    };

    frameRef.current = requestAnimationFrame(glitch);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, intensity, active]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
};
