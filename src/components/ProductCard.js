import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
  
  const { id, title, description, images, price, category } = product;
  
  
  return (
    <>
      <ProductImg image={images[0]} />
      {/* product information */}
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">
          {description.substring(0, 20)}...
          <Link to={`/product-page/${id}`}>
            <b> read more</b>
          </Link>
        </p>
        <span className="lable">{category.name}</span>
      </div>
      <div className="price-button">
        <Price price={price} />
        <AddToCart product={product}/>
      </div>
    </>
  );
};

const ProductImg = ({ image }) => (
  <Link to="/">
    <img
      src={image}
      alt="pic"
      style={{ maxWidth: "100%", borderRadius: "25px" }}
    />
  </Link>
);

const Price = ({ price }) => (
  <div className="price">
    <p>Price:</p>
    <p>{`${price}$`}</p>
  </div>
);

export default ProductCard;
