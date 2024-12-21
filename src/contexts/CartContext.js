import { createContext, useReducer, useEffect } from "react";
import useProducts from "../hooks/useProducts";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const { availableProduct } = useProducts();

  const cartReducer = (state, action) => {
    let newState;
    const { type, payload } = action;

    switch (type) {
      case "ADD":
        if (!availableProduct(payload)) {
          return state;
        }
        newState = [{ id: payload, quantity: 1 }, ...state];
        break;

      case "REMOVE":
        newState = state.filter(({ id }) => id !== payload);
        break;

      case "INC":
        if (!availableProduct(payload.id, payload.quantity)) {
          return state;
        }
        newState = state.map(({ id, quantity }) =>
          id === payload.id
            ? { id, quantity: payload.quantity }
            : { id, quantity }
        );
        break;

      case "DEC":
        newState = state.map(({ id, quantity }) =>
          id === payload ? { id, quantity: quantity - 1 } : { id, quantity }
        );
       
        break;

      case "UPDATE":
        newState = state.map(({ id, quantity }) =>
          id === payload.id
            ? { id, quantity: payload.quantity }
            : { id, quantity }
        );
        break;
      case "SET_STATE":
        newState = action.payload;
        break;

      default:
        console.log("default");
        return state;
    }

     //remove if quantity == 0
     newState = newState.filter(({ quantity }) => quantity > 0);

    localStorage.setItem("cart", JSON.stringify(newState));
    return newState;
  };

  const [state, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const existsLocal = localStorage.getItem("cart");
    if (existsLocal) {
      dispatch({ type: "SET_STATE", payload: JSON.parse(existsLocal) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
