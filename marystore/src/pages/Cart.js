import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="w-8 text-center">{item.quantity}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-600 mt-2"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        <AnimatePresence>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl">Total:</span>
          <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link
            to="/products"
            className="px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-md text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;