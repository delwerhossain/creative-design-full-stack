import { useState } from "react";
import ClassCard from "../../../Components/ClassCard/ClassCard";
import useAuth from "../../../hooks/useAuth";

const InstructorClass = () => {
     const { user } = useAuth()

    const FilterByMail =[]
    //     cateID.filter(
    //    (toys) => user.email === toys.sellerEmail
    //  );
  
    const myClassFilter = [3, 3]
      const [myToysFilter, setMyToysFilter] = useState(FilterByMail); 
      const handleDeleteFilter = (id) => {
        const deleteFilter = myToysFilter.filter((data) => data._id !== id);
        setMyToysFilter(deleteFilter);
      }; 
    return (
      <div>
        <body className="antialiased bg-gray-200 text-gray-900 font-sans p-6">
          <h1 className="mb-12  text-4xl font-extrabold leading-none tracking-tight text-gray-900  text-center md:text-5xl lg:text-6xl ">
            My Class{" "}
          </h1>
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
              {myClassFilter.map((product) => (
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