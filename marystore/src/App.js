// /home/heffen/Documents/marystore/marystore/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Adjust the path as necessary
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
