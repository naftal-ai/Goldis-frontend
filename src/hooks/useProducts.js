import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

const useProducts = () => {
    const {products, loading, error, refetch} = useContext(ProductsContext);

    const getProductById = (id) => {
        const cachedProduct = products.find((product) => id === product._id);
        return cachedProduct;
      }
    const availableProduct = (id, quantity=0) => {
        const product = getProductById(id);
        if (!product) {
          return false;
        }
        return product.stock - quantity >= 0;
      }

    return {
        products, 
        loading,
        error,
        getProductById,
        refetch,
       availableProduct
    };
}

export default useProducts;