import React from 'react';
import { Package } from 'lucide-react';

const AdminOrders: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">Orders</h1>
      <p className="text-gray-500 mb-8">Orders will appear here once customers start purchasing.</p>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tax (25%)</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Profit</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td colSpan={8} className="text-center py-16 text-gray-400">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                <p className="font-medium">No orders yet</p>
                <p className="text-sm mt-1">Orders will show up here after customers checkout</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;