import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const MOCK_ITEMS = [
  { name: 'Air Jordan 1 Retro High OG', size: '10.5', price: 349.99, qty: 1 },
  { name: 'Champion Reverse Weave Hoodie', size: 'L', price: 129.99, qty: 1 },
];

const Checkout: React.FC = () => {
  const subtotal = MOCK_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-black text-lg mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="font-bold text-black text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {MOCK_ITEMS.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} (Size {item.size}) x{item.qty}</span>
                  <span className="text-black">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (25%)</span>
                <span className="text-amber-600">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/order/ORD-1002"
              className="block text-center w-full bg-black text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition mt-6"
            >
              Place Order
            </Link>
            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
              <Lock className="h-3 w-3" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;