import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./styles/orderDetail.css";

import Loading from "../components/utils/Loading";
import Button from "../components/forms/Button.js";
import useOrders from "../hooks/useOrders";
import OrderTable from "../components/orders/OrderTable";

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
        console.log(order);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [id, navigate]);

  const handleReactivateOrder = async (orderId) => {
    try {
      await reactivateOrder(orderId);
    } catch (error) {
      console.error("Error reactivating order:", error);
      alert("Failed to reactivate the order.");
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await updateOrder(order._id, updatedDetails);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update the order.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <div className="no-order">Order not found.</div>;
  }

  return (
    <div className="order-detail">
      <h1>Order Details</h1>
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

      <h2>Products</h2>
      {console.log(order.products)}
      <OrderTable
        order={order.products}
        setUpdatedDetails={setUpdatedDetails}
        updatedDetails={updatedDetails}
      />
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
              onClick={() => deleteOrder(order._id)}
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
