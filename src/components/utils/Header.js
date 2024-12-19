import React from "react";
import NavBar from "./NavBar";
import logo from "../../assets/AbstractDesign-5_Gpi5_9.svg";

const Header = () => {
  return (
    <header className="main-header">
        <h1 className="name">Goldi's</h1>
        <NavBar />
        <img
          src={logo}
          alt="logo"
          id="header-bg"
        />
    </header>
  );
};

export default Header;
