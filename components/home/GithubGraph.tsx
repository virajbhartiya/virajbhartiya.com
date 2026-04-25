import { AsciiCycle } from "@/components/ui/AsciiAnimate";
import { ContributionGrid } from "./ContributionGrid";
import { fetchContributions } from "@/lib/github";

export async function GithubGraph() {
  const data = await fetchContributions("virajbhartiya");
  if (!data || data.weeks.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="contributions-heading">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2
          id="contributions-heading"
          className="section-heading text-xs text-accent uppercase tracking-widest"
        >
          contributions
        </h2>
        <a
          href="https://github.com/virajbhartiya"
          target="_blank"
          rel="noopener noreferrer"
          className="link-glow text-xs text-muted hover:text-fg transition-colors"
        >
          @virajbhartiya
        </a>
      </div>

      <ContributionGrid weeks={data.weeks} total={data.total} />

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        <AsciiCycle
          chars={["·", "░", "▒", "▓", "█", "▓", "▒", "░"]}
          interval={200}
          className="text-accent"
        />
        <span aria-hidden="true">src: github · cache: 1h · scale: ·░▒▓█</span>
      </div>
    </section>
  );
}
