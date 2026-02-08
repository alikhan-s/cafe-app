import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-yellow-700">{product.name}</h3>
                </Link>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition-colors duration-200">
                        <FaShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
