import { LazySplineScene } from "./LazySplineScene";

export const Tag = () => {
  return (
    <div className="w-full h-full md:w-[50vw] md:h-full flex justify-center items-center m-0 p-4">
      <LazySplineScene
        scene="https://prod.spline.design/QTcY0LeJK6LnYjqo/scene.splinecode"
        className="h-full w-full"
      />
    </div>
  );
};
