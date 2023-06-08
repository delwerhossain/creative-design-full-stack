import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/AuthenticationPage/Login";
import Register from "../pages/AuthenticationPage/Register";
import PrivateRoute from "./PrivateRoute";
import AllClass from "../pages/AllClass/AllClass";
import SelectClass from "../pages/Dashboard/SelectClass/SelectClass";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Payment from "../pages/Dashboard/Payment/Payment ";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageClass from "../pages/Dashboard/ManageClass/ManageClass";
import InstructorClass from "../pages/Dashboard/InstructorClass/InstructorClass";
import CreateClass from "../pages/Dashboard/CreateClass/CreateClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/", // Update the root path to an empty string
        element: <Home />,
      },
      {
        path: "all-classes",
        element: <AllClass />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/",
        element: <SelectClass />,
      },
      {
        path: "select-classes",
        element: <SelectClass />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <Payment />,
      },
      // instructor
      {
        path: "instructor-class",
        element: <InstructorClass />,
      },
      {
        path: "create-class",
        element: <CreateClass />,
      },
      // admin routes
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-class",
        element: (
          <AdminRoute>
            <ManageClass />
          </AdminRoute>
        ),
      },
    ],
  },
]);
