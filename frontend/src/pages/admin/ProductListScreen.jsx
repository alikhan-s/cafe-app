import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Modal & Form State
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/menu');
            setProducts(data.menuItems || data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                setLoadingDelete(true);
                await axios.delete(`/menu/${id}`);
                toast.success('Product deleted');
                setLoadingDelete(false);
                fetchProducts();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
                setLoadingDelete(false);
            }
        }
    };

    // --- MODAL HANDLERS ---

    const openCreateModal = () => {
        setIsEditMode(false);
        setEditProductId(null);
        // Reset form
        setName('');
        setPrice(0);
        setImage('');
        setCategory('');
        setDescription('');

        setShowModal(true);
    };

    const openEditModal = (product) => {
        setIsEditMode(true);
        setEditProductId(product._id);
        // Fill form
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/upload', formData, config);
            setImage(data);
            setUploading(false);
            toast.success('Image uploaded!');
        } catch (err) {
            console.error(err);
            toast.error('Image upload failed');
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingSave(true);
        try {
            const productData = {
                name,
                price,
                image,
                category,
                description,
                isAvailable: true // Default to true
            };

            if (isEditMode) {
                await axios.put(`/menu/${editProductId}`, productData);
                toast.success('Product Updated');
            } else {
                await axios.post('/menu', productData);
                toast.success('Product Created');
            }

            setLoadingSave(false);
            closeModal();
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || err.message);
            setLoadingSave(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> Create Product
                </button>
            </div>

            {loadingDelete && <Loader />}

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
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NAME</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PRICE</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CATEGORY</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product._id}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${product.price}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.category}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded border border-gray-300"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => deleteHandler(product._id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- MODAL --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

                        {/* Modal Panel */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        {isEditMode ? 'Edit Product' : 'Create Product'}
                                    </h3>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                                        <FaTimes size={20} />
                                    </button>
                                </div>

                                {loadingSave && <Loader />}

                                <form onSubmit={submitHandler}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <div className="flex flex-col space-y-2">
                                                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" placeholder="Enter image URL" />
                                                <input type="file" onChange={uploadFileHandler} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100" />
                                                {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"></textarea>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:col-start-2 sm:text-sm">
                                            {isEditMode ? 'Update' : 'Create'}
                                        </button>
                                        <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListScreen;
