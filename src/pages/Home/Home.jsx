import { useEffect, useState } from "react";
import TopSlider from "./TopSlider";
import Loading from "../../Components/Loading/Loading";
import PopularClass from "./PopularClass";
import useAuth from "../../hooks/useAuth";
import ContactPart from "./ContactPart";

const Home = () => {
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
        <h1 className="font-bold text-4xl mb-4">
          Responsive Product card grid
        </h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {classes.slice(0, 8).map((product) => (
          <PopularClass key={product._id} product={product} />
        ))}
      </section>
      {/* instructor part */}

      <div>yesy</div>
      {/* Contact part */}
      <ContactPart />
    </div>
  );
};

export default Home;
