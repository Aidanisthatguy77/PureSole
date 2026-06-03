import React from 'react';
import { TrendingUp, CreditCard, BarChart3 } from 'lucide-react';

const AdminFinancial: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Financial Freedom Module</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">S-Corp Status</p>
              <p className="text-lg font-bold text-green-600">Not Elected</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Revenue milestone: $50,000+ per year to consider S-Corp election. Currently tracking at $12,450.</p>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div className="bg-black rounded-full h-2" style={{ width: '25%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">$12,450 / $50,000 (25%)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Business Credit</p>
              <p className="text-lg font-bold text-black">Building</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Open a business credit card to start building credit history. Use it for sourcing, pay it off immediately.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Profit Tracking</p>
              <p className="text-lg font-bold text-black">$5,237.50</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Total profit after cost of goods and tax withholding.</p>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-black">Recent Expenses</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { desc: 'Shipping supplies', cat: 'Operations', amount: 45.99, date: '2025-06-01' },
              { desc: 'Website domain', cat: 'Software', amount: 14.99, date: '2025-05-15' },
              { desc: 'Product sourcing trip', cat: 'Travel', amount: 120.00, date: '2025-05-10' },
            ].map((exp, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-black">{exp.desc}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{exp.cat}</td>
                <td className="px-6 py-4 text-black">${exp.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFinancial;