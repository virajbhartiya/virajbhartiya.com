import { winsData } from "@/data/winsData";

export function Wins() {
  return (
    <section id="wins" className="mt-10">
      <h2 className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-tight mb-6">
        Wins
        <span className="text-accent ml-3 text-[0.5em] align-top">
          ({winsData.length})
        </span>
      </h2>

      <div>
        {winsData.map((win) => (
          <div
            key={win.title}
            className="group border-t border-border/50 last:border-b py-3 sm:py-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-pixel text-[clamp(0.85rem,2.5vw,1.5rem)] text-fg leading-none shrink-0">
                  {win.title}
                </span>
                {win.project && (
                  <span className="font-mono text-xs text-muted truncate hidden sm:inline">
                    {win.project}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-accent shrink-0 uppercase tracking-widest">
                {win.award}
              </span>
            </div>
            {win.project && (
              <span className="font-mono text-xs text-muted sm:hidden block mt-1">
                {win.project}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
