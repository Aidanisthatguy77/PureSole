import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-white border border-gray-200 rounded-lg p-12">
        <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-gray-400" />
            <span className="font-semibold text-black">Order #ORD-1002</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="text-yellow-600 font-medium">Pending</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Delivery</span>
              <span className="text-black">5-7 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="text-black">Completed</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;