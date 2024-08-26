import React from "react";
import useProducts from "../hooks/useProducts.js";
import { useParams } from "react-router-dom";
import ImageSelector from "../components/ImageSelctor.js";
import Loading from "../components/Loading.js";
import SizeSelector from "../components/SizeSelector.js";
import "./styles/product.css";
import AddToCart from "../components/AddToCart.js";


const ProductPage = () => {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const sizes = [
    {size: 'XS', available: false},
    {size: 'S', available: true},
    {size: 'M', available: true},
    {size: 'L', available: false},
    {size: 'XL', available: true},
  ]

  const product = products.filter((p) => p.id === +id)[0];

  return (
    <div className="product-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="description">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <hr />
            <SizeSelector sizes={sizes}/>
            <hr />
            <AddToCart product={product} />
          </div>
          <div className="images">
            <ImageSelector images={product.images} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
