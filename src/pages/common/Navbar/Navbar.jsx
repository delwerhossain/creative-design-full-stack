import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { BsLightbulb } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dark , setDark] = useState(false)

  const handleSignOut = () => {
    return logOut()
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("jwt");
      })
      .catch(() => {
      });
  };
  const menuList = (
    <>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Inbox
            <span className="badge badge-sm">99+</span>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Updates
            <span className="badge badge-sm badge-warning">NEW</span>
          </a>
        </li>
        <li>
          <a>
            Stats
            <span className="badge badge-xs badge-info"></span>
          </a>
        </li>
      </ul>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuList}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">{menuList}</div>
      <div className="navbar-end">
          {/* dark mode  */}
          <button
            onClick={() => setDark(!dark)}
            className="btn   btn-ghost btn-circle"
          >
            <IconContext.Provider value={{ size: "2em" }}>
             {dark? <MdDarkMode /> :
              <BsLightbulb />}
            </IconContext.Provider>
          </button>
          {user && (
            <>
              <div
                className="tooltip tooltip-bottom "
                data-tip={user?.displayName}
              >
                <img
                  loading="lazy"
                  className="w-12 mr-1 rounded-full"
                  src={user?.photoURL}
                  alt={user?.displayName}
                  title={user?.displayName}
                />
              </div>
              <div className="tooltip tooltip-bottom " data-tip="log Out">
                <div onClick={handleSignOut} className="btn   btn-primary p-2">
                  <FiLogOut title="logOut"></FiLogOut>
                </div>
              </div>
            </>
          )}

          <div className="tooltip tooltip-bottom " data-tip="log In">
            {!user && (
              <Link className="btn btn-primary btn-md btn-outline font-semibold p-2" to={"/login"}>
                <span className="mr-1 ">LogIn</span>
                <FiLogIn title="logOut"></FiLogIn>
              </Link>
            )}
          </div>
        </div>
    </div>
  );
};

export default Navbar;
