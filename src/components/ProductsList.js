import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../contexts/ProductsContext";
import Loading from "./Loading";


const ProductsList = ({ category }) => {
  const { products, loading } = useContext(ProductsContext);
  const searchValue = useOutletContext();

    return (
      <>
      <ul className="products-list">
        {loading ? (
          <Loading />
        ) : (
          <>
            {products
              .filter((p) => (p.category.name === category || category === 'all-products') && p.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((p) => (
                <li key={p.id} className="product-card" >
                  <ProductCard product={p}/>
                </li>
              ))}
          </>
        )}
      </ul>
      </>
    );
};

export default ProductsList;
