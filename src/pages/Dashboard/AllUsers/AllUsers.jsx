import { RiArrowDropDownLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";

const AllUsers = () => {
  const [cart, setCart] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const AllUsers = () => {
    axiosSecure.get("/users").then((user) => setCart(user.data));
  };
  useEffect(() => {
    AllUsers();
  }, []);
  // how does reduce work!!!
  const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Items: {cart.length}</h3>
        <h3 className="text-3xl">Total Price: ${total}</h3>
        <Link to="/dashboard/payment">
          <button className="btn btn-warning btn-sm">PAY</button>
        </Link>
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
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.img} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.email}</td>
                <td>
                  {item.role === "admin" ? (
                    <label
                      tabIndex={0}
                      className="btn btn-secondary btn-outline  m-1"
                    >
                      <span className="mr-1">Admin</span>{" "}
                    </label>
                  ) : (
                    <>
                      <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn  btn-outline  m-1">
                          <span className="mr-1">{item.role}</span>{" "}
                          <IconContext.Provider
                            value={{
                              size: "2em",
                            }}
                          >
                            <RiArrowDropDownLine />{" "}
                          </IconContext.Provider>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>{item.role}</a>
                          </li>
                          <li>
                            <a>{item.role}</a>
                          </li>
                        </ul>
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
