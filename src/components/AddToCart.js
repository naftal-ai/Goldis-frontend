import React from "react";
import useCart from "../hooks/useCart";
import Button from "./Button";
import ControlAmount from "./ControlAmount";
const AddToCart = ({id}) => {
  const { dispatch, findProductsInCart } = useCart();


  const productInCart = findProductsInCart(id);
  
  const handleAdd = () => {
    dispatch({ type: "ADD", payload: id });
  };

  const handleInc = () => {
    dispatch({ type: "INC", payload: id });
  };
  const handleDec = () => {
    dispatch({ type: "DEC", payload: id });
  };
  return (
    <>
      {productInCart ? (
        <ControlAmount
          handleDec={handleDec}
          handleInc={handleInc}
          amount={productInCart.quantity}
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
