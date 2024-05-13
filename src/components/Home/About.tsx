import { DownloadCVMarquee } from "../Marquees/downloadCVMarquee";
import { Tag } from "../custom/Spline/Tag";
import { Arrow } from "../svg/arrow";

export const About = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-screen justify-center items-center">
      <div className="fixed top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
        <img src="/images/star.png" className="rotate-animation" alt="star" />
      </div>

      <div className="hidden md:block relative  m-0 p-0 w-auto h-auto">
        <div
          className=" flex-row w-max hidden md:flex"
          style={{ transform: "rotate(10deg)" }}
        >
          <p className="text-black proto bg-[var(--accent)]">That's me!</p>
          <Arrow />
        </div>
        <div className="m-0 p-0 w-[40vw] h-[70vh]">
          <Tag />
        </div>
      </div>
      <div className="h-full md:hidden">
        <Tag />
      </div>
      <div>
        <div className="flex items-end pb-4">
          <h2 className="text-4xl font-thin accent proto">Viraj Bhartiya</h2>
          {/* <p className="text-sm md:text-base font-thin px-3 whitespace-nowrap proto">
            Life Full of Pixels
          </p> */}
        </div>
        <p className="font-thin text-justify">
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
          that make people go "Wow, that's cool". I am a self-taught developer
          who loves to learn new things and experiment with them. I can help you
          build websites or apps or basically anything that can run on a piece
          of <span className="proto text-sm accent">silicon*</span>
          <br />
          <span className=" text-xs proto accent">
            *(or whatever, who knows what the future holds?).
          </span>{" "}
        </p>
        <div className="flex">
          <a href="/Viraj_Bhartiya.pdf" target="_blank">
            <div className=" w-24 border border-[var(--accent)] rounded-full mt-4 hover:bg-white">
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
