import React from "react";

import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts.js";

import ImageSelector from "../components/products/ImageSelector.js";
import AddToCart from "../components/products/AddToCart.js";
import Error from "../components/utils/Error.js";

import "./styles/product.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id);

  
  return (
    <div className="product-page page">
      {product ? (
        <>
          <div className="description">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <hr />
            <AddToCart id={id} stock={product.stock}/>
          </div>
          <div className="images">
            <ImageSelector images={product.images} />
          </div>
        </>
      ) : (
        <Error errMsg={"cannot find the product!"} />
      )}
    </div>
  );
};

export default ProductPage;
