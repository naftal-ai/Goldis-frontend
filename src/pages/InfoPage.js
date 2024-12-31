import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const InfoPage = ({ message, url = "/", functionToInvoke }) => {
  const navigate = useNavigate();
  
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const orderId = searchParams.get("orderId");




  if(orderId) url = url.concat(`/${orderId}`);
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (functionToInvoke) functionToInvoke();
      navigate(url);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, url]); // the dependencies is navigate -> if the user is navigating manually before the timeout is over the clear timeout invoke.

  return (
    <div className="page">
      <p style={{ fontSize: "large" }}>{message}</p>
    </div>
  );
};

export default InfoPage;
