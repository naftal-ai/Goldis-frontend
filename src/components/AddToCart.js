import React from "react";
import useCart from "../hooks/useCart";
import Button from "./Button";
import ControlAmount from "./ControlAmount";
const AddToCart = ({product}) => {
  const { dispatch, findProductsInCart } = useCart();

  const productInCart = findProductsInCart(product._id);
  const handleAdd = () => {
    dispatch({ type: "ADD", payload: product });
  };

  const handleInc = () => {
    console.log(productInCart.amount);
    dispatch({ type: "INC", payload: productInCart });
  };
  const handleDec = () => {
    dispatch({ type: "DEC", payload: productInCart });
  };
  return (
    <>
      {productInCart ? (
        <ControlAmount
          handleDec={handleDec}
          handleInc={handleInc}
          amount={productInCart.amount}
        />
      ) : (
        <Button className="btn-sea" onClick={handleAdd}>
          <span>Add to cart</span>
        </Button>
      )}
    </>
  );
};

export default AddToCart;
