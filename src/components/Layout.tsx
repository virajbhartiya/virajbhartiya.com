import { Footer } from "@/components/shared/Footer";
import Header from "./shared/Header";
import { Fragment } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <div className="xl:container py-8 px-4 xl:px-12 ">
        <Header />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
