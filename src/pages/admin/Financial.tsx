import React from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  Download,
  Filter
} from 'lucide-react';

const Financial: React.FC = () => {
  const metrics = [
    { label: 'Business Credit Score', value: '742', change: '+15 pts', trending: 'up' },
    { label: 'Available Credit', value: '$25,000', change: '+$5k', trending: 'up' },
    { label: 'Net Profit Margin', value: '22.4%', change: '+1.2%', trending: 'up' },
    { label: 'Operating Cash', value: '$18,420', change: '-$2k', trending: 'down' },
  ];

  const expenses = [
    { id: 'EXP-101', date: '2026-06-01', description: 'Office Rent - HQ', category: 'Fixed', amount: '$1,200.00', status: 'Deductible' },
    { id: 'EXP-102', date: '2026-06-02', description: 'Packaging Supplies', category: 'Shipping', amount: '$145.20', status: 'Deductible' },
    { id: 'EXP-103', date: '2026-06-02', description: 'Social Media Ads', category: 'Marketing', amount: '$500.00', status: 'Deductible' },
    { id: 'EXP-104', date: '2026-06-03', description: 'Inventory Acquisition', category: 'COGS', amount: '$4,200.00', status: 'Deductible' },
  ];

  return (
    <div className="space-y-8">
      {/* S-Corp Status Banner */}
      <div className="bg-white border border-black p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter mb-1">S-Corp Financial Health</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Entity Status: Active & Compliant &bull; Next Filing: April 2027</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
            Update Entity Info
          </button>
          <button className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all">
            Financial Audit
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white border border-black p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{metric.label}</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-black uppercase tracking-tighter">{metric.value}</p>
              <div className={`flex items-center text-[10px] font-bold ${metric.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
                {metric.trending === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Expense Tracking */}
        <div className="lg:col-span-2 bg-white border border-black">
          <div className="p-6 border-b border-black flex justify-between items-center bg-gray-50">
            <h3 className="text-sm font-black uppercase tracking-widest">Business Expenses</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-black hover:bg-white">
                <Search className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900">
                <Plus className="w-4 h-4" /> Log Expense
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-medium">{expense.date}</td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-tight">{expense.description}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase border border-black/10 px-2 py-0.5 bg-gray-50">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-black">{expense.amount}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1">
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-black text-center">
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">
              View All Deductions
            </button>
          </div>
        </div>

        {/* Business Credit Card Placeholder */}
        <div className="bg-white border border-black flex flex-col">
          <div className="p-8 border-b border-black bg-black text-white">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Business Credit Card</h3>
            <div className="bg-gradient-to-br from-gray-800 to-black border border-white/20 rounded-xl p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div className="w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/50 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full opacity-20 bg-[radial-gradient(circle,white,transparent)]"></div>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-widest opacity-50">Business Platinum</div>
              </div>
              <div className="text-xl font-bold tracking-[0.2em] mb-6">**** **** **** 8824</div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-40 mb-1">Card Holder</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">PURE SOLE BOUTIQUE</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-40 mb-1">Expires</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">12/29</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
              <span>Next Statement</span>
              <span>June 24, 2026</span>
            </div>
            <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
              <span>Min. Payment Due</span>
              <span>$0.00</span>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <button className="w-full py-4 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Manage Credit Line
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financial;
