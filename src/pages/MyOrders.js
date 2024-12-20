// MyOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../lib/Constants';


import Loading from '../components/utils/Loading.js';
import Button from '../components/forms/Button.js';

import './styles/myOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        
        const fetchOrders = async () => {  
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`${API_BASE_URL}/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); 
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);

   
    

    const handleViewOrder = (orderId) => {
        navigate(`/orders/${orderId}`); 
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
