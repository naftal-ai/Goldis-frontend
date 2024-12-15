import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

const useProducts = () => {
    const {products, loading, error} = useContext(ProductsContext);

    const getProductById = (id) => {
        const cachedProduct = products.find((product) => id === product._id);
        return cachedProduct;
      }

    return {
        products, 
        loading,
        error,
        getProductById
    };
}

export default useProducts;