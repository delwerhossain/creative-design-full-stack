import { useEffect, useState } from "react";
import ClassCard from "../../../Components/ClassCard/ClassCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const InstructorClass = () => {
  const [classes, setClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    
    axiosSecure.get(`/instructor-class`).then((data) => {
      setClasses(data.data);
    });
  }, [])
  
   
    const handleDeleteFilter = (id) => {
        console.log(id);
     }
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
      <body className="antialiased bg-gray-200 text-gray-900 font-sans p-6">
        <h1 className="mb-12  text-4xl font-extrabold leading-none tracking-tight text-gray-900  text-center md:text-5xl lg:text-6xl ">
          My Class{" "}
        </h1>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {classes.map((product) => (
              <ClassCard
                key={product._id}
                product={product}
                handleDeleteFilter={handleDeleteFilter}
              ></ClassCard>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
};

export default InstructorClass;