import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
    const { userInfo } = useAuth();

    // Local state for profile form (if we were implementing update logic)
    // For now, just display info
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // Order history state
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [errorOrders, setErrorOrders] = useState(null);

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
            fetchMyOrders();
        }
    }, [userInfo]);

    const fetchMyOrders = async () => {
        try {
            setLoadingOrders(true);
            const { data } = await axios.get('/orders/my');
            setOrders(data);
            setLoadingOrders(false);
        } catch (err) {
            setErrorOrders(err.response?.data?.message || err.message);
            setLoadingOrders(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                value={username}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                            />
                        </div>
                        {/* 
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">
                            Update Profile
                        </button> 
                        */}
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                DATE
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                TOTAL
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                PAID
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                DELIVERED
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order._id.substring(0, 10)}...
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order.createdAt.substring(0, 10)}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    ${order.totalPrice}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order.isPaid ? (
                                                        <span className="text-green-600 font-bold">
                                                            {order.paidAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-600 font-bold">No</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {order.isDelivered ? (
                                                        <span className="text-green-600 font-bold">
                                                            {order.deliveredAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-600 font-bold">No</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
