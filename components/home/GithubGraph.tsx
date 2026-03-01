import { fetchContributions } from "@/lib/github";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContributionGrid } from "./ContributionGrid";

export async function GithubGraph() {
  const data = await fetchContributions("virajbhartiya");

  if (data.weeks.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-2">
        Contributions
      </h2>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <SectionLabel label="GitHub" />
          <a
            href="https://github.com/virajbhartiya"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent uppercase tracking-wider hover:text-fg transition-colors"
          >
            @virajbhartiya
          </a>
        </div>

        <ContributionGrid weeks={data.weeks} total={data.total} />
      </div>
    </section>
  );
}
