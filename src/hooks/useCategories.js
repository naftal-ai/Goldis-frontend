import { useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext.js";

const useCategories = () => {
    const categories = useContext(CategoriesContext);

    return categories;
}

export default useCategories;