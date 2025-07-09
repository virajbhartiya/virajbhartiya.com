import { DownloadCVMarquee } from "../Marquees/downloadCVMarquee";
import { Tag } from "../custom/Spline/Tag";
import { Arrow } from "../svg/arrow";

export const About = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center"
      aria-label="About Viraj Bhartiya"
    >
      <div className="hidden md:block relative  m-0 p-0 h-auto pt-20">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="flex-row hidden md:flex"
          style={{ transform: "rotate(10deg)" }}
        >
          <p className="text-black proto bg-[var(--accent)]">That&apos;s me!</p>
          <Arrow />
        </div>
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
          I enjoy creating things that{" "}
          <span className="accent font-normal text-sm proto">
            {" "}
            live on the internet.{" "}
          </span>
          What Started as a past time in my summer vacations has now turned into
          my life.
          <br />
          <br /> I like to build{" "}
          <span className="proto accent text-sm">
            weird, wacky, wonderful things
          </span>{" "}
          that make people go &quot;Wow, that&apos;s cool&quot;. I am a
          self-taught developer who loves to learn new things and experiment
          with them. I can help you build websites or apps or basically anything
          that can run on a piece of{" "}
          <span className="proto text-sm accent">silicon*</span>
          <br />
          <span className=" text-xs proto accent">
            *(or whatever, who knows what the future holds?).
          </span>{" "}
        </p>
        <div className="flex flex-col md:flex-row">
          <a href="/Viraj_Bhartiya.pdf" target="_blank">
            <div className=" w-full md:w-24 border border-[var(--accent)] rounded-full mt-4 hover:bg-white">
              <DownloadCVMarquee />
            </div>
          </a>

          <div
            className="relative ml-6 flex-row mt-12 w-max flex"
            style={{ transform: "rotate(4deg)" }}
          >
            <div style={{ transform: "rotate(180deg)" }}>
              <Arrow />
            </div>
            <p className="accent proto">Yes, this is a button</p>
          </div>
        </div>
      </div>
    </section>
  );
};
