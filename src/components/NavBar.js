import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="main-navbar">
      <ul className="navbar-ul">
        <li className="home">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="products">
          <Link to={"/Products"}>Products</Link>
        </li>
        <li className="about">
          <Link to={"/about"}>About</Link>
        </li>
      </ul>

      <div className="icons">
        <Link to={"/my-cart"}>
          <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
        <Link to={'/login'}>
          <span className="material-symbols-outlined">login</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
