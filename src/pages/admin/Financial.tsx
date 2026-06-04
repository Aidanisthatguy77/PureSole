import React from 'react';
import { TrendingUp, CreditCard, BarChart3 } from 'lucide-react';

const AdminFinancial: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">Financial Freedom Module</h1>
      <p className="text-gray-500 mb-8">Track your S-Corp progress, business credit, and profits.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <TrendingUp className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">S-Corp Status</p>
          <p className="text-lg font-bold text-green-600">Not Elected</p>
          <p className="text-sm text-gray-600 mt-2">Revenue milestone: $50,000+ per year to consider S-Corp election. Start making sales to track progress.</p>
          <div className="mt-4 bg-gray-100 rounded-full h-2">
            <div className="bg-black rounded-full h-2" style={{ width: '0%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">$0 / $50,000 (0%)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <CreditCard className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Business Credit</p>
          <p className="text-lg font-bold text-black">Building</p>
          <p className="text-sm text-gray-600 mt-2">Open a business credit card to start building credit history. Use it for sourcing, pay it off immediately.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <BarChart3 className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Profit Tracking</p>
          <p className="text-lg font-bold text-black">$0.00</p>
          <p className="text-sm text-gray-600 mt-2">Total profit after cost of goods and tax withholding will appear here.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-black">Expenses</h2>
        </div>
        <div className="p-12 text-center text-gray-400">
          <p className="font-medium">No expenses recorded</p>
          <p className="text-sm mt-1">Track your business expenses here for tax deductions</p>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancial;