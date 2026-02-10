import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const AdminRoute = () => {
    const { userInfo, loading } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return userInfo && userInfo.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
