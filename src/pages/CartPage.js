import React, { useState } from "react";
import "./styles/cart.css";

import useCart from "../hooks/useCart.js";
import useProducts from "../hooks/useProducts.js";

import Button from "../components/forms/Button.js";
import ProductCard from "../components/products/ProductCard.js";
import Error from "../components/utils/Error.js";

import InfoPage from "./InfoPage.js";

const CartPage = () => {
  const [errMsg, setErrMsg] = useState("")
  const { state, calculateTotalPrice, handleCheckout } = useCart();
  const { getProductById } = useProducts();

  const total = calculateTotalPrice();

  return (
    <div className="cart-page">
      {state.length > 0 ? (
        <div className="cart-container">
          <h1 className="title" style={{ textAlign: "center" }}>
            Your Cart
          </h1>

          <ul className="cart-list">
            {state.map(({ id }) => {
              const product = getProductById(id);
              
              if(product){
                return (
                  <li key={id} className="product-card">
                    <ProductCard product={getProductById(id)} />
                  </li>
                );
              }
              
            })}
          </ul>

          <div className="checkout">
            <h2>
              Total price: <span>{total}$</span>
            </h2>
            <Button className="btn btn-checkout" onClick={handleCheckout}>
              Checkout
            </Button>
            {}
          </div>
        </div>
      ) : (
        <InfoPage message={"Your cart is Empty :( \nstart buying!"} />
      )}
    </div>
  );
};

export default CartPage;
