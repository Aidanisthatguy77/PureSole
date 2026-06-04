import React from 'react';
import { 
  Receipt, 
  Download, 
  Calendar, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

const Taxes: React.FC = () => {
  const taxSummary = [
    { label: 'Total Sales (YTD)', value: '$124,500.00' },
    { label: 'Withheld to Date', value: '$31,125.00', highlight: true },
    { label: 'Estimated Liability', value: '$28,450.00' },
    { label: 'Projected Refund', value: '$2,675.00' },
  ];

  const taxPayments = [
    { period: 'Q2 2026', due: '2026-06-15', amount: '$10,625.00', status: 'Upcoming' },
    { period: 'Q1 2026', due: '2026-04-15', amount: '$9,850.00', status: 'Paid' },
    { period: 'Q4 2025', due: '2026-01-15', amount: '$12,400.00', status: 'Paid' },
    { period: 'Q3 2025', due: '2025-09-15', amount: '$8,200.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-8">
      {/* Tax Engine Header */}
      <div className="bg-black text-white p-8 border border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Tax Automation Engine</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest leading-relaxed max-w-xl">
            Pure Sole automatically withholds 25% of every transaction. 
            Funds are segregated for quarterly S-Corp estimated tax payments.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Download 1099-K
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tax Summary Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-black p-8">
            <h3 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-black pb-4">Financial Status</h3>
            <div className="space-y-6">
              {taxSummary.map((item) => (
                <div key={item.label} className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase text-gray-500">{item.label}</span>
                  <span className={`text-lg font-black uppercase ${item.highlight ? 'text-black' : 'text-gray-900'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 bg-gray-50 border border-black/5 flex gap-4">
              <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
              <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Your tax withholdings are currently 100% compliant with your S-Corp filing status.
              </p>
            </div>
          </div>

          <div className="bg-white border border-black p-8">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6">Tax Documents</h3>
            <div className="space-y-2">
              {['2025_Tax_Return.pdf', 'W9_PureSole_HQ.pdf', 'S_Corp_Election_Form.pdf'].map((doc) => (
                <button key={doc} className="w-full flex justify-between items-center p-3 text-[10px] font-bold uppercase tracking-widest border border-gray-100 hover:border-black transition-all">
                  {doc}
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="lg:col-span-2 bg-white border border-black">
          <div className="p-6 border-b border-black flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest">Estimated Payment Schedule</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-yellow-600 bg-yellow-50 px-2 py-1">
                Next Due: June 15
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Tax Period</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {taxPayments.map((payment) => (
                  <tr key={payment.period}>
                    <td className="px-6 py-4 text-xs font-black uppercase">{payment.period}</td>
                    <td className="px-6 py-4 text-xs font-medium">{payment.due}</td>
                    <td className="px-6 py-4 text-xs font-black">{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 border ${
                        payment.status === 'Paid' ? 'border-green-600 text-green-600 bg-green-50' :
                        payment.status === 'Upcoming' ? 'border-yellow-600 text-yellow-600 bg-yellow-50' :
                        'border-gray-400 text-gray-400'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[10px] font-black uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all disabled:opacity-20" disabled={payment.status === 'Paid'}>
                        Pay Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-4">
              <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                Estimated payments are calculated based on your net profit after deductible business expenses. 
                Pure Sole automatically tracks these expenses to minimize your final tax bill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxes;
