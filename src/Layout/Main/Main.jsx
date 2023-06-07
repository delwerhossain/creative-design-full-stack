import { Outlet } from "react-router-dom";
import Navbar from "../../pages/common/Navbar/Navbar";
import Footer from "../../pages/common/Footer/Footer";

const Main = () => {
  return (
    <div className="bg-white">
      <Navbar />
      {/* outlet part  */}
      <div className="">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
