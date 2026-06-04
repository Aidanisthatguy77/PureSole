import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Receipt, TrendingUp, Package, Users, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    orderCount: 0,
    taxWithheld: 0,
    productCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const products = await prodRes.json();
        setMetrics(prev => ({ ...prev, productCount: products.length || 0 }));

        const orderRes = await fetch('/api/orders');
        // Orders might need auth - handle gracefully
      } catch (e) {}
    };
    fetchData();
  }, []);

  const kpis = [
    { label: 'Total Revenue', value: `$${metrics.totalRevenue.toFixed(2)}`, change: 'No orders yet', icon: DollarSign },
    { label: 'Orders', value: metrics.orderCount.toString(), change: '', icon: ShoppingCart },
    { label: 'Tax Withheld (25%)', value: `$${metrics.taxWithheld.toFixed(2)}`, change: '25% auto-rate', icon: Receipt },
    { label: 'Products Listed', value: metrics.productCount.toString(), change: '', icon: Package },
    { label: 'Business Credit', value: 'Building', change: 'Use business card', icon: TrendingUp },
    { label: 'Customers', value: '0', change: '', icon: Users },
  ];

  const quickLinks = [
    { label: 'Add Product', path: '/ps-admin/products', desc: 'Add inventory to your store' },
    { label: 'Brand Quick Links', path: '/ps-admin/brands', desc: 'Nike, Adidas, Foot Locker & more' },
    { label: 'Tax Summary', path: '/ps-admin/taxes', desc: '25% auto-withhold overview' },
    { label: 'AI Agent', path: '/ps-admin/agent', desc: 'Ask Claude about your business' },
    { label: 'Sync to Autotropolis', path: '/ps-admin/autotropolis', desc: 'Export data to HQ' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Your business at a glance — start adding products and making sales!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className="h-8 w-8 text-gray-400" />
              {kpi.change && <span className="text-sm font-medium text-gray-500">{kpi.change}</span>}
            </div>
            <p className="text-2xl font-bold text-black">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="font-bold text-black mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(action => (
            <a
              key={action.label}
              href={action.path}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
            >
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-black" />
              <div>
                <p className="font-semibold text-black text-sm group-hover:underline">{action.label}</p>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;