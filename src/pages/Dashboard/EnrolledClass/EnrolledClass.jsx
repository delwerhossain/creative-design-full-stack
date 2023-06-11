import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";

const EnrolledClass = () => {
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
   <div></div>
 );
};

export default EnrolledClass;
