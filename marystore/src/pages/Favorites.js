// src/pages/Favorites.js

import React from 'react';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';

const Favorites = () => {
  const { favorites } = useAppContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-xl text-gray-600">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;