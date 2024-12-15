import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/infoPage.css";

const InfoPage = ({ message }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(navigate, 3000, "/", { replace: true });
  }, []);

  return (
    <div className="page">
      <p>{message}</p>
    </div>
  );
};

export default InfoPage;
