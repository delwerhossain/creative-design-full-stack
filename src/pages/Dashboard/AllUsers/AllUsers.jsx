import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import useAllUser from "../../../hooks/useAllUser";

const AllUsers = () => {
  const [users, refetch] = useAllUser();
  const [axiosSecure] = useAxiosSecure();


  const handlePromoteUser = (role, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, perform the action
        axiosSecure
          .put(`/user-update?email=${email}`, {
            role: role,
          })
          .then((data) => {
            if (data?.data?.modifiedCount > 0) {
              Swal.fire({
                title: "upgrade user Successfully!",
                icon: "success",
                timer: 500, // Optional: Auto-close the modal after 2 seconds
                showConfirmButton: false,
              });
              refetch();
            }
          });
      }
    });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  return loading ? (
    <div className="grid justify-center items-center">
      <Loading></Loading>
    </div>
  ) : (
    <div className="w-full">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl font-semibold">Total Users: {users?.length}</h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item?.img} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>
                  {item?.role === "admin" ? (
                    <label
                      tabIndex={0}
                      className="btn btn-secondary btn-outline m-1"
                    >
                      <span className="mr-1">Admin</span>
                    </label>
                  ) : (
                    <>
                      {" "}
                      <div className="">
                        <button
                          onClick={() =>
                            handlePromoteUser("student", item?.email)
                          }
                          className="btn btn-primary btn-sm mr-2"
                          disabled={item?.role === "student"}
                        >
                          student
                        </button>
                        <button
                          className="btn btn-warning mr-2 btn-sm"
                          onClick={() =>
                            handlePromoteUser("instructor", item?.email)
                          }
                          disabled={item?.role === "instructor"}
                        >
                          Instructor
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handlePromoteUser("admin", item?.email)}
                          disabled={item?.role === "admin"}
                        >
                          admin
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
