// MyOrders.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useOrders from "../hooks/useOrders.js";

// Components
import Loading from "../components/utils/Loading.js";
import Button from "../components/forms/Button.js";

import "./styles/myOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { fetchOrders, deleteOrder, loading } = useOrders();
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.error(error));
  }, [navigate, trigger, fetchOrders]);

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    deleteOrder(orderId)
      .then(() => setTrigger(!trigger))
      .catch((error) => console.error(error));
  }
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td onClick={() => handleViewOrder(order._id)}>{order._id}</td>
                <td>{order.status}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td className="actions">
                  <Button
                    className="view-button"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    View
                  </Button>
                  {order.status === "pending" && (
                    <Button
                      className="cancel-button"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
