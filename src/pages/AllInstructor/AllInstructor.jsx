import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Loading from "../../Components/Loading/Loading";

const AllInstructor = () => {
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
      <h1 className="text-4xl font-semibold text-center  mt-10 underline">
        Our InsTructor
      </h1>

      <div className="mt-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
        {instructors.map((instructor) => (
          <ProfileCard
            key={instructor._id}
            instructor={instructor}
          ></ProfileCard>
        ))}
      </div>
    </div>
  );
};

export default AllInstructor;
