import React from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import useProducts from "../hooks/useProducts";


const ProductsList = ({ category }) => {
  
  const { products, loading } = useProducts();
  const searchValue = useOutletContext();

    return (
      <>
      <ul className="products-list">
        {loading ? (
          <Loading />
        ) : (
          <>
            {products
              .filter((p) => (p.category.name === category || category === 'all-products') && p.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((p) => (
                <li key={p._id} className="product-card" >
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
