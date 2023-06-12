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
import EnrolledClass from "../pages/Dashboard/EnrolledClass/EnrolledClass";
import InstructorRoute from "./InstructorRoute";
import ClassEdit from "../pages/Dashboard/ClassEdit/ClassEdit";
import AllInstructor from "../pages/AllInstructor/AllInstructor";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-classes",
        element: <AllClass />,
      },
      {
        path: "all-instructor",
        element: <AllInstructor />,
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
        path: "select-classes",
        element: <SelectClass />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClass />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      // instructor
      {
        path: "instructor-class",
        element: (
          <InstructorRoute>
            {" "}
            <InstructorClass />
          </InstructorRoute>
        ),
      },
      {
        path: "class-edit/:paramID",
        element: (
          <InstructorRoute>
            <ClassEdit />
          </InstructorRoute>
        ),
      },
      {
        path: "create-class",
        element: (
          <InstructorRoute>
            <CreateClass />
          </InstructorRoute>
        ),
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
