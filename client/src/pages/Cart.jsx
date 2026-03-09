import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cart, removeFromCart, cartTotal, clearCart } = useShop();
    const { isAuthenticated } = useAuth();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to checkout.');
            return;
        }

        if (cart.length === 0) return;

        setIsCheckingOut(true);
        try {
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }));

            await orderAPI.checkout({ items, totalAmount: cartTotal });
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Checkout failed');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-32">
                <h1 className="text-4xl font-bold gradient-text mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <h2 className="text-2xl mb-4">Your cart is empty</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <span className="text-xs font-bold">3D</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-sm text-gray-400">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="font-medium">Qty: {item.quantity}</span>
                                            <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-300 p-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-400">Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t border-gray-700 pt-4 flex justify-between font-bold text-xl mb-6">
                                <span>Total</span>
                                <span className="gradient-text">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition flex justify-center items-center"
                            >
                                {isCheckingOut ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : null}
                                {isCheckingOut ? 'Processing...' : 'Checkout Now'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
