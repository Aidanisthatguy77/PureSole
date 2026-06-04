import React from 'react';
import { 
  Target, 
  TrendingUp, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  BarChart,
  ArrowUpRight,
  Info
} from 'lucide-react';

const RothIRA: React.FC = () => {
  const currentContribution = 4500;
  const annualLimit = 7000;
  const percentage = (currentContribution / annualLimit) * 100;

  const contributions = [
    { date: '2026-06-03', amount: '$420.00', source: 'Order ORD-9982 (10% profit split)' },
    { date: '2026-05-28', amount: '$350.00', source: 'Monthly Auto-Transfer' },
    { date: '2026-05-15', amount: '$210.00', source: 'Order ORD-9975 (10% profit split)' },
    { date: '2026-05-01', amount: '$350.00', source: 'Monthly Auto-Transfer' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-black text-white p-10 border border-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-20 -mt-20 rotate-45 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Retirement Freedom</h2>
            </div>
            <p className="text-4xl font-black uppercase tracking-tighter mb-4">
              ${currentContribution.toLocaleString()} <span className="text-lg text-gray-400 font-bold">/ ${annualLimit.toLocaleString()}</span>
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-widest leading-relaxed mb-8 max-w-md">
              You have reached {percentage.toFixed(1)}% of your 2026 Roth IRA contribution limit. 
              $2,500 remaining to maximize tax-free growth.
            </p>
            
            <div className="w-full bg-white/10 h-3 rounded-none overflow-hidden mb-2">
              <div 
                className="bg-white h-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-500">
              <span>Progress</span>
              <span>Target: Max Limit</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Est. Growth (30yr)</p>
              <p className="text-2xl font-black uppercase tracking-tighter">$482,000</p>
              <div className="flex items-center text-[10px] font-bold text-green-400 mt-2">
                <TrendingUp className="w-3 h-3 mr-1" /> Tax-Free
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Monthly Avg</p>
              <p className="text-2xl font-black uppercase tracking-tighter">$750</p>
              <div className="flex items-center text-[10px] font-bold text-gray-400 mt-2">
                On Track
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* History */}
        <div className="lg:col-span-2 bg-white border border-black">
          <div className="p-6 border-b border-black flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest">Contribution History</h3>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-black px-4 py-2 hover:bg-gray-50 transition-all">
              <Calendar className="w-4 h-4" /> Export for Tax
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {contributions.map((item, i) => (
              <div key={i} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="text-xs font-bold text-gray-400 w-24 uppercase tracking-widest">{item.date}</div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-tight mb-1">{item.amount}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.source}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase">Cleared</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-black bg-gray-50 text-center">
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">
              Load Older Contributions
            </button>
          </div>
        </div>

        {/* Strategy & Settings */}
        <div className="space-y-6">
          <div className="bg-white border border-black p-8">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-black pb-4">Auto-Freedom Rule</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 mb-2">Contribution Mode</p>
                <div className="flex items-center gap-2 p-3 border border-black bg-gray-50">
                  <BarChart className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">10% Profit Split</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                Every time a sale is completed, 10% of the net profit is automatically transferred 
                to your Roth IRA brokerage account.
              </p>
              <button className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all">
                Adjust Allocation
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 flex gap-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase text-blue-900 mb-1">Did you know?</p>
              <p className="text-[10px] text-blue-700 uppercase tracking-widest leading-relaxed">
                Roth IRA contributions can be withdrawn tax-free at any time. 
                Only the earnings must stay until age 59½.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RothIRA;
