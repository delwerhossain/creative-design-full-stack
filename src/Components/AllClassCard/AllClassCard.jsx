import "./../ClassCard/classCard.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useRole from "../../hooks/useRole";
import { useState } from "react";

const AllClassCard = ({ product, userRole }) => {
  const { user } = useAuth();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [axiosSecure] = useAxiosSecure();
  const [userCheck] = useRole();
  const [added, setAdded] = useState([]);

  const {
    _id,
    name,
    pictureURL,
    instructorName,
    instructorEmail,
    subCategory,
    price,
    availableQuantity,
    enrolled,
  } = product;

  const handleAddToCart = (item, userRole) => {
    console.log(item);
    if (userRole) {
      const cartItem = {
        classId: _id,
        name,
        pictureURL,
        price,
        email: user.email,
      };
      axiosSecure
        .post("https://creative-design-server.vercel.app/carts", { cartItem })
        .then((data) => {
          if (data.data.insertedId) {
            refetch(); // refetch cart to update the number of items in the cart
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Class added on the cart.",
              showConfirmButton: false,
              timer: 500,
            });
          } else if (data.data === "already added") {
            Swal.fire({
              position: "top-center",
              icon: "warning",
              title: "Class already added",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const addedCartCheck = (id) => {
    axiosSecure
      .get(`/addedCartCheck/${id}?email=${user.email}`)
      .then((data) => {
        setAdded(data.data);
      });
  };

  addedCartCheck();

  ////////////////////////
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-2/4 p-4">
      <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div className="relative pb-56 lg:pb-96 overflow-hidden">
          <img
            className="absolute inset-0 w-full "
            src={pictureURL}
            alt={name}
          />
        </div>
        <div className="p-4">
          <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold  tracking-wide text-xs">
            Category - <span className="uppercase">{subCategory}</span>
          </span>
          <h2 className="my-2 text-2xl font-bold">{name}</h2>
          <div className="mt-3 flex items-center">
            <span className="text-sm font-semibold">Dollar</span>&nbsp;
            <span className="font-bold text-xl">{price}</span>&nbsp;
            <span className="text-sm font-semibold">$</span>
          </div>
        </div>
        <div className="p-4 border-t border-b text-xl text-gray-700">
          <span className="flex items-center mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>
            <span className="font-bold pr-1">Seat : </span> {availableQuantity}
          </span>
          <span className="flex items-center mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>
            <span className="font-bold pr-1">Enrolled : </span> {enrolled}
          </span>
          <span className="flex items-center mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>{" "}
            <span className="font-bold pr-1"> Instructor Name : </span>{" "}
            {instructorName}
          </span>
          <span className="flex items-center">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
            <span className="font-bold pr-1">Email : </span>
            {instructorEmail}
          </span>
        </div>

        {userCheck === "student" || userCheck === null ? (
          <div className="p-4 bg-purple-100 flex h-16 border-t items-center justify-between">
            <button
              onClick={() => handleAddToCart(_id, userRole)}
              className={`p-3  font-bold rounded-xl ${
                added ? "bg-blue-200 text-blue-800" : "bg-green-700 text-white"
              }`}
            >
              {added ? "Add to Card" : "Added"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AllClassCard;
