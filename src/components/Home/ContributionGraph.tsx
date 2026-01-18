import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { AsciiDivider, AsciiSpinner } from "@/components/ascii";

const GitHubCalendar = lazy(() => import("react-github-calendar"));

const accent = "#00efa6";

const theme = {
  light: ["#0a0a0a", accent + "33", accent + "66", accent + "99", accent],
  dark: ["#0a0a0a", accent + "33", accent + "66", accent + "99", accent],
};

export const ContributionGraph = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const placeholder = (
    <div className="flex h-48 items-center justify-center font-mono text-xs text-white/40">
      <AsciiSpinner size="md" />
      <span className="ml-3">Loading...</span>
    </div>
  );

  return (
    <section
      className="mt-24 md:mt-32 px-4"
      aria-label="GitHub Contribution Activity"
    >
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-4 font-mono">
          <span className="text-[var(--accent)] text-xs">{">>>"}</span>
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
            GITHUB ACTIVITY
          </h2>
          <span className="hidden md:inline text-white/20 text-xs flex-1 overflow-hidden whitespace-nowrap">
            {"─".repeat(40)}
          </span>
        </div>
        <p className="font-mono text-xs text-white/50 max-w-2xl leading-relaxed">
          Contribution activity visualization
        </p>
      </div>

      <AsciiDivider variant="dashed" className="mb-8" />

      {/* Calendar Container */}
      <div className="relative max-w-5xl mx-auto">
        <div className="relative border border-white/10 bg-black/40 backdrop-blur-sm p-6 md:p-8">
          {/* Corner decorations */}
          <span className="absolute -top-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px]">+</span>
          <span className="absolute -top-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px]">+</span>
          <span className="absolute -bottom-[1px] -left-[1px] font-mono text-[var(--accent)] text-[8px]">+</span>
          <span className="absolute -bottom-[1px] -right-[1px] font-mono text-[var(--accent)] text-[8px]">+</span>

          {/* Calendar */}
          <div className="w-full overflow-x-auto">
            <div ref={containerRef} className="min-w-[700px]">
              {isVisible ? (
                <Suspense fallback={placeholder}>
                  <GitHubCalendar
                    username="virajbhartiya"
                    blockSize={12}
                    blockRadius={2}
                    fontSize={11}
                    theme={theme}
                    hideTotalCount={true}
                    hideColorLegend={false}
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </Suspense>
              ) : (
                placeholder
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
