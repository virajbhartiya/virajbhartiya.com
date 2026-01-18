import { useEffect, useRef, useState, useCallback } from "react";

// ============================================
// ASCII CURSOR WITH TRAIL
// ============================================
export const AsciiCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; char: string; opacity: number }[]>([]);
  const chars = "░▒▓█▓▒░·:*+";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add to trail
      const newChar = chars[Math.floor(Math.random() * chars.length)];
      setTrail((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, char: newChar, opacity: 1 },
      ]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Fade out trail
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((t) => ({ ...t, opacity: t.opacity - 0.1 }))
          .filter((t) => t.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
    };
  }, [chars]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail */}
      {trail.map((t, i) => (
        <span
          key={i}
          className="absolute font-mono text-[var(--accent)] transition-opacity"
          style={{
            left: t.x,
            top: t.y,
            opacity: t.opacity * 0.5,
            transform: "translate(-50%, -50%)",
            fontSize: `${8 + (i / trail.length) * 8}px`,
            textShadow: `0 0 ${5 + i}px var(--accent)`,
          }}
        >
          {t.char}
        </span>
      ))}
      {/* Main cursor */}
      <span
        className="absolute font-mono text-[var(--accent)] text-lg"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          textShadow: "0 0 10px var(--accent), 0 0 20px var(--accent)",
        }}
      >
        +
      </span>
    </div>
  );
};

// ============================================
// MOUSE-REACTIVE PARTICLES
// ============================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  life: number;
  maxLife: number;
  size: number;
}

export const AsciiParticles = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number>(0);
  const chars = "░▒▓█╳╬◈◆◇○●∙·:+*";

  const createParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      char: chars[Math.floor(Math.random() * chars.length)],
      life: 1,
      maxLife: 60 + Math.random() * 60,
      size: 10 + Math.random() * 10,
    };
  }, [chars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      // Spawn particles on mouse move
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Burst of particles on click
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) return false;

        // Apply mouse attraction/repulsion
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.vx -= (dx / dist) * force * 0.5;
            p.vy -= (dy / dist) * force * 0.5;
          }
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Draw particle
        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `rgba(0, 239, 166, ${p.life})`;
        ctx.shadowColor = "#00efa6";
        ctx.shadowBlur = 10 * p.life;
        ctx.fillText(p.char, p.x, p.y);

        return true;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-40 ${className}`}
    />
  );
};

// ============================================
// INTERACTIVE ASCII HERO (Mouse Reactive)
// ============================================
export const AsciiInteractiveHero = ({
  className = "",
  width = 80,
  height = 25,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  const chars = " ·:░▒▓█▓▒░:·";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: 0.5, y: 0.5 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const render = useCallback(() => {
    if (!preRef.current) return;

    // Smooth mouse interpolation
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

    let output = "";
    const t = timeRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const ny = y / height;

        // Distance from mouse
        const dmx = nx - mx;
        const dmy = ny - my;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        const mouseInfluence = Math.exp(-mouseDist * 5);

        // Wave patterns influenced by mouse
        const wave1 = Math.sin(nx * 8 + t + mouseInfluence * 3) * Math.cos(ny * 8 + t * 0.7);
        const wave2 = Math.sin((nx + ny) * 6 + t * 1.3 + mx * 10);
        const wave3 = Math.cos(nx * 10 - ny * 8 + t * 0.5 + my * 10);

        // Ripple from mouse position
        const ripple = Math.sin(mouseDist * 20 - t * 3) * mouseInfluence * 2;

        // Radial gradient from mouse
        const radialMouse = Math.cos(mouseDist * 8 - t * 2) * 0.5;

        // Combine all effects
        const combined = (wave1 + wave2 + wave3 + ripple + radialMouse) / 4;
        const normalized = (combined + 1) / 2;

        // Add brightness boost near mouse
        const boosted = Math.min(1, normalized + mouseInfluence * 0.5);

        const charIndex = Math.floor(boosted * (chars.length - 1));
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
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [render]);

  return (
    <div ref={containerRef} className={`relative cursor-none ${className}`}>
      <pre
        ref={preRef}
        className="font-mono leading-none select-none"
        style={{
          fontSize: "clamp(6px, 1vw, 10px)",
          color: "#00efa6",
          lineHeight: "1",
          letterSpacing: "0.1em",
          textShadow: "0 0 10px #00efa640",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

// ============================================
// CLICK RIPPLE EFFECT
// ============================================
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const AsciiRipples = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const chars = "·:░▒▓█▓▒░:·";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setRipples((prev) => [
        ...prev,
        {
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 150,
          opacity: 1,
        },
      ]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;

    const interval = setInterval(() => {
      setRipples((prev) =>
        prev
          .map((r) => ({
            ...r,
            radius: r.radius + 8,
            opacity: 1 - r.radius / r.maxRadius,
          }))
          .filter((r) => r.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [ripples.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map((ripple, i) => {
        const circumference = Math.PI * 2 * ripple.radius;
        const charCount = Math.max(8, Math.floor(circumference / 15));

        return (
          <div key={i}>
            {Array.from({ length: charCount }).map((_, j) => {
              const angle = (j / charCount) * Math.PI * 2;
              const x = ripple.x + Math.cos(angle) * ripple.radius;
              const y = ripple.y + Math.sin(angle) * ripple.radius;
              const charIndex = Math.floor((ripple.radius / ripple.maxRadius) * (chars.length - 1));

              return (
                <span
                  key={j}
                  className="absolute font-mono text-[var(--accent)]"
                  style={{
                    left: x,
                    top: y,
                    opacity: ripple.opacity,
                    transform: "translate(-50%, -50%)",
                    fontSize: "12px",
                    textShadow: `0 0 ${10 * ripple.opacity}px var(--accent)`,
                  }}
                >
                  {chars[charIndex]}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// FLOATING ASCII ELEMENTS
// ============================================
interface FloatingChar {
  id: number;
  x: number;
  y: number;
  char: string;
  speed: number;
  amplitude: number;
  phase: number;
  size: number;
  opacity: number;
}

export const AsciiFloatingElements = ({ count = 30 }: { count?: number }) => {
  const [elements, setElements] = useState<FloatingChar[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const chars = "░▒▓╳╬◈◆○●+*·:";

  useEffect(() => {
    // Initialize floating elements
    const initial: FloatingChar[] = [];
    for (let i = 0; i < count; i++) {
      initial.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: chars[Math.floor(Math.random() * chars.length)],
        speed: 0.1 + Math.random() * 0.3,
        amplitude: 10 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2,
        size: 10 + Math.random() * 14,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    setElements(initial);
  }, [count, chars]);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.01;
      setElements((prev) =>
        prev.map((el) => ({
          ...el,
          x: el.x + Math.sin(timeRef.current + el.phase) * 0.02,
          y: (el.y + el.speed * 0.1) % 100,
        }))
      );
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <span
          key={el.id}
          className="absolute font-mono text-[var(--accent)]"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            transform: `translateY(${Math.sin(timeRef.current * 2 + el.phase) * el.amplitude}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {el.char}
        </span>
      ))}
    </div>
  );
};

