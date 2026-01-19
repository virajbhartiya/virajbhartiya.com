import { LazySplineScene } from "./LazySplineScene";

export const Hello = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <LazySplineScene
        scene="https://prod.spline.design/5FXqsFsRkQCB37UF/scene.splinecode"
        className="min-h-[320px]"
      />
    </div>
  );
};
