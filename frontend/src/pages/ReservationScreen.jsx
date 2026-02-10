import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const ReservationScreen = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guestCount, setGuestCount] = useState(2);
    const [tableNumber, setTableNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { userInfo } = useAuth();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);

            // Combine date and time into a single Date object string if backend expects it, 
            // OR send them as is depending on backend. 
            // Looking at backend controller: const { date, tableNumber, guestCount } = req.body;
            // 'date' usually implies a full timestamp in JS/Mongo.
            const fullDate = new Date(`${date}T${time}`);

            await axios.post('/reservations', {
                date: fullDate,
                guestCount: Number(guestCount),
                tableNumber: tableNumber ? Number(tableNumber) : undefined,
            });

            setLoading(false);
            toast.success('Reservation created successfully');
            navigate('/profile');
        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">Book a Table</h1>

            <div className="bg-white shadow-xl rounded-lg p-8">
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Number of Guests</label>
                        <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            {[...Array(10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">
                            Table Number <span className="text-sm font-normal text-gray-500">(Optional)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Any specific table?"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        {loading ? 'Booking...' : 'Book Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservationScreen;
