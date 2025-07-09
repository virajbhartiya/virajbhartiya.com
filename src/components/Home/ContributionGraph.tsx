import { Arrow } from "../svg/arrow";
import { useMemo } from "react";

interface ContributionData {
  date: string;
  count: number;
}

export const ContributionGraph = () => {
  // Always use visually varied mock data
  const contributions = useMemo(() => {
    const arr: ContributionData[] = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      // Create a visually appealing wave pattern
      const count = Math.floor(
        6 * Math.abs(Math.sin(i / 20)) + Math.floor(Math.random() * 2)
      );
      arr.unshift({
        date: date.toISOString().split("T")[0],
        count,
      });
    }
    return arr;
  }, []);

  const getAccentIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 2) return "bg-[#00efa6]/20";
    if (count <= 4) return "bg-[#00efa6]/40";
    if (count <= 6) return "bg-[#00efa6]/60";
    return "bg-[#00efa6]";
  };

  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="py-8">
      <div
        className="flex-row w-max flex pb-8 ml-auto"
        style={{ transform: "rotate(4deg)" }}
      >
        <div
          style={{ transform: "rotateX(0deg) rotateY(180deg) rotateZ(10Deg)" }}
        >
          <Arrow />
        </div>
        <p className="accent proto">THE GITHUB FLEX</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Contribution Activity
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00efa6]/20"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00efa6]/40"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00efa6]/60"></div>
                <div className="w-3 h-3 rounded-sm bg-[#00efa6]"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 hover:shadow-lg ${getAccentIntensity(day.count)}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last 365 days of GitHub activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