// ============================================
// INTERACTIVE GRID (Hover cells light up)
// ============================================
export const AsciiInteractiveGrid = ({
  className = "",
  cols = 40,
  rows = 20,
}: {
  className?: string;
  cols?: number;
  rows?: number;
}) => {
  const [activeCells, setActiveCells] = useState<Map<string, number>>(new Map());
  const chars = " ·:░▒▓█";

  useEffect(() => {
    // Fade out active cells
    const interval = setInterval(() => {
      setActiveCells((prev) => {
        const next = new Map(prev);
        next.forEach((value, key) => {
          if (value <= 0) {
            next.delete(key);
          } else {
            next.set(key, value - 0.05);
          }
        });
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleCellHover = (x: number, y: number) => {
    const key = `${x}-${y}`;
    setActiveCells((prev) => new Map(prev).set(key, 1));

    // Activate neighbors
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        if (dx === 0 && dy === 0) continue;
        const nKey = `${x + dx}-${y + dy}`;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const intensity = 1 - dist / 3;
        if (intensity > 0) {
          setActiveCells((prev) => {
            const next = new Map(prev);
            const current = next.get(nKey) || 0;
            next.set(nKey, Math.max(current, intensity));
            return next;
          });
        }
      }
    }
  };

  return (
    <div className={`font-mono select-none ${className}`}>
      {Array.from({ length: rows }).map((_, y) => (
        <div key={y} className="flex">
          {Array.from({ length: cols }).map((_, x) => {
            const key = `${x}-${y}`;
            const intensity = activeCells.get(key) || 0;
            const charIndex = Math.floor(intensity * (chars.length - 1));
            const char = chars[charIndex];

            return (
              <span
                key={key}
                className="transition-all duration-100"
                style={{
                  color: intensity > 0 ? "#00efa6" : "#ffffff10",
                  textShadow: intensity > 0.5 ? `0 0 ${intensity * 10}px #00efa6` : "none",
                  fontSize: "10px",
                  lineHeight: "10px",
                  width: "10px",
                  display: "inline-block",
                  textAlign: "center",
                }}
                onMouseEnter={() => handleCellHover(x, y)}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ============================================
// MAGNETIC ASCII TEXT (Letters repel from cursor)
// ============================================
export const AsciiMagneticText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterOffsets, setLetterOffsets] = useState<{ x: number; y: number }[]>(
    text.split("").map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const letters = container.querySelectorAll(".magnetic-letter");
      const newOffsets: { x: number; y: number }[] = [];

      letters.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left - rect.left + letterRect.width / 2;
        const letterCenterY = letterRect.top - rect.top + letterRect.height / 2;

        const dx = letterCenterX - mouseX;
        const dy = letterCenterY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const offsetX = (dx / dist) * force * 20;
          const offsetY = (dy / dist) * force * 20;
          newOffsets.push({ x: offsetX, y: offsetY });
        } else {
          newOffsets.push({ x: 0, y: 0 });
        }
      });

      setLetterOffsets(newOffsets);
    };

    const handleMouseLeave = () => {
      setLetterOffsets(text.split("").map(() => ({ x: 0, y: 0 })));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="magnetic-letter inline-block transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${letterOffsets[i]?.x || 0}px, ${letterOffsets[i]?.y || 0}px)`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};
