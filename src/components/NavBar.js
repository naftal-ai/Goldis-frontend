import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart.js";
import useAuth from "../hooks/useAuth.js";

const NavBar = () => {
  const { isLoggedIn } = useAuth();
  const { state: cartState } = useCart();

  return (
    <nav className="main-navbar">
      <ul className="navbar-ul">
        <li className="home">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="products">
          <Link to={"/Products/all-products"}>Products</Link>
        </li>
        <li className="my-orders">
          <Link to={"/my-orders"}>my Orders</Link>
        </li>
      </ul>

      <div className="icons">
        <Link to={"/my-cart"} className="cart-icon">
          <span className={cartState.length <= 0 ? "hidden" : ""}>
            {cartState.reduce((acc, { quantity }) => acc + quantity, 0)}
          </span>
          <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
        {isLoggedIn ? (
          <Link to={"/logout"}>
            <span className="material-symbols-outlined">logout</span>
          </Link>
        ) : (
          <>
            <Link to={"/login"}>
              <span className="material-symbols-outlined">login</span>
            </Link>
            <Link to={"/signup"}>
              <span className="material-symbols-outlined">
                app_registration
              </span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
