import { useEffect } from "react";

export const CVRedirect = () => {
  useEffect(() => {
    window.history.replaceState({}, "", "/cv");
  }, []);

  return (
    <iframe
      src="/Viraj_Bhartiya.pdf"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
      title="Viraj Bhartiya CV"
    />
  );
};
