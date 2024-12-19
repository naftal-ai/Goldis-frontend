import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/infoPage.css";

const InfoPage = ({ message, url='/' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(url)
    const timer = setTimeout(navigate, 3000, url, { replace: true });

    return () => clearTimeout(timer);
  }, [navigate]); // the dependencies is navigate -> if the user is navigating manually before the timeout is over the clear timeout invoke.

  return (
    <div className="page">
      <p>{message}</p>
    </div>
  );
};

export default InfoPage;
