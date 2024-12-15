import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { cleanCart } = useCart();
  cleanCart();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-orders"); // Redirect to homepage or another route
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. You will be redirected shortly.</p>
      <button onClick={() => navigate("/my-orders")}>Go to Homepage</button>
    </div>
  );
};

export default PaymentSuccess;
