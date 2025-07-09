import UseLenis from "@/Hook/useLenis";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import { MeetRedirect } from "@/pages/MeetRedirect";
import { CVRedirect } from "@/pages/CVRedirect";
import { SocialRedirect } from "@/pages/SocialRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/meet" element={<MeetRedirect />} />
      <Route path="/cv" element={<CVRedirect />} />
      <Route
        path="/github"
        element={<SocialRedirect url="https://github.com/virajbhartiya" />}
      />
      <Route
        path="/linkedin"
        element={
          <SocialRedirect url="https://www.linkedin.com/in/viraj-bhartiya/" />
        }
      />
      <Route
        path="/twitter"
        element={<SocialRedirect url="https://twitter.com/heyxviraj" />}
      />
      <Route
        path="/youtube"
        element={
          <SocialRedirect url="https://www.youtube.com/channel/UCvwfCZDYeUKWdmHUAGhgsnQ" />
        }
      />
      <Route
        path="*"
        element={
          <>
            <UseLenis />
            <Home />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
