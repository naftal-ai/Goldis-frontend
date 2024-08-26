import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const useCart = () => {
    const {state, dispatch} = useContext(CartContext);

    //Utilities
    const findProductsInCart = (_id) => {
      const res = state.filter(({ p }) => p._id === _id); 
      return res.length > 0 ? res[0] : null;
    };
    return { state, dispatch, findProductsInCart}
}



export default useCart;