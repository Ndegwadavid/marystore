// /home/heffen/Documents/marystore/marystore/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // Ensure you have lucide-react installed

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md flex justify-between items-center p-4">
      <Link to="/" className="flex items-center">
        <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Mary Stores" className="h-8" />
        <span className="ml-2 text-lg font-bold">Mary Stores</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/products" className="text-gray-700 hover:text-blue-500">Products</Link>
        <Link to="/favorites" className="text-gray-700 hover:text-blue-500">Favorites</Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-500 flex items-center">
          <ShoppingCart className="h-6 w-6" />
          <span className="ml-1">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
