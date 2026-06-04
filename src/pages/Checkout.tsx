import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Lock, Truck, CreditCard, ShieldCheck } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the API
    // Redirect to order confirmation with a mock ID
    navigate('/order/ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-12">
          <Link to="/cart" className="flex items-center text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Cart
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-12">
            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white text-xs flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <div className="border border-black p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Credit Card</span>
                  </div>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM / YY"
                        required
                        className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={formData.expiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="000"
                        required
                        className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 border border-black p-8 sticky top-24">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">In Your Bag</h2>
              
              <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white border border-black flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black uppercase leading-tight">Air Jordan 1 High "Chicago"</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Size: US 10</p>
                    <p className="text-xs font-bold mt-1">$1,200</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white border border-black flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-black uppercase leading-tight">Supreme Box Logo Hoodie</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Size: L</p>
                    <p className="text-xs font-bold mt-1">$600</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs uppercase tracking-widest border-t border-black pt-8">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">$1,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-black flex justify-between text-base font-black">
                  <span>Total</span>
                  <span>$1,800.00</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white mt-8 py-5 font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center"
              >
                Place Order
              </button>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center p-3 border border-gray-200">
                  <ShieldCheck className="w-4 h-4 mb-2" />
                  <span className="text-[8px] uppercase font-bold tracking-widest">Verified<br />Authentic</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 border border-gray-200">
                  <Truck className="w-4 h-4 mb-2" />
                  <span className="text-[8px] uppercase font-bold tracking-widest">Express<br />Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
