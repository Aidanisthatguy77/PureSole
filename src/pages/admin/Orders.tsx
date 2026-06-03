import React from 'react';
import { Package } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD-1001', customer: 'Alex M.', items: 2, total: 579.98, tax: 145.00, profit: 254.99, status: 'pending', date: '2025-06-03' },
  { id: 'ORD-1000', customer: 'Jordan K.', items: 1, total: 349.99, tax: 87.50, profit: 82.49, status: 'shipped', date: '2025-06-02' },
  { id: 'ORD-999', customer: 'Taylor R.', items: 3, total: 429.97, tax: 107.49, profit: 187.48, status: 'delivered', date: '2025-06-01' },
  { id: 'ORD-998', customer: 'Sam W.', items: 1, total: 129.99, tax: 32.50, profit: 42.49, status: 'delivered', date: '2025-05-30' },
  { id: 'ORD-997', customer: 'Casey P.', items: 2, total: 559.98, tax: 140.00, profit: 239.98, status: 'pending', date: '2025-05-28' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

const AdminOrders: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Orders</h1>

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
            {MOCK_ORDERS.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-black">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.items}</td>
                <td className="px-6 py-4 font-medium text-black">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-amber-600">${order.tax.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">${order.profit.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status] || 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;