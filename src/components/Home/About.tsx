import { DownloadCVMarquee } from "../Marquees/downloadCVMarquee";
import { Tag } from "../custom/Spline/Tag";

export const About = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center">
      <Tag />
      <div>
        <div className="flex items-end pb-4">
          <h2 className="text-4xl font-thin accent proto">Viraj Bhartiya</h2>
          <p className="text-sm md:text-base font-thin px-3 whitespace-nowrap proto">
            Life Full of Pixels
          </p>
        </div>
        <p className="font-thin text-justify">
          I enjoy creating things that{" "}
          <span className="accent italic font-normal">
            {" "}
            live on the internet
          </span>
          . Started in 2019 as a past time, now is my passion just like
          trekking, cycling and running.
          <br />
          <br /> My abundant energy fuels me in the pursuit of many interests,
          hobbies, areas of study and artistic endeavors. I'm a fast learner,
          able to pick up new skills and juggle different projects and roles
          with relative ease.
        </p>
        <a href="/Viraj_Bhartiya.pdf" target="_blank">
          <div className=" w-24 border border-[var(--accent)] rounded-full mt-4 hover:bg-white">
            <DownloadCVMarquee />
          </div>
        </a>
      </div>
    </section>
  );
};
