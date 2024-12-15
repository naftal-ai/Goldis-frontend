import React from "react";
import ProductCard from "../components/ProductCard.js";
import Button from "../components/Button.js";
import useCart from "../hooks/useCart.js";
import "./styles/cart.css";
import useProducts from "../hooks/useProducts.js";
import InfoPage from "./InfoPage.js";

const CartPage = () => {
  const { state, calculateTotalPrice, handleCheckout } = useCart();
  const { getProductById } = useProducts();

  const total = calculateTotalPrice();

  return (
    <div className="cart-page">
      {state.length > 0 ? (
        <>
          <h1 className="title" style={{ textAlign: "center" }}>
            Your Cart
          </h1>

          <ul className="products-list cart-list">
            {state.map(({ id }) => {
              const product = getProductById(id);
              return (
                <>
                  {product && (
                    <li key={id} className="product-card">
                      <ProductCard product={getProductById(id)} />
                    </li>
                  )}
                </>
              )
            })}
          </ul>

          <div style={{ display: "flex", margin: "20px" }}>
            <h2>
              Total price: <span>{total}$</span>
            </h2>
            <Button className="btn btn-green" onClick={handleCheckout}>Checkout</Button>
          </div>
        </>
      ) : (<InfoPage message={"Your cart is Empty :( \nstart buying!"} />) }
    </div>
  );
};

export default CartPage;
