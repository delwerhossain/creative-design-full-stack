import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const Dashboard = () => {
  // TODO: load data from the server to have dynamic isAdmin based on Data
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    return logOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("jwt");
        navigate("/login");
      })
      .catch(() => {});
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
    },
  };

  const adminMenu = (
    <>
      <li>
        <NavLink to="/dashboard/manage-class">
          {" "}
          <FaUtensils></FaUtensils> Manage Class
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-users">
          <FaUsers></FaUsers> All Users
        </NavLink>
      </li>
    </>
  );
  const instructorMenu = (
    <>
      <li>
        <NavLink to="/dashboard/instructor-class">
          <FaShoppingCart></FaShoppingCart> My classes
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/create-class">
          {" "}
          <FaUtensils></FaUtensils> Add a Class
        </NavLink>
      </li>
    </>
  );
  const studentMenu = (
    <>
      <>
        <li>
          <NavLink to="/dashboard/select-classes">
            <FaShoppingCart></FaShoppingCart> Selected Classes
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/enrolled-classes">
            <FaCalendarAlt></FaCalendarAlt> Enrolled Classes
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/payment-history">
            <FaWallet></FaWallet> Payment History
          </NavLink>
        </li>
        {/* <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart> My Cart
                  <span className="badge inl badge-secondary">
                    +{cart?.length || 0}
                  </span>
                </NavLink>
              </li> */}
      </>
    </>
  );

  const mainMenu = () => {
    if (isAdmin) {
      return adminMenu;
    } else if (isInstructor) {
      return instructorMenu;
    } else {
      return studentMenu;
    }
  };

  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className=" mt-4 ml-4 btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <div className="bg-white ">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side text-white font-semibold bg-[#014bcc]">
        {/* ... */}
        <motion.ul
          className="menu p-4 w-80"
          initial="closed"
          animate="open"
          variants={menuVariants}
        >
          <div className="drawer-side  text-white font-semibold bg-[#014bcc]">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80">
              {/* heading */}
              <div className="my-4 px-4 mr-2 py-4 text-center border rounded-xl">
                {isAdmin && (
                  <h1 className="text-3xl font-bold text-stone-50">
                    {" "}
                    Admin Dashboard
                  </h1>
                )}
                {isInstructor && (
                  <h1 className="text-3xl font-bold text-stone-50">
                    {" "}
                    Instructor Dashboard
                  </h1>
                )}
                {isInstructor === isAdmin && (
                  <h1 className="text-3xl font-bold text-stone-50">
                    {" "}
                    Student Dashboard
                  </h1>
                )}
              </div>
              <div className="text-xl">{mainMenu()}</div>

              <div className="divider  border-b border-white"></div>

              <div className="text-xl">
                {" "}
                <li>
                  <NavLink to="/">
                    <FaHome></FaHome> Home
                  </NavLink>{" "}
                </li>
                <li>
                  <NavLink to="/all-classes"> All Classes</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}> Logout</button>
                </li>
              </div>
            </ul>
          </div>
        </motion.ul>
      </div>
    </div>
  );
};

export default Dashboard;
