export interface Win {
  title: string;
  award: string;
  project: string;
  year: string;
  /** Optional month name (Jan/Feb/...) used to disambiguate multiple wins in the same year. */
  month?: string;
  featured?: boolean;
}

export const winsData: Win[] = [
  {
    title: "ETHGlobal",
    award: "Finalist",
    project: "Blip Markets",
    year: "2026",
    month: "Feb",
    featured: true,
  },
  {
    title: "Smart India Hackathon 2025",
    award: "Winner",
    project: "Rail Infrastructure Optimization",
    year: "2025",
    month: "Dec",
  },
  {
    title: "Filecoin Dev Summit Toronto 2025",
    award: "Demo Showcase",
    project: "HotVault",
    year: "2025",
    month: "Apr",
  },
  {
    title: "Prakalpa 2025",
    award: "Software Track Winner",
    project: "Parity Protocol",
    year: "2025",
    month: "Apr",
  },
  {
    title: "ETHIndia 2024",
    award: "Winner",
    project: "ThreeDrive",
    year: "2024",
    month: "Dec",
  },
  {
    title: "Unfold 2024",
    award: "Winner",
    project: "OpenFund",
    year: "2024",
    month: "Dec",
  },
];
