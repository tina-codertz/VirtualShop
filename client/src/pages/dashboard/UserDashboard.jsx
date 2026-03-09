import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { orderAPI } from '../../api/api';
import Navbar from '../../components/Navbar';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderAPI.myOrders();
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to load orders", err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-8">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto pt-32 px-6"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text">My Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-fit">
                        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                        <p className="text-gray-400">Username: <span className="text-white">{user?.username}</span></p>
                        <p className="text-gray-400">Email: <span className="text-white">{user?.email}</span></p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                        <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-400">You have no recent orders yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-blue-400">Order #{order.id}</span>
                                            <span className="text-gray-400">${Number(order.total_amount).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className={`px-2 py-1 rounded text-xs ${order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {order.status}
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs ${order.delivery_status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                                {order.delivery_status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserDashboard;
