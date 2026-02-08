import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { userInfo, logout } = useAuth();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-yellow-600 transition">
                    Coffee Cafe
                </Link>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <Link to="/" className="text-gray-600 hover:text-yellow-600 font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="relative text-gray-600 hover:text-yellow-600">
                                <FaShoppingCart size={20} />
                                {/* Cart badge can go here */}
                            </Link>
                        </li>
                        {userInfo ? (
                            <li className="flex items-center space-x-4">
                                <span className="text-gray-800 font-semibold">Hi, {userInfo.name}</span>
                                <button
                                    onClick={logout}
                                    className="text-gray-600 hover:text-red-500 transition"
                                    title="Logout"
                                >
                                    <FaSignOutAlt size={20} />
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-yellow-600 flex items-center">
                                    <FaUser size={20} className="mr-1" /> Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
