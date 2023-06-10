import "./classCard.scss";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ClassCard = ({ product, handleDeleteFilter }) => {
  const location = useLocation();
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
    status,
    feedback,
  } = product;
  const { user } = useAuth();
  const handleDelete = (id) => {
    fetch(`https://server-toy-marketplace.vercel.app/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleDeleteFilter(id);

          Swal.fire({
            title: "Delete",
            text: "toys Delete Successfully",
            showCancelButton: true,
            icon: "delete",
            confirmButtonText: "warning",
          });
        }
      });
  };
  const pendingCheck = status == "pending";
  const declineCheck = status == "decline";
  const acceptCheck = status == "accept";
  const studentCheck = user?.role == "admin"
  console.log(studentCheck);
  const locationCheck = location.pathname === "/dashboard/instructor-class";
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
        {/* extra secure layer */}
        {user && user.email === instructorEmail && locationCheck && (
          <div className="p-4 flex  items-center justify-between">
            <span
              className={`inline-block px-2 mr-2 py-3 rounded-full font-semibold  tracking-wide  ${
                pendingCheck
                  ? "bg-orange-200 text-orange-800"
                  : acceptCheck
                  ? "bg-green-300 text-green-900"
                  : declineCheck && "bg-red-600 text-white"
              }`}
            >
              status - <span className="uppercase">{status}</span>
            </span>
            <div>
              {" "}
              <Link to={`/edit/${_id}`} className="btn btn-secondary mr-4">
                Update{" "}
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-error"
              >
                Delete
              </button>{" "}
            </div>
          </div>
        )}

        {feedback && (
          <div className="p-4 bg-purple-100 flex h-10 border-t items-center justify-between">
            <p>
              <span className="font-bold">Admin feedback :</span>{" "}
              <span> {feedback}</span>
            </p>
          </div>
        )}
        {/* {user?.role == "student"  && (
          <div className="p-4 bg-purple-100 flex h-16 border-t items-center justify-between">
            <button className="p-3 bg-blue-200 text-blue-800 font-bold rounded-xl">
              Add to Card
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ClassCard;
