import { Project } from "@/components/Home/Project";
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
    </>
  );
};
