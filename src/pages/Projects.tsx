import { Project } from "@/components/Home/Project";
import { projectData } from "@/data/projectData";

export const Projects = () => {
  return (
    <>
      <h3 className="text-center text-2xl font-thin accent proto">Projects</h3>
      {projectData.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </>
  );
};
