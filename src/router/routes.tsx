import UseLenis from "@/Hook/useLenis";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

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
    </Routes>
  );
};

export default AppRoutes;
