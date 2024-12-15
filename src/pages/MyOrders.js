// MyOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../lib/Constants';


import Loading from '../components/Loading.js';
import Button from '../components/Button.js';
import useAuth from '../hooks/useAuth.js';
import './styles/myOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setIsLoggedIn, isValidToken} = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');
   

    useEffect(() => {
        // Fetch user's orders from the backend
        const fetchOrders = async () => {
            if(!token || !isValidToken(token)){
                setIsLoggedIn(false)
                navigate('/login');
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if not authenticated
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleReactivateOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('jwtToken');
           let response =  await axios.post(
                `${API_BASE_URL}/orders/${orderId}/reactivate`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Order reactivation initiated. Please complete the payment.');
            window.location = response.data.sessionUrl;
            // Optionally refetch orders to update the status
            response = await axios.get(`${API_BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data)
            setOrders(response.data);
        } catch (error) {
            console.error('Error reactivating order:', error);
            alert('Failed to reactivate the order.');
        }
    };  
    

    const handleViewOrder = (orderId) => {
        navigate(`/orders/${orderId}`); // Navigate to order detail page
    };

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
                                <td className='actions'>
                                    <Button className="view-button" onClick={() => handleViewOrder(order._id)}>
                                        View
                                    </Button>
                                    {(order.status === 'pending') && (
                                        <Button
                                            className="reactivate-button"
                                            onClick={() => handleReactivateOrder(order._id)}
                                        >
                                            Reactivate
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
