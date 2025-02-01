import UseLenis from "@/Hook/useLenis";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import { MeetRedirect } from "@/pages/MeetRedirect";
import { CVRedirect } from "@/pages/CVRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/meet" element={<MeetRedirect />} />
      <Route path="/cv" element={<CVRedirect />} />
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
