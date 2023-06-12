import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import Loading from "../../../Components/Loading/Loading";
import { useEffect, useState } from "react";

const SelectClass = () => {
  const [cart, refetch] = useCart();
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
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
     <div className="uppercase font-semibold h-[100px] flex justify-evenly items-center">
       <h3 className="text-3xl">Total Items: {cart.length}</h3>
       <h3 className="text-3xl">Total Price: ${total}</h3>
       <Link to="/dashboard/payment">
         <button className="btn btn-warning">PAY ALL Now</button>
       </Link>
     </div>
     <div className="overflow-x-auto w-full">
       <table className="table w-full">
         {/* head */}
         <thead>
           <tr>
             <th>#</th>
             <th>Image</th>
             <th>Class Name</th>
             <th>Price</th>
             <th>Action</th>
             <th>Pay</th>
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
               <td className="">${item.price}</td>
               <td>
                 <button
                   onClick={() => handleDelete(item)}
                   className="btn btn-ghost bg-red-600  text-white"
                 >
                   <FaTrashAlt></FaTrashAlt>
                 </button>
               </td>
               <td>
                 <Link to="/dashboard/payment" className="btn btn-warning ">
                   Pay One
                 </Link>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 );
};

export default SelectClass;
