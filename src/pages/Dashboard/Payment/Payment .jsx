import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import PayCard from "./PayCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const [axiosSecure] = useAxiosSecure();
  const params = useParams();
  const payClassID = params.id;
  const [cart, setCart] = useState([]);

  const fetchCLassData = async (id) => {
    axiosSecure
      .get(`/single-class/${id}`)
      .then((data) => {
        setCart(data.data);
      });
  };
  useEffect(() => {
    fetchCLassData(payClassID);
  }, []);

  console.log({ payClassID, cart });

  const price = parseFloat(cart.price);
  return (
    <div>
      <PayCard></PayCard>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
