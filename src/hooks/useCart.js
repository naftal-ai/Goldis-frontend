import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

import useProducts from "./useProducts.js";


const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { getProductById } = useProducts();

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

  const checkAllAvailable = () => {
    const unavailableProducts = state.filter(({ id, quantity }) => {
      return !getProductById(id) || !getProductById(id).stock - quantity >= 0;
    });

    return unavailableProducts;
  }

  const cleanCart = () => dispatch({ type: "SET_STATE", payload: [] });

 

  return {
    state,
    dispatch,
    findProductsInCart,
    calculateTotalPrice,
    checkAllAvailable,
    cleanCart,
  };
};

export default useCart;
