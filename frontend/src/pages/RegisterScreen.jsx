import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const RegisterScreen = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const { register } = useAuth();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            const success = await register(username, email, password);
            if (success) {
                navigate('/');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            {message && <Message variant="danger">{message}</Message>}
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter name"
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Register
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                    Have an account?{' '}
                    <Link to="/login" className="text-yellow-600 hover:text-yellow-800 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;
