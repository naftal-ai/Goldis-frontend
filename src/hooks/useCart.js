import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import useProducts from "./useProducts.js";
import useAuth from "./useAuth.js";
import axios from "axios";
import { API_BASE_URL } from "../lib/Constants";
import { useNavigate } from "react-router-dom";


const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { getProductById } = useProducts();
  const { setIsLoggedIn, isValidToken } = useAuth();
  const navigator = useNavigate();
  //Utilities
  const findProductsInCart = (_id) => {
    const res = state.filter(({ id }) => id === _id);
    return res.length > 0 ? res[0] : null;
  };
  
  const calculateTotalPrice = () => {
    try {
      const sum = state.reduce(
        (total, { id, quantity }) => total + getProductById(id).price * quantity,
        0
      );
      return sum;
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  };

  const handleCheckout = async () => {
    //check the token is valid
    const token = localStorage.getItem('jwtToken');
    if(!token || !isValidToken(token)){
      setIsLoggedIn(false);
      return navigator('/login');
    }
    const body = {items: state};
    const headers = { "Content-Type": "application/json" ,
      "Authorization": `Bearer ${token}`
    };

    console.log(headers)
    axios
      .post(`${API_BASE_URL}/orders`, body, {headers: headers})
      .then(function (response) {
        console.log(response.data.sessionUrl);
        window.location = response.data.sessionUrl;
      })
      .catch(function (error) {
        setIsLoggedIn(false);
        console.log(error);
      });
  };

  const cleanCart = () => dispatch({type: "SET_STATE", payload: [] })
  return {
    state,
    dispatch,
    findProductsInCart,
    calculateTotalPrice,
    handleCheckout,
    cleanCart
  };
};

export default useCart;
