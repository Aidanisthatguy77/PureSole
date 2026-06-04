import React from 'react';
import { BarChart3 } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">Analytics</h1>
      <p className="text-gray-500 mb-8">Revenue and performance data will appear once you start making sales.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Revenue</p>
          <p className="text-2xl font-bold text-black">$0.00</p>
          <span className="text-sm text-gray-400">No sales yet</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Orders</p>
          <p className="text-2xl font-bold text-black">0</p>
          <span className="text-sm text-gray-400">No orders yet</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Avg Order Value</p>
          <p className="text-2xl font-bold text-black">$0.00</p>
          <span className="text-sm text-gray-400">—</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
          <p className="text-2xl font-bold text-black">0%</p>
          <span className="text-sm text-gray-400">—</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
        <BarChart3 className="h-16 w-16 mx-auto text-gray-200 mb-4" />
        <p className="text-gray-400 font-medium">No data to display yet</p>
        <p className="text-sm text-gray-400 mt-1">Analytics will populate as orders come in</p>
      </div>
    </div>
  );
};

export default AdminAnalytics;