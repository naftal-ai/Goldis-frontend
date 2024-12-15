import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Canceled</h1>
      <p>It seems you canceled the payment process.</p>
      <button onClick={() => navigate("/")}>Go Back to Homepage</button>
    </div>
  );
};

export default PaymentCancel;
