import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ReservationListScreen = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/reservations');
            setReservations(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const updateStatusHandler = async (id, status) => {
        if (window.confirm(`Are you sure you want to mark this as ${status}?`)) {
            try {
                await axios.put(`/reservations/${id}`, { status });
                toast.success(`Reservation ${status}`);
                fetchReservations();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Reservations</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USER</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE & TIME</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">GUESTS</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TABLE</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((res) => (
                                    <tr key={res._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{res._id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{res.user && res.user.username}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(res.date).toLocaleString()}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{res.guestCount}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{res.tableNumber || 'Any'}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${res.status === 'Confirmed' ? 'bg-green-100 text-green-800' : res.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex space-x-2">
                                                {res.status !== 'Confirmed' && (
                                                    <button
                                                        onClick={() => updateStatusHandler(res._id, 'confirmed')}
                                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                                        title="Confirm"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}
                                                {res.status !== 'Cancelled' && (
                                                    <button
                                                        onClick={() => updateStatusHandler(res._id, 'cancelled')}
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationListScreen;
