import { winsData } from "@/data/winsData";

export function Wins() {
  return (
    <section id="wins" className="mt-14">
      <h2 className="text-xs text-accent uppercase tracking-widest mb-5">
        wins
      </h2>

      {/* ASCII table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-border text-muted/40 uppercase tracking-wider">
              <th className="text-left py-2 pr-4 font-normal">event</th>
              <th className="text-left py-2 pr-4 font-normal hidden sm:table-cell">project</th>
              <th className="text-left py-2 pr-4 font-normal">award</th>
              <th className="text-right py-2 font-normal">year</th>
            </tr>
          </thead>
          <tbody>
            {winsData.map((win, i) => (
              <tr
                key={i}
                className="border-b border-border/50 group"
              >
                <td className="py-2.5 pr-4 text-sm text-fg">{win.title}</td>
                <td className="py-2.5 pr-4 text-muted hidden sm:table-cell">{win.project}</td>
                <td className="py-2.5 pr-4">
                  <span className={`${
                    win.award.toLowerCase().includes("winner")
                      ? "text-accent"
                      : win.award.toLowerCase().includes("finalist") || win.award.toLowerCase().includes("showcase")
                        ? "text-accent-blue"
                        : "text-muted"
                  }`}>
                    {win.award}
                  </span>
                </td>
                <td className="py-2.5 text-right text-accent-blue">{win.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
