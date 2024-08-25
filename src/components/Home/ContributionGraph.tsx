import { Arrow } from "../svg/arrow";

export const ContributionGraph = () => {
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

        <p className="accent proto">The GitHub Flex</p>
      </div>
      <img
        src="https://ghchart.rshah.org/virajbhartiya"
        alt="Viraj's Blue Github Chart"
        className="mx-auto my-4 w-full"
      />
    </div>
  );
};
