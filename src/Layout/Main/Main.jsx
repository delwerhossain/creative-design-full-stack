import { Outlet } from "react-router-dom";
import Navbar from "../../pages/common/Navbar/Navbar";
import Footer from "../../pages/common/Footer/Footer";
import { useState } from "react";

const Main = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  return (
    <div className="">
      <Navbar />
      {/* outlet part  */}
      <div
        className={`h-screen  dark:bg-slate-700 bg-slate-100 ${
          !(theme == "light") && "dark"
        }`}
      >
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
