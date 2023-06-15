// import { useEffect, useState } from "react";
// import Loading from "../../../Components/Loading/Loading";
// import usePayHistory from "../../../hooks/usePayHistory";

// const PaymentHistory = () => {
//   const [history,] = usePayHistory();
//   console.log(history);
//   // how does reduce work!!!
//   const total = history.reduce((sum, item) => parseFloat(item.price) + sum, 0);
//   console.log(history);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (loading) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 300);
//     }
//   }, []);

//   return loading ? (
//     <div className="grid justify-center items-center">
//       <Loading></Loading>
//     </div>
//   ) : (
//     <div className="w-full">
//       <div className="uppercase font-semibold h-[100px] flex justify-evenly items-center">
//         <h3 className="text-3xl">Pay History: {history.length}</h3>
//         <h3 className="text-3xl">Total Price: ${total}</h3>
//       </div>
//       <div className="overflow-x-auto w-full">
//         <table className="table w-full">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>transactionId</th>
//               <th>Time</th>
//               <th>Price</th>
//               {/* <th>status</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 <td>{item.date}</td>
//                 <td>{item.transactionId}</td>
//                 {/* <td className="">{item.quantity}</td> */}
//                 <td className="">${item.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;

import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import usePayHistory from "../../../hooks/usePayHistory";

const PaymentHistory = () => {
  const [history] = usePayHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  // Sort the history array in descending order based on the date
  const sortedHistory = history.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return loading ? (
    <div className="grid justify-center items-center">
      <Loading></Loading>
    </div>
  ) : (
    <div className="w-full">
      <div className="uppercase font-semibold h-[100px] flex justify-evenly items-center">
        <h3 className="text-3xl">Pay History: {sortedHistory.length}</h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>transactionId</th>
              <th>Time</th>
              <th>Price</th>
              {/* <th>status</th> */}
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.transactionId}</td>
                {/* <td className="">{item.quantity}</td> */}
                <td className="">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
