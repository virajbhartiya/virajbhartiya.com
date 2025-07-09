import { Arrow } from "../svg/arrow";
import GitHubCalendar from "react-github-calendar";

const accent = "#00efa6";

const theme = {
  light: ["#23272f", accent + "33", accent + "66", accent + "99", accent],
  dark: ["#18181b", accent + "33", accent + "66", accent + "99", accent],
};

export const ContributionGraph = () => {
  return (
    <section className="relative w-full py-16" aria-label="GitHub Contribution Activity">
      <div className="absolute -right-4 -top-4 h-32 w-32 rotate-12 bg-[var(--accent)]/10 blur-3xl" />
      <div className="absolute -left-4 bottom-4 h-32 w-32 -rotate-12 bg-[var(--accent)]/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)]/5 blur-3xl" />
      <div className="relative w-full px-0">
        <div className="w-full">
          <div className="w-full flex justify-end pb-8" style={{ transform: "rotate(4deg)" }}>
            <div style={{ transform: "rotateX(0deg) rotateY(180deg) rotateZ(10Deg)" }}>
              <Arrow />
            </div>
            <p className="accent proto ml-2">THE GITHUB FLEX</p>
          </div>
          <div className="rounded-2xl border border-[var(--accent)]/20 bg-background/50 backdrop-blur-sm shadow-lg w-full" style={{padding: 0}}>
            <GitHubCalendar
              username="virajbhartiya"
              blockSize={14}
              blockRadius={3}
              fontSize={14}
              theme={theme}
              hideTotalCount={true}
              hideColorLegend={false}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
