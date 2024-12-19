import React, { useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import Button from "../forms/Button";
import useNotification from "../../hooks/useNotification";

const AddToCart = ({ id, stock }) => {
  const [availableProduct, setAvailableProduct] = useState(false);
  const { dispatch, findProductsInCart } = useCart();
  const { showNotification } = useNotification();
  const { quantity } = findProductsInCart(id) || {};

  useEffect(() => {
    setAvailableProduct(stock > 0 && (!quantity || quantity < stock));
  }, [stock, id, findProductsInCart, quantity]);


  const handleAdd = () => {
    if (!availableProduct) {
      showNotification("Product out of stock");
    } else {
      dispatch({ type: "ADD", payload: id });
    }
  };

  const handleInc = () => {
    if (!availableProduct) {
      showNotification("Product out of stock");
      return;}
    dispatch({
      type: "INC",
      payload: { id, quantity: quantity + 1 },
    });
  };
  const handleDec = () => {
    dispatch({ type: "DEC", payload: id });
  };
  return (
    <>
      {quantity ? (
        <ControlAmount
          handleDec={handleDec}
          handleInc={handleInc}
          amount={quantity}
        />
      ) : (
        <Button
          className="btn-sea"
          onClick={
            availableProduct
              ? handleAdd
              : () => showNotification("Product out of stock")
          }
        >
          <span>Add to cart</span>
        </Button>
      )}
    </>
  );
};

const ControlAmount = ({ handleDec, handleInc, amount, available = true }) => {
  const { showNotification } = useNotification();
  return (
    <div className="control-amount">
      <div
        className="btn btn-sea inc"
        onClick={
          available
            ? handleInc
            : () => {
                console.log("wow");
                showNotification("Product out of stock");
              }
        }
      >
        +
      </div>
      <div className="amount">{amount}</div>
      <div className="btn btn-red dec" onClick={handleDec}>
        -
      </div>
    </div>
  );
};

export default AddToCart;
