import React from "react";

const OrderTable = ({ order, setUpdatedDetails, updatedDetails }) => {

  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: newQuantity,
    }));
  };
if(order){
  return (
<table className="products-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {order.map(({product, quantity}) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>
              {product.status === "pending" ? (<input
                type="number"
                value={updatedDetails[product.id] || quantity}
                onChange={(e) =>
                  handleQuantityChange(order.id, e.target.value)
                }
              />) : quantity}
            </td>
            <td>{product.price}</td>
            <td><img src={product?.images[0]} alt="product-img" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ); }
};

export default OrderTable;
