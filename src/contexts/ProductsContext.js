import { createContext } from "react";
import useFetch from "../hooks/useFetch";

//Create the Context
export const ProductsContext = createContext();

//Context Provider
export const ProductsProvider = ({ children }) => {
  const products = useFetch();
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};
