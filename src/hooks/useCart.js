import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import useProducts from "./useProducts.js";
import useAuth from "./useAuth.js";
import axios from "axios";
import { API_BASE_URL } from "../lib/Constants";
import { useNavigate, useLocation } from "react-router-dom";

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { getProductById } = useProducts();
  const { logout, isValidToken } = useAuth();
  const navigator = useNavigate();
  const location = useLocation();

  //Utilities
  const findProductsInCart = (_id) => {
    const res = state.filter(({ id }) => id === _id);
    return res.length > 0 ? res[0] : null;
  };

  const calculateTotalPrice = () => {
    try {
      const sum = state.reduce(
        (total, { id, quantity }) =>
          total + getProductById(id).price * quantity,
        0
      );
      return sum;
    } catch (error) {
      return 0;
    }
  };

  //maybe should be in a separate hook 'useOrders'
  const handleCheckout = async () => {
    const navigateToLogin = () => {
      logout();
      return navigator(
        `/login?redirect=${encodeURIComponent(location.pathname)}`
      );
    };

    //check the token is valid
    const token = localStorage.getItem("jwtToken");
    if (!token || !isValidToken(token)) {
      navigateToLogin();
    }

    const body = { items: state };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${API_BASE_URL}/orders`, body, { headers: headers })
      .then(function (response) {
        window.location = response.data.sessionUrl;
      })
      .catch(function (error) {
        const { statusText } = error.response
        switch (statusText) {
          case "Unauthorized":
            logout();
            navigateToLogin();
            break;
          case "Stock Conflict":
            console.log(error.response.data.details)
            break;
          case "Internal Server Error":
            alert("Server error");
            break;
          default:
            alert("not handle error");
            break;
        }
      });
  };

  const cleanCart = () => dispatch({ type: "SET_STATE", payload: [] });
  return {
    state,
    dispatch,
    findProductsInCart,
    calculateTotalPrice,
    handleCheckout,
    cleanCart,
  };
};

export default useCart;
