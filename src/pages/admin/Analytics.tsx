import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieIcon,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const stats = [
    { label: 'Gross Sales', value: '$124,500', change: '+18.2%', trending: 'up' },
    { label: 'Net Profit', value: '$31,125', change: '+14.5%', trending: 'up' },
    { label: 'Tax Liability (25%)', value: '$31,125', change: '+18.2%', trending: 'up' },
    { label: 'Customer LTV', value: '$542', change: '-3.1%', trending: 'down' },
  ];

  const topProducts = [
    { name: 'Air Jordan 1 High "Chicago"', sales: 42, revenue: '$50,400' },
    { name: 'Off-White x Nike Dunk Low', sales: 28, revenue: '$23,800' },
    { name: 'Yeezy Boost 350 V2 "Zebra"', sales: 15, revenue: '$6,750' },
    { name: 'Supreme Box Logo Hoodie', sales: 12, revenue: '$7,200' },
  ];

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex justify-between items-center bg-white border border-black p-4">
        <div className="flex gap-4">
          <button className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-black text-white">Last 30 Days</button>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-black hover:bg-gray-50">Last Quarter</button>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-black hover:bg-gray-50">Year to Date</button>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] border border-black px-4 py-2 hover:bg-gray-50">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-black p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-black uppercase tracking-tighter">{stat.value}</p>
              <div className={`flex items-center text-[10px] font-bold ${stat.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white border border-black p-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Revenue Over Time
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[8px] font-bold uppercase text-gray-400">
                <span className="w-2 h-2 bg-black"></span> Revenue
              </span>
              <span className="flex items-center gap-1 text-[8px] font-bold uppercase text-gray-400">
                <span className="w-2 h-2 bg-gray-200"></span> Last Period
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
            {[45, 62, 58, 84, 76, 92, 88, 100, 74, 68, 82, 95].map((val, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  style={{ height: `${val}%` }} 
                  className="bg-black hover:bg-gray-700 transition-all cursor-pointer"
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  ${(val * 120).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-1">
            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((m) => (
              <span key={m} className="text-[8px] font-bold text-gray-400">{m}</span>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-black p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Best Sellers
            </h3>
          </div>
          <div className="space-y-6">
            {topProducts.map((product, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-tight">{product.name}</span>
                  <span className="text-xs font-black">{product.revenue}</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div 
                    className="bg-black h-full" 
                    style={{ width: `${(product.sales / 42) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.sales} units sold</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
