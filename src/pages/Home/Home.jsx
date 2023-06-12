import { useEffect, useState } from "react";
import TopSlider from "./TopSlider";
import Loading from "../../Components/Loading/Loading";
import PopularClass from "./PopularClass";
import useAuth from "../../hooks/useAuth";
import ContactPart from "./ContactPart";
import InstructorPart from "./InstructorPart";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  // for popular classes
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("http://localhost:5000/all-class", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: user?.email }),
        });
        const data = await res.json();
        setClasses(data?.result);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // instructor 
   const [axiosSecure] = useAxiosSecure();
   const [instructors, setInstructors] = useState([]);
   const fetchData = () => {
     axiosSecure
       .get("/all-instructor")
       .then((data) => setInstructors(data?.data));
   };
   useEffect(() => {
     fetchData();
   }, []);
  
  // loading
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
      {/*  popular  */}
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Our Popular class</h1>
        <h1 className="text-3xl">Creation of Design</h1>
      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {classes.slice(0, 8).map((product) => (
          <PopularClass key={product._id} product={product} />
        ))}
      </section>
      {/* instructor part */}

      <div>
        <div className="text-center p-10">
          <h1 className="font-bold text-4xl mb-4">Our Popular Instructors</h1>
          <h1 className="text-3xl">Creation of Design</h1>
        </div>
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              {instructors.slice(0, 6).map((instructor) => (
                <InstructorPart
                  key={instructor._id}
                  instructor={instructor}
                ></InstructorPart>
              ))}
        </section>
      </div>
      {/* Contact part */}
      <ContactPart />
    </div>
  );
};

export default Home;
