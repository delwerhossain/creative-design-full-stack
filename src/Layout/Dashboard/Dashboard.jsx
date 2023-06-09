import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const Dashboard = () => {
  // TODO: load data from the server to have dynamic isAdmin based on Data
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const adminMenu = (
    <>
      <li>
        <NavLink to="/dashboard/home">
          <FaHome></FaHome> Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addItem">
          {" "}
          <FaUtensils></FaUtensils> Add an Item
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageitems">
          <FaWallet></FaWallet> Manage Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/history">
          <FaBook></FaBook> Manage Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allusers">
          <FaUsers></FaUsers> All Users
        </NavLink>
      </li>
    </>
  );
  const instructorMenu = (
    <>
      <li>
        <NavLink to="/dashboard/home">
          <FaHome></FaHome> Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addItem">
          {" "}
          <FaUtensils></FaUtensils> Add an Item
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageitems">
          <FaWallet></FaWallet> Manage Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/history">
          <FaBook></FaBook> Manage Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allusers">
          <FaUsers></FaUsers> All Users
        </NavLink>
      </li>
    </>
  );
  const studentMenu = (
    <>
      <>
        <li>
          <NavLink to="/dashboard/home">
            <FaHome></FaHome> User Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reservations">
            <FaCalendarAlt></FaCalendarAlt> Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/history">
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

  console.log({isAdmin, isInstructor});
  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side text-white font-semibold bg-[#014bcc]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {mainMenu}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/menu"> All Classes</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
