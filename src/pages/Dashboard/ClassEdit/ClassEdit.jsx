import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ClassEdit = () => {
  const { user } = useAuth();
  // navigation
  const navigate = useNavigate();
  // axios
  const [axiosSecure] = useAxiosSecure();
  const { paramID } = useParams();
  const [classes, setClasses] = useState([]);
  console.log({ paramID });

  // single toys fetch data
  useEffect(() => {
    axiosSecure.get(`http://localhost:5000/instructor-class`).then((data) => {
      const objectData = data.data;
      if (objectData) {
        // console.log(data.data);
        const editData = objectData.find((data) => data._id == paramID);
        setClasses(editData);
      }
    });
  }, [paramID]);

  const { _id, name, pictureURL, subCategory, price, availableQuantity } =
    classes;

  const [category, setCategory] = useState(subCategory);

  // edit
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const form = event.target;
    //   const vCategory = event.target.subCategory.value;
    const nameValue = form.name.value;
    const pictureURLValue = form.pictureURL.value;
    const subCategoryValue = form.subCategory.value;
    const priceValue = form.toyPrice.value;
    const availableQuantityValue = form.availableQuantity.value;

    const classData = {
      name: nameValue,
      pictureURL: pictureURLValue,
      subCategory: subCategoryValue,
      price: priceValue,
      availableQuantity: availableQuantityValue,
    };
    console.log(classData);
    // sent data to backend
    // fetch(
    //   `https://server-class-marketplace-delwerhossain.vercel.app/toys/${_id}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(toys),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.insertedId) {
    //       Swal.fire({
    //         title: "success",
    //         text: "toys Added Successfully",
    //         showDenyButton: true,
    //         showCancelButton: true,
    //         icon: "success",
    //         confirmButtonText: "Cool",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(`http://localhost:5000/update-class/${_id}`, { classData })
          .then((data) => {
            console.log(data);
            if (data.data.matchedCount) {
              Swal.fire({
                title: "success",
                text: "class Update Successfully",
                showDenyButton: false,
                showCancelButton: true,
                icon: "success",
                confirmButtonText: "Cool",
              });
              navigate("/dashboard/instructor-class");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div className="md:w-6/12 w-10/12 mx-auto my-16">
      <h1 className="mb-12  text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        Class Details update{" "}
      </h1>
      <form onSubmit={handleSubmitEdit}>
        {/* email */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            required
            defaultValue={user.email}
            type="text"
            name="instructorEmail"
            id="instructorEmail"
            className="block py-2.5 px-0 w-full font-semibold  text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="instructorEmail"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {/* instructor name */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            required
            defaultValue={user.displayName}
            type="text"
            name="instructorName"
            id="instructorName"
            className="block py-2.5 px-0 w-full font-semibold  text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            disabled
          />
          <label
            htmlFor="instructorName"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Instructor Name
          </label>
        </div>
        {/* Class name */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            defaultValue={name}
            required
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Class Name
          </label>
        </div>
        {/* Class URL */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            defaultValue={pictureURL}
            required
            type="text"
            name="pictureURL"
            id="pictureURL"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="pictureURL"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Class Url
          </label>
        </div>
        {/* Sub Category */}
        <div className="my-3 form-control w-full text-black max-w-xs">
          <label className="label">
            <span className="label-text text-black ml-2">Sub Category</span>
          </label>
          <select
            required
            id="subCategory"
            name="subCategory"
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Heroes">Heroes</option>
            <option value="Art toys">Art toys</option>
            <option value="Essentials">Essentials</option>
            <option value="Art & Books">Art & Books</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 md:gap-6">
          {/* price */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={price}
              required
              type="text"
              name="toyPrice"
              id="toyPrice"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="toyPrice"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              price
            </label>
          </div>

          {/* availableQuantity */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={availableQuantity}
              required
              type="number"
              name="availableQuantity"
              id="availableQuantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="availableQuantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Available Quantity
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClassEdit;
