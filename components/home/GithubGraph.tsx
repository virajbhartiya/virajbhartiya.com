import { fetchContributions } from "@/lib/github";
import { ContributionGrid } from "./ContributionGrid";

export async function GithubGraph() {
  const data = await fetchContributions("virajbhartiya");

  if (data.weeks.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h2 className="text-xs text-accent uppercase tracking-widest">
          contributions
        </h2>
        <a
          href="https://github.com/virajbhartiya"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-fg transition-colors"
        >
          @virajbhartiya
        </a>
      </div>

      <ContributionGrid weeks={data.weeks} total={data.total} />
    </section>
  );
}
