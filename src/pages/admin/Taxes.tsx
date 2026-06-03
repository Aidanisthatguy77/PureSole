import React from 'react';
import { Calendar, DollarSign, AlertCircle } from 'lucide-react';

const TAX_RATE = 0.25;
const MOCK_QUARTERS = [
  { quarter: 'Q1 2025', revenue: 4200.00, taxSetAside: 1050.00, due: 'Apr 15, 2025', paid: true },
  { quarter: 'Q2 2025', revenue: 5100.00, taxSetAside: 1275.00, due: 'Jun 15, 2025', paid: false },
  { quarter: 'Q3 2025', revenue: 3150.00, taxSetAside: 787.50, due: 'Sep 15, 2025', paid: false },
];

const AdminTaxes: React.FC = () => {
  const totalSetAside = MOCK_QUARTERS.reduce((sum, q) => sum + q.taxSetAside, 0);
  const totalRevenue = MOCK_QUARTERS.reduce((sum, q) => sum + q.revenue, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Taxes</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-6 w-6 text-gray-400" />
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
          <p className="text-3xl font-bold text-black">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-6 w-6 text-gray-400" />
            <p className="text-sm text-gray-500">Tax Withheld (25%)</p>
          </div>
          <p className="text-3xl font-bold text-black">${totalSetAside.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-6 w-6 text-gray-400" />
            <p className="text-sm text-gray-500">Next Payment Due</p>
          </div>
          <p className="text-3xl font-bold text-black">Q2 2025</p>
          <p className="text-sm text-gray-500 mt-1">Jun 15, 2025</p>
        </div>
      </div>

      {/* Quarterly Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-black">Quarterly Tax Obligations</h2>
          <p className="text-sm text-gray-500 mt-1">25% automatically withheld from each order</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Quarter</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tax Set Aside</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_QUARTERS.map(q => (
              <tr key={q.quarter} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-black">{q.quarter}</td>
                <td className="px-6 py-4 text-black">${q.revenue.toFixed(2)}</td>
                <td className="px-6 py-4 font-medium text-black">${q.taxSetAside.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{q.due}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                    q.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {q.paid ? 'Paid' : 'Upcoming'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-black mb-2">How Tax Withholding Works</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Every order automatically sets aside 25% of the total into your tax bucket. 
          When quarterly taxes are due, the money is ready. This system prevents tax 
          surprises and ensures you never scramble on April 15th (or any quarterly date).
          Your tax bucket is tracked in real-time and visible above.
        </p>
      </div>
    </div>
  );
};

export default AdminTaxes;