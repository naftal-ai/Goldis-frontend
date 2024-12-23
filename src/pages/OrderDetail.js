import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./styles/orderDetail.css";

import Loading from "../components/utils/Loading";
import Button from "../components/forms/Button.js";
import useOrders from "../hooks/useOrders";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const { fetchOrder, reactivateOrder, loading, updateOrder, deleteOrder } =
    useOrders();

  useEffect(() => {
    fetchOrder(id)
      .then((order) => {
        setOrder(order);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [id, navigate, fetchOrder]);

  const handleReactivateOrder = async (orderId) => {
    try {
      await reactivateOrder(orderId);
    } catch (error) {
      console.error("Error reactivating order:", error);
      alert("Failed to reactivate the order.");
    }
  };

  const handleUpdateOrder = async () => {
    await updateOrder(order._id, updatedDetails);
    setChanged(false);
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    navigate("/my-orders");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: newQuantity,
    }));
    setChanged(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <div className="no-order">Order not found.</div>;
  }

  const OrderData = (
    <>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total:</strong> ${order.totalPrice}
      </p>
      <p>
        <strong>Created at:</strong> {Date(order.createdAt).toString()}
      </p>
    </>
  );

  const OrderTable = () => {
    const { products } = order;
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
          {products.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                {order.status === "pending" ? (
                  <input
                    type="number"
                    value={updatedDetails[product._id] || quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                    min={1}
                    max={product.stock}
                  />
                ) : (
                  quantity
                )}
              </td>
              <td>{product.price}$</td>
              <td>
                <img src={product?.images[0]} alt="product-img" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <div className="order-detail">
      <h1>Order Details</h1>
      {OrderData}
      <h2>Products</h2>
      <OrderTable />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {order.status === "pending" && (
          <>
            {changed ? (
              <Button className="btn-checkout" onClick={handleUpdateOrder}>
                Update Order
              </Button>
            ) : (
              <Button
                className="btn-checkout"
                onClick={() => handleReactivateOrder(order._id)}
              >
                Reactivate
              </Button>
            )}

            <Button
              className="btn-delete"
              onClick={() => handleDeleteOrder(order._id)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
