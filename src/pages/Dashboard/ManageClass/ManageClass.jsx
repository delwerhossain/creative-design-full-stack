import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useAllClass from "../../../hooks/useAllClass";

const ManageClass = () => {
  const [classes, refetch] = useAllClass();
  const [axiosSecure] = useAxiosSecure();
  
  // clas
  const handlePromoteClass = (
    status,
    id,
    instructorEmail,
    name,
    price,
    subCategory
  ) => {
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
          .post(`/class-update/:${id}`, {
            status: status,
            instructorEmail: instructorEmail,
            name: name,
            price: price,
            subCategory: subCategory,
          })
          .then((data) => {
            if (data?.data?.modifiedCount > 0) {
              Swal.fire({
                title: "upgrade class Successfully!",
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

  // modal
  const handleFeedback = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    const id = e.target.class_id.value;
    console.log({ feedback, id });
    axiosSecure.put(`/feedback/${id}`, { feedback }).then((data) => {
      if (data?.data?.modifiedCount > 0) {
        Swal.fire({
          title: "feedback  Successfully!",
          icon: "success",
          timer: 500, // Optional: Auto-close the modal after 2 seconds
          showConfirmButton: false,
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
        <h3 className="text-3xl font-semibold">
          Total Classes: {classes.length}
        </h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Ins.Email</th>
              <th>status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.pictureURL}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.instructorEmail}</td>
                <td className="border font-bold">{item.status}</td>

                <td className="border font-bold">
                  <form className="grid grid-rows-2" onSubmit={handleFeedback}>
                    <input
                      type="text"
                      name="feedback"
                      placeholder="Feedback Type here"
                      className="input bg-red-100 input-bordered input-error w-auto max-w-xs"
                    />{" "}
                    <input
                      className="hidden"
                      type="text"
                      name="class_id"
                      value={item._id}
                    />
                    <button className="btn mx-auto mt-2 btn-sm">
                      {" "}
                      feedback
                    </button>
                  </form>
                </td>

                <td>
                  {item.status && (
                    <>
                      <div className="">
                        <button
                          onClick={() =>
                            handlePromoteClass(
                              "accept",
                              item._id,
                              item.instructorEmail,
                              item.name,
                              item.price,
                              item.subCategory
                            )
                          }
                          className="btn btn-primary btn-sm mr-2"
                          disabled={item.status === "accept"}
                        >
                          accept
                        </button>

                        <button
                          className="btn btn-error text-stone-50 btn-sm"
                          onClick={() =>
                            handlePromoteClass(
                              "decline",
                              item._id,
                              item.instructorEmail,
                              item.name,
                              item.price,
                              item.subCategory
                            )
                          }
                          disabled={item.status === "decline"}
                        >
                          decline
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

export default ManageClass;
