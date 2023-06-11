import { RiArrowDropDownLine } from "react-icons/ri";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import Loading from "../../../Components/Loading/Loading";

const ManageClass = () => {
  const [cart, setCart] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const AllUsers = () => {
    axiosSecure.get("/class").then((user) => setCart(user.data));
  };
  useEffect(() => {
    AllUsers();
  }, []);
console.log(cart);
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
       <h3 className="text-3xl font-semibold">Total Classes: {cart.length}</h3>
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
             <th>Class Image</th>
             <th>Class Name</th>
             <th>Ins.Email</th>
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
                     <img
                       src={item.pictureURL}
                       alt="Avatar Tailwind CSS Component"
                     />
                   </div>
                 </div>
               </td>
               <td>{item.name}</td>
               <td>${item.instructorEmail}</td>
               <td>
                 {item.status && (
                   <>
                     <div className="dropdown dropdown-hover">
                       <label
                         tabIndex={0}
                         className={`btn  btn-outline  m-1 ${
                           item.status == "accept"
                             ? " btn-success"
                             : item.status == "pending"
                             ? " btn-warning"
                             : "btn-error"
                         }`}
                       >
                         <span className="mr-1">{item.status}</span>{" "}
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
                           <a>Accept</a>
                         </li>
                         <li>
                           <a>Pending</a>
                         </li>
                         <li>
                           <a>Decline</a>
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

export default ManageClass;
