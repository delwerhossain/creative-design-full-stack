import { Outlet } from "react-router-dom";
import Navbar from "../../pages/common/Navbar/Navbar";
import Footer from "../../pages/common/Footer/Footer";

const Main = () => {
  return (
    <div className="">
      <Navbar />
      {/* outlet part  */}
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
