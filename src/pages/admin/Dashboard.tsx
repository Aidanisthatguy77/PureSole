import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const kpis = [
    { label: 'Total Revenue', value: '$42,500.00', change: '+12.5%', trending: 'up', icon: DollarSign },
    { label: 'Total Orders', value: '156', change: '+8.2%', trending: 'up', icon: ShoppingBag },
    { label: 'Avg. Order Value', value: '$272.43', change: '-2.1%', trending: 'down', icon: TrendingUp },
    { label: 'Tax Withheld', value: '$10,625.00', change: '+12.5%', trending: 'up', icon: Users },
  ];

  const recentOrders = [
    { id: 'ORD-9982', customer: 'James Wilson', items: 2, total: '$1,800.00', status: 'Shipped' },
    { id: 'ORD-9981', customer: 'Sarah Miller', items: 1, total: '$450.00', status: 'Processing' },
    { id: 'ORD-9980', customer: 'Michael Chen', items: 3, total: '$3,200.00', status: 'Delivered' },
    { id: 'ORD-9979', customer: 'Elena Rodriguez', items: 1, total: '$120.00', status: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-black p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 border border-black/5">
                <kpi.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${kpi.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change}
                {kpi.trending === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{kpi.label}</p>
            <p className="text-2xl font-black uppercase tracking-tighter">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-black">
          <div className="p-6 border-b border-black flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest">Recent Activity</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold">{order.id}</td>
                    <td className="px-6 py-4 text-xs">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 border ${
                        order.status === 'Delivered' ? 'border-green-600 text-green-600' :
                        order.status === 'Shipped' ? 'border-blue-600 text-blue-600' :
                        order.status === 'Processing' ? 'border-yellow-600 text-yellow-600' :
                        'border-gray-400 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-black">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications / Tasks */}
        <div className="bg-white border border-black flex flex-col">
          <div className="p-6 border-b border-black">
            <h3 className="text-sm font-black uppercase tracking-widest">Operational Alerts</h3>
          </div>
          <div className="flex-1 p-6 space-y-6">
            <div className="flex gap-4 p-4 bg-yellow-50 border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase text-yellow-900 mb-1">Stock Low</p>
                <p className="text-[10px] text-yellow-700 uppercase tracking-widest leading-relaxed">
                  3 items in "Sneakers" are below threshold. Restock recommended.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-blue-50 border border-blue-200">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-900 mb-1">Tax Deadline</p>
                <p className="text-[10px] text-blue-700 uppercase tracking-widest leading-relaxed">
                  Q3 estimated tax payment due in 12 days. Total withheld: $10,625.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 border border-gray-200">
              <RefreshCcw className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-900 mb-1">Autotropolis Sync</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                  Last successful export: 2 hours ago. 4 new orders ready for sync.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-black bg-black">
            <button className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
