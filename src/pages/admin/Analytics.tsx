import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Revenue (30d)</p>
          <p className="text-2xl font-bold text-black">$12,450</p>
          <span className="text-sm text-green-600">+23% vs last period</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Orders (30d)</p>
          <p className="text-2xl font-bold text-black">47</p>
          <span className="text-sm text-green-600">+12 vs last period</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Avg Order Value</p>
          <p className="text-2xl font-bold text-black">$264.89</p>
          <span className="text-sm text-green-600">+8% vs last period</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
          <p className="text-2xl font-bold text-black">3.2%</p>
          <span className="text-sm text-green-600">+0.5% vs last period</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-black mb-4">Revenue Trend</h2>
          <div className="flex items-end gap-2 h-40">
            {[210, 340, 280, 450, 390, 510, 480, 620, 550, 710, 680, 890].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-black rounded-t transition-all hover:opacity-80"
                  style={{ height: `${(val / 890) * 100}%` }}
                />
                <span className="text-xs text-gray-400">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-black mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Air Jordan 1 Retro High OG', sold: 12, revenue: 4199.88 },
              { name: 'Nike Dunk Low Retro', sold: 9, revenue: 2519.91 },
              { name: 'Champion Reverse Weave Hoodie', sold: 7, revenue: 909.93 },
              { name: 'Air Force 1 White', sold: 5, revenue: 999.95 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-black text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.sold} sold</p>
                </div>
                <p className="font-bold text-black">${item.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;