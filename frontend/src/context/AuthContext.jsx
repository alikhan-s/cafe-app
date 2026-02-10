import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/auth/login', { email, password });
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            const { data } = await axios.post('/auth/register', { username, email, password });
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        toast.info('Logged out successfully');
    };

    const updateUser = (userData) => {
        setUserInfo(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const value = {
        userInfo,
        loading,
        login,
        register,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
