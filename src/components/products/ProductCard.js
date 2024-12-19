import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
 
  const { _id, name, description, images, price, category } = product;

  const ProductImg = () => (
    <Link to={`/product-page/${_id}`}>
      <img
        src={images[0]}
        alt="pic"
        style={{ maxWidth: "100%", borderRadius: "25px" }}
      />
    </Link>
  );

  const Price = () => (
    <div className="price">
      <p>Price:</p>
      <p>{`${price}$`}</p>
    </div>
  );

  const Info = () => (
    <div className="product-info">
      <h3 className="product-title">{name}</h3>
      <p className="product-description">
        {description.substring(0, 20)}...
        <Link to={`/product-page/${_id}`}>
          <b> read more</b>
        </Link>
      </p>
      <span className="category-label">{category.name}</span>
    </div>);

  return (
    <>
      <ProductImg />
      <Info />
      <div className="price-button">
        <Price />
        <AddToCart id={product._id} />
      </div>
    </>
  );
};

export default ProductCard;
