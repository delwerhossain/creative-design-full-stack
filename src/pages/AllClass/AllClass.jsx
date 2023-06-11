import { useEffect, useState } from "react";
import ClassCard from "../../Components/ClassCard/ClassCard";
import useAuth from "../../hooks/useAuth";

const AllClass = () => {
  const [classes, setClasses] = useState([]);
  const [userRole, setUserCheck] = useState([]);
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
        setUserCheck(data?.userCheck);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1 className="mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center md:text-5xl lg:text-6xl">
        My Class
      </h1>
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {classes.map((product) => (
            <ClassCard
              key={product._id}
              product={product}
              userRole={userRole}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClass;
