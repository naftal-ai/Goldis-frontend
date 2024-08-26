import React from "react";

const Button = ({ className = "", onClick, children }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
       {children}
    </button>
  );
};

export default Button;
