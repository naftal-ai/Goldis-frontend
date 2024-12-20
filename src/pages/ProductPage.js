import React from "react";

import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts.js";

import ImageSelector from "../components/products/ImageSelector.js";
import SizeSelector from "../components/products/SizeSelector.js";
import AddToCart from "../components/products/AddToCart.js";
import Error from "../components/utils/Error.js";

import "./styles/product.css";

const ProductPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id);

  const sizes = [
    { size: "XS", available: false },
    { size: "S", available: true },
    { size: "M", available: true },
    { size: "L", available: false },
    { size: "XL", available: true },
  ];

  return (
    <div className="product-page page">
      {product ? (
        <>
          <div className="description">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <hr />
            <SizeSelector sizes={sizes} />
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
