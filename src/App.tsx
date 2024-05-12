import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/router/routes";
import AnimatedCursor from "react-animated-cursor";

function App() {
  return (
    <Router>
      <AnimatedCursor
        innerSize={10}
        innerStyle={{
          background: "rgb(0, 239, 166)",
          borderRadius: "50%",
        }}
        outerSize={20}
        outerStyle={{
          background: "transparent",
          border: "2px solid rgb(0, 239, 166)",
          borderRadius: "50%",
        }}
        color="0, 239, 166"
        outerAlpha={0.4}
        innerScale={1}
        outerScale={5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;
