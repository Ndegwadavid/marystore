import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Checkout = () => {
  const { cart, setCart } = useAppContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [mpesaInstructionsOpen, setMpesaInstructionsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mpesaNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { ...formData, cart, paymentMethod });
    alert('Thank you for your order!');
    setCart([]);
    navigate('/');
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const inputClasses = "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block mb-1 font-semibold";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div initial={{ x: -50 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClasses}>Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputClasses} />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClasses} />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ x: 50 }} animate={{ x: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className={labelClasses}>Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClasses}>City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required className={inputClasses} />
              </div>
              <div>
                <label htmlFor="zipCode" className={labelClasses}>ZIP Code</label>
                <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className={inputClasses} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center px-4 py-2 rounded-full ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              <CreditCard className="mr-2" size={20} />
              Credit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('mpesa')}
              className={`flex items-center px-4 py-2 rounded-full ${paymentMethod === 'mpesa' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              <Smartphone className="mr-2" size={20} />
              M-Pesa
            </button>
          </div>

          {paymentMethod === 'card' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className={labelClasses}>Card Number</label>
                <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required className={inputClasses} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className={labelClasses}>Expiry Date</label>
                  <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required placeholder="MM/YY" className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="cvv" className={labelClasses}>CVV</label>
                  <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required className={inputClasses} />
                </div>
              </div>
            </motion.div>
          )}

          {paymentMethod === 'mpesa' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label htmlFor="mpesaNumber" className={labelClasses}>M-Pesa Number</label>
                <input type="text" id="mpesaNumber" name="mpesaNumber" value={formData.mpesaNumber} onChange={handleInputChange} required className={inputClasses} />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setMpesaInstructionsOpen(!mpesaInstructionsOpen)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  {mpesaInstructionsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  <span className="ml-2">Payment Instructions</span>
                </button>
                {mpesaInstructionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-4 bg-gray-100 rounded-lg"
                  >
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Go to M-Pesa on your phone</li>
                      <li>Select "Send Money"</li>
                      <li>Enter the business number: 123456</li>
                      <li>Enter the amount: ${total.toFixed(2)}</li>
                      <li>Enter your M-Pesa PIN</li>
                      <li>You will receive a confirmation SMS</li>
                    </ol>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 bg-gray-100 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Place Order
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Checkout;