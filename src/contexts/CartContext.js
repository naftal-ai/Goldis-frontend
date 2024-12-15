import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext([]);

const cartReducer = (state, action) => {
  let newState;
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      newState = [{ id: payload, quantity: 1 }, ...state];
      break;

    case "REMOVE":
      newState = state.filter(({ id }) => id !== payload);
      break;

    case "INC":
      newState = state.map(({ id, quantity }) =>
        id === payload ? { id, quantity: quantity + 1 } : { id, quantity }
      );
      break;

    case "DEC":
      newState = state.map(({ id, quantity }) =>
        id === payload ? { id, quantity: quantity - 1 } : { id, quantity }
      );
      //remove if quantity == 0
      newState = newState.filter(({ quantity }) => quantity > 0);
      break;

    case "SET_STATE":
      newState = action.payload;
      break;

    default:
      console.log("default");
      return state;
  }

  localStorage.setItem("cart", JSON.stringify(newState));
  return newState;
};

export const CartProvider = ({ children }) => {
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
