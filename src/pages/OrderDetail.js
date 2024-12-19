import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/orderDetail.css"; // Assuming a CSS file for styling
import { API_BASE_URL } from "../lib/Constants";
import Loading from "../components/utils/Loading";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);
  

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
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{quantity}</td>
              <td>${product.price}</td>
              <td><img src={product?.images[0]} alt="product-image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
