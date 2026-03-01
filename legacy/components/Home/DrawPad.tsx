import { useState } from "react";
import { LightBoard, PatternCell } from "../custom/LightBoard";
import { Arrow } from "../svg/arrow";
export const DrawPad = () => {
  const [controlledDrawState, setControlledDrawState] =
    useState<PatternCell>("2");
  const [controlledHoverState, setControlledHoverState] = useState(false);
  return (
    <div className="py-8">
      <div
        className="flex-row w-max flex pb-8 mx-auto"
        style={{ transform: "rotate(4deg)" }}
      >
        <p className="accent proto">You Can Draw on this</p>
        <div style={{ transform: "rotate(1deg)" }}>
          <Arrow />
        </div>
      </div>
      <LightBoard
        rows={25}
        lightSize={6}
        gap={2}
        text="H E L L O"
        font="default"
        disableDrawing={false}
        updateInterval={220}
        colors={{
          background: "#00efa6",
          textDim: "#1f1f1f",
          drawLine: "#fff",
          textBright: "#00efa6",
        }}
        controlledDrawState={controlledDrawState}
        onDrawStateChange={setControlledDrawState}
        controlledHoverState={controlledHoverState}
        onHoverStateChange={setControlledHoverState}
      />
    </div>
  );
};
