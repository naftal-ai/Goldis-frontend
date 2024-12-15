import { createContext } from "react";
import useFetch from "../hooks/useFetch";

//Create the Context
export const ProductsContext = createContext();

//Context Provider
export const ProductsProvider = ({ children }) => {
  const { data: products, loading, error } = useFetch('/products');
  
  
  return (
    <ProductsContext.Provider value={{products, error, loading}}>
      {children}
    </ProductsContext.Provider>
  );
};
