import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import CartScreen from './pages/CartScreen';
import ProfileScreen from './pages/ProfileScreen';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
};

export default App;
