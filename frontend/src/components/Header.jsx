import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { userInfo, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const logoutHandler = () => {
        logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-gray-800 tracking-wide hover:text-yellow-600 transition duration-300">
                    CoffeeCafe
                </Link>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-yellow-600 font-medium transition">
                        Home
                    </Link>
                    <Link to="/reserve" className="text-gray-600 hover:text-yellow-600 font-medium transition">
                        Book a Table
                    </Link>
                    <Link to="/cart" className="relative text-gray-600 hover:text-yellow-600 transition">
                        <FaShoppingCart size={22} />
                        {/* Badge with number of items */}
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 focus:outline-none transition"
                            >
                                <FaUserCircle size={24} />
                                <span className="font-semibold capitalize">{userInfo.username}</span>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 border border-gray-100 animate-fade-in-down">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    {/* <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Orders
                                    </Link> */}

                                    {/* Admin Links */}
                                    {userInfo.role === 'admin' && (
                                        <>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <Link
                                                to="/admin/productlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to="/admin/orderlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Orders
                                            </Link>
                                            <Link
                                                to="/admin/reservationlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Reservations
                                            </Link>
                                        </>
                                    )}

                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-1 bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition shadow-md">
                            <FaUser size={16} />
                            <span>Login</span>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50" onClick={() => setIsOpen(false)}>
                            Menu
                        </Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50" onClick={() => setIsOpen(false)}>
                            Cart
                        </Link>
                        {userInfo ? (
                            <>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-yellow-50" onClick={() => setIsOpen(false)}>
                                    Profile ({userInfo.username})
                                </Link>
                                <button onClick={logoutHandler} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-yellow-600 hover:bg-yellow-50" onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;