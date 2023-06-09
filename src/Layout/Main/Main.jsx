import { Outlet } from "react-router-dom";
import Navbar from "../../pages/common/Navbar/Navbar";
import Footer from "../../pages/common/Footer/Footer";
import { useEffect, useState } from "react";

const Main = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  
  const local = localStorage.getItem("theme");
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, [local]);

  return (
    <div className="">
      <Navbar />
      {/* outlet part  */}
      <div
        className={`dark:bg-slate-700 bg-slate-100 ${
          (theme == "dark") && "dark"
        }`}
      >
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
