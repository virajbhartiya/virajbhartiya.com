import { Project } from "@/components/Home/Project";
import Scrambler from "@/components/custom/Scrambler";
import { Badge } from "@/components/ui/badge";
import { projectData } from "@/data/projectData";

export const Projects = () => {
  return (
    <>
      <h3 className=" mt-24 md:mt-auto text-center text-2xl font-thin accent proto">
        Things I've Built
      </h3>
      {projectData.map((project, index) => (
        <Project key={index} project={project} index={index} />
      ))}
      <div className="border my-4 p-4 rounded steam relative">
        <div className="w-full justify-between flex flex-col md:flex-row gap-4">
          <div className={`flex flex-row items-center gap-4`}>
            <div className={"accent"}>[ {projectData.length} ]</div>

            <p className="text-2xl">
              <Scrambler text={"Easter eggthings"} />
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={"outline"} className={`font-normal accent proto`}>
              Coming Soon
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};
