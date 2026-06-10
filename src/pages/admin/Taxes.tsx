import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, AlertCircle, Receipt } from 'lucide-react';

const AdminTaxes: React.FC = () => {
  const [data, setData] = useState({ totalRevenue: 0, totalTax: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes] = await Promise.all([
          fetch('/api/orders')
        ]);
        const orders = await ordersRes.json();
        if (Array.isArray(orders)) {
          const totalRev = orders.reduce((s, o) => s + (o.total || 0), 0);
          const totalTx = orders.reduce((s, o) => s + (o.taxWithheld || 0), 0);
          setData({ totalRevenue: totalRev, totalTax: totalTx });
        }
      } catch {}
    };
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-2">Taxes</h1>
      <p className="text-gray-500 mb-8">25% of every order is automatically withheld for taxes.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <DollarSign className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-black">${data.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <AlertCircle className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Tax Withheld (25%)</p>
          <p className="text-3xl font-bold text-black">${data.totalTax.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Calendar className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Next Quarterly Payment</p>
          <p className="text-3xl font-bold text-black">$0.00</p>
          <p className="text-sm text-gray-400 mt-1">No sales yet</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-black">Quarterly Breakdown</h2>
        </div>
        <div className="p-12 text-center text-gray-400">
          <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-200" />
          <p className="font-medium">No tax data yet</p>
          <p className="text-sm mt-1">Tax withholding will appear here once orders come in</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-black mb-2">How Tax Withholding Works</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Every order automatically sets aside 25% of the total into your tax bucket. 
          When quarterly taxes are due, the money is ready. No surprises.
        </p>
      </div>
    </div>
  );
};

export default AdminTaxes;