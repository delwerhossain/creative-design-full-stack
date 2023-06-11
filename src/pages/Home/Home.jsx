import { useEffect, useState } from "react";
import TopSlider from "./TopSlider";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
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
   <div>
     <TopSlider></TopSlider>
   </div>
 );
};

export default Home;
