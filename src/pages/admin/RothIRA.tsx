import React from 'react';
import { PiggyBank, TrendingUp, Target } from 'lucide-react';

const AdminRothIRA: React.FC = () => {
  const maxContribution = 7000;
  const currentContributions = 2400;
  const progressPct = (currentContributions / maxContribution) * 100;

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Roth IRA</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <PiggyBank className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Annual Contributions</p>
          <p className="text-3xl font-bold text-black">${currentContributions}</p>
          <p className="text-sm text-gray-500 mt-1">of ${maxContribution} max</p>
          <div className="mt-4 bg-gray-100 rounded-full h-2.5">
            <div className="bg-black rounded-full h-2.5 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{progressPct.toFixed(0)}% of annual limit used</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <TrendingUp className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Estimated Growth (7%)</p>
          <p className="text-3xl font-bold text-black">$2,568</p>
          <p className="text-sm text-gray-500 mt-1">Year 1 projected value</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Target className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500">Monthly Target</p>
          <p className="text-3xl font-bold text-black">$583</p>
          <p className="text-sm text-gray-500 mt-1">Per month to max out ($200 current)</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-bold text-black mb-2">Why a Roth IRA?</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          A Roth IRA is a retirement account where your money grows completely tax free forever. 
          You pay taxes on money going IN but never on money coming OUT. 
          Pure Sole profits go in after tax, grow completely tax free, and you withdraw tax free at retirement.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <strong>Real example:</strong> Invest $200/month from Pure Sole profits starting at 18.
          Average 7% market return. By age 65 = $900,000+. From just $200/month.
        </p>
        <a
          href="https://www.fidelity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition text-sm"
        >
          Open Your Roth IRA — Fidelity
        </a>
      </div>
    </div>
  );
};

export default AdminRothIRA;