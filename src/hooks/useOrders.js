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
      console.log(error)
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
      showNotification("Failed to reactivate order", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleCheckout, reactivateOrder, loading };
};

export default useOrders;
