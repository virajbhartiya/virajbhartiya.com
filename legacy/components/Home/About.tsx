import { DownloadCVMarquee } from "../Marquees/DownloadCVMarquee";
import { Tag } from "../custom/Spline/Tag";

export const About = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center"
      aria-label="About Viraj Bhartiya"
    >
      <div className="hidden md:block relative  m-0 p-0 h-auto pt-20">
        <div
          data-aos="fade-up"
          data-aos-duration="1400"
          className="m-0 p-0 h-[70vh] align-middle w-full flex justify-center items-center"
        >
          <Tag />
        </div>
      </div>
      <div className="h-full md:hidden">
        <Tag />
      </div>
      <div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex items-end pb-4"
        >
          <h1 className="text-4xl font-thin accent proto">Viraj Bhartiya</h1>
        </div>
        <p
          data-aos="fade-up"
          data-aos-duration="1200"
          className="font-thin text-justify"
        >
          I build things that{" "}
          <span className="accent font-normal text-sm proto">
            live on the internet.
          </span>{" "}
          What started as a pastime during summer vacations has become my
          career.
          <br />
          <br /> I&apos;m a self-taught developer focused on{" "}
          <span className="proto accent text-sm">
            full-stack applications, blockchain infrastructure,
          </span>{" "}
          and developer tooling. Whether it&apos;s a web app, a native
          experience, or a distributed system, I enjoy turning ideas into
          reliable software.
        </p>
        <div className="flex flex-col md:flex-row">
          <a href="/Viraj_Bhartiya.pdf" target="_blank">
            <div className=" w-full md:w-24 border border-[var(--accent)] rounded-full mt-4 hover:bg-white">
              <DownloadCVMarquee />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
