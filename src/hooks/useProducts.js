import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

const useProducts = () => {
    const products = useContext(ProductsContext);

    return products;
}

export default useProducts;