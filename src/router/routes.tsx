import UseLenis from "@/Hook/useLenis";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import { MeetRedirect } from "@/pages/MeetRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <UseLenis />
            <Home />
          </>
        }
      />
      <Route path="/meet" element={<MeetRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
