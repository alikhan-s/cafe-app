import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const CartScreen = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    // Hardcoded for now, can be dynamic
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const checkoutHandler = async () => {
        if (!userInfo) {
            navigate('/login?redirect=/cart');
            return;
        }

        try {
            setLoading(true);
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price
                })),
                shippingAddress: { // Mock address for now as per requirements/context limits
                    address: '123 Coffee St',
                    city: 'Coffee City',
                    postalCode: '12345',
                    country: 'CoffeeLand'
                },
                paymentMethod: 'PayPal',
                itemsPrice: itemsPrice.toFixed(2),
                shippingPrice: shippingPrice.toFixed(2),
                taxPrice: taxPrice.toFixed(2),
                totalPrice: totalPrice,
            };

            await axios.post('/orders', orderData);

            toast.success('Order placed successfully!');
            clearCart();
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    <p>Your cart is empty. <Link to="/" className="underline">Go Back</Link></p>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                            <div>
                                                <Link to={`/product/${item._id}`} className="font-semibold text-lg hover:text-yellow-600">
                                                    {item.name}
                                                </Link>
                                                <p className="text-gray-500">${item.price}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={() => addToCart(item, -1)}
                                                    disabled={item.qty <= 1}
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="px-3 py-1 font-medium">{item.qty}</span>
                                                <button
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={() => addToCart(item, 1)}
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-500 hover:text-red-700 p-2"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Items:</span>
                                    <span>${itemsPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>${shippingPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0 || loading}
                                className={`w-full py-3 rounded-md text-white font-bold transition ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-yellow-600 hover:bg-yellow-700'
                                    }`}
                            >
                                {loading ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
