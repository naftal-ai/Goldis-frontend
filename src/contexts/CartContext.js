import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext([]);

const cartReducer = (state, action) => {
  let newState;
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      newState = [{ p: payload, amount: 1 }, ...state];
      break;

    case "INC":
      newState = state.map(({ p, amount }) =>
        p._id === payload.p._id ? { p, amount: amount + 1 } : { p, amount }
      );
      break;

    case "DEC":
      newState = state.map(({ p, amount }) =>
        p._id === payload.p._id ? { p, amount: amount - 1 } : { p, amount }
      );
      //remove if amount == 0
      newState = newState.filter(({ amount }) => amount > 0);
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
