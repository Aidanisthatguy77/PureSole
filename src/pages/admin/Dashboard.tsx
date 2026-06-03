import React from 'react';
import { DollarSign, ShoppingCart, Receipt, TrendingUp, Package, Users } from 'lucide-react';

const MOCK_KPIS = [
  { label: 'Total Revenue', value: '$12,450.00', change: '+23%', icon: DollarSign },
  { label: 'Today Revenue', value: '$890.00', change: '+12%', icon: TrendingUp },
  { label: 'Orders', value: '47', change: '+8', icon: ShoppingCart },
  { label: 'Tax Withheld', value: '$3,112.50', change: '25% rate', icon: Receipt },
  { label: 'Products Live', value: '24', change: '6 drafts', icon: Package },
  { label: 'Repeat Customers', value: '62%', change: '+5%', icon: Users },
];

const MOCK_ORDERS = [
  { id: '#1001', customer: 'Alex M.', items: 2, total: 579.98, status: 'pending', date: 'Today' },
  { id: '#1000', customer: 'Jordan K.', items: 1, total: 349.99, status: 'shipped', date: 'Yesterday' },
  { id: '#999', customer: 'Taylor R.', items: 3, total: 429.97, status: 'delivered', date: '2 days ago' },
  { id: '#998', customer: 'Sam W.', items: 1, total: 129.99, status: 'delivered', date: '3 days ago' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {MOCK_KPIS.map(kpi => (
          <div key={kpi.label} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className="h-8 w-8 text-gray-400" />
              <span className={`text-sm font-medium ${
                kpi.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'
              }`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-black">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-black">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-black">{order.id} — {order.customer}</p>
                  <p className="text-sm text-gray-500">{order.items} item(s) · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">${order.total.toFixed(2)}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1 ${
                    statusColors[order.status]
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-black">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Add New Product', path: '/admin/products', desc: 'Add inventory to your store' },
              { label: 'View Orders', path: '/admin/orders', desc: 'Manage fulfillment and tracking' },
              { label: 'Tax Summary', path: '/admin/taxes', desc: '25% auto-withhold overview' },
              { label: 'Sync to Autotropolis', path: '/admin/autotropolis', desc: 'Export data to HQ' },
            ].map(action => (
              <a
                key={action.label}
                href={action.path}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
              >
                <p className="font-semibold text-black group-hover:underline">{action.label}</p>
                <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;