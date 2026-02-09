import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');

    const fetchProducts = async (searchKeyword = '') => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/menu?keyword=${searchKeyword}`);
            setProducts(data.menuItems);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(keyword);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex justify-center">
                <form onSubmit={handleSearch} className="flex w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search for coffee..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-yellow-600 text-white px-6 py-2 rounded-r-md hover:bg-yellow-700 transition"
                    >
                        Search
                    </button>
                </form>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Menu</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
