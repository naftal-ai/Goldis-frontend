import { useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../lib/Constants";
import useAuth from "./useAuth";
import useNotification from "./useNotification";
import useHandleErrors from "./useHandleErrors";

const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const { isValidToken, navigateToLogin } = useAuth();

  const { showNotification } = useNotification();
  const { handleError } = useHandleErrors();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      showNotification("Failed to fetch orders",[],  "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      showNotification("Failed to fetch order",[], "error");
    } finally {
      setLoading(false);
    }
  }

  const handleCheckout = async (orderData) => {
    setLoading(true);
    //check the token is valid
    const token = localStorage.getItem("jwtToken");
    if (!token || !isValidToken(token)) {
      navigateToLogin();
    }

    const body = { items: orderData };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, body, {
        headers: headers,
      });

      window.location = response.data.sessionUrl;
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const reactivateOrder = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `${API_BASE_URL}/orders/${orderId}/reactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location = response.data.sessionUrl;
    } catch (error) {
      console.error("Error reactivating order:", error);
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId, orderData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      await axios.put(`${API_BASE_URL}/orders/${orderId}`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("Order updated",[], "success");
    } catch (error) {
      console.error("Error updating order:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("Order deleted",[],  "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCheckout,
    reactivateOrder,
    loading,
    updateOrder,
    deleteOrder,
    fetchOrders,
    fetchOrder,
  };
};

export default useOrders;
