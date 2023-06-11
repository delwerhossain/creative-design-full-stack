import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";

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
  return (
    <div>
      <h1 className="text-4xl font-semibold text-center  mt-10 underline">
        Our InsTructor
      </h1>

      <div className="mt-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
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
