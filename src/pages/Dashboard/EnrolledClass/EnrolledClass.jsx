import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import useEnroll from "../../../hooks/useEnroll";

const EnrolledClass = () => {
  const [cart] = useEnroll();
  console.log(cart);
  // how does reduce work!!!
  // const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);
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
      <div className="uppercase font-semibold h-[100px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Enroll: {cart.length}</h3>
        {/* <h3 className="text-3xl">Total Price: ${total}</h3> */}
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Price</th>
              {/* <th>status</th> */}
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>              
                <td>{item.ClassNames}</td>
                <td className="">${item.price}</td>
                {/* <td className="">${item.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClass;
