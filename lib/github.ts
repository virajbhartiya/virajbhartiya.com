export type ContributionDay = {
  date: string;
  level: number; // 0-4
  count?: number;
};

export type ContributionWeek = ContributionDay[];

export type ContributionData = {
  weeks: ContributionWeek[];
  total: number;
};

export async function fetchContributions(
  username: string,
): Promise<ContributionData> {
  try {
    const res = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: { Accept: "text/html" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return { weeks: [], total: 0 };

    const html = await res.text();

    // Extract total contributions
    const totalMatch = html.match(
      /(\d[\d,]*)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );
    const total = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""))
      : 0;

    // Parse contribution cells — match full td elements with content
    const cells: ContributionDay[] = [];
    const fullTdRegex = /<td([^>]*)>([\s\S]*?)<\/td>/g;
    let tdMatch;
    while ((tdMatch = fullTdRegex.exec(html)) !== null) {
      const attrs = tdMatch[1];
      const content = tdMatch[2];
      const dateMatch = attrs.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
      const levelMatch = attrs.match(/data-level="(\d)"/);
      if (dateMatch && levelMatch) {
        // Try to extract count from inner text or tool-tip
        const countMatch = content.match(/(\d+)\s+contributions?/);
        const noContribs = /No\s+contributions/i.test(content);
        cells.push({
          date: dateMatch[1],
          level: parseInt(levelMatch[1]),
          count: countMatch
            ? parseInt(countMatch[1])
            : noContribs
              ? 0
              : undefined,
        });
      }
    }

    // Fallback: self-closing td elements
    if (cells.length === 0) {
      const tdRegex = /<td[^>]+>/g;
      let match;
      while ((match = tdRegex.exec(html)) !== null) {
        const td = match[0];
        const dateMatch = td.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
        const levelMatch = td.match(/data-level="(\d)"/);
        if (dateMatch && levelMatch) {
          cells.push({
            date: dateMatch[1],
            level: parseInt(levelMatch[1]),
          });
        }
      }
    }

    // Fallback: rect elements (SVG-based calendar)
    if (cells.length === 0) {
      const rectRegex = /<rect[^>]+>/g;
      let rectMatch;
      while ((rectMatch = rectRegex.exec(html)) !== null) {
        const rect = rectMatch[0];
        const dateMatch = rect.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
        const levelMatch = rect.match(/data-level="(\d)"/);
        if (dateMatch && levelMatch) {
          cells.push({
            date: dateMatch[1],
            level: parseInt(levelMatch[1]),
          });
        }
      }
    }

    if (cells.length === 0) return { weeks: [], total };

    // Sort by date
    cells.sort((a, b) => a.date.localeCompare(b.date));

    // Group into weeks (Sunday = start of new week)
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const day of cells) {
      const dayOfWeek = new Date(day.date + "T00:00:00").getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return { weeks, total };
  } catch {
    return { weeks: [], total: 0 };
  }
}
