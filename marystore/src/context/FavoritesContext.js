// src/context/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.find(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}