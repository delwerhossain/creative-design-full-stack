import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import ClassCard from "../../Components/ClassCard/ClassCard";

const AllClass = () => {
  const [classes, setClasses] = useState([]);
  const [userRole, setUserCheck] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          "https://creative-design-server.vercel.app/all-class",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail: user?.email }),
          }
        );
        const data = await res.json();
        setClasses(data?.result);
        setUserCheck(data?.userCheck);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return loading ? (
    <div className="grid justify-center items-center">
      <Loading></Loading>
    </div>
  ) : (
    <div>
      <h1 className="mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center md:text-5xl lg:text-6xl">
        All Class
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
