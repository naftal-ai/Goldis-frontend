import { createContext } from "react";
import useFetch from "../hooks/useFetch.js";

//Create the Context
export const CategoriesContext = createContext();

//Context Provider
export const CategoriesProvider = ({ children }) => {
  const {loading, error, data: categories} = useFetch('/categories');
  return (
    <CategoriesContext.Provider value={{loading, error, categories}}>
      {children}
    </CategoriesContext.Provider>
  );
};
