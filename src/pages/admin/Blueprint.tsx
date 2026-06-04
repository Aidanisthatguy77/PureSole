import React from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Lock, 
  ArrowRight, 
  Award,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Blueprint: React.FC = () => {
  const roadmap = [
    {
      id: 1,
      title: 'Foundation',
      status: 'Completed',
      steps: [
        { name: 'Obtain EIN from IRS', done: true },
        { name: 'Register Single-Member LLC', done: true },
        { name: 'Open Business Bank Account', done: true },
        { name: 'Initial Inventory Sourcing', done: true },
      ]
    },
    {
      id: 2,
      title: 'Operating System',
      status: 'In Progress',
      steps: [
        { name: 'Launch Pure Sole OS', done: true },
        { name: 'Connect Autotropolis HQ Sync', done: true },
        { name: 'Set up 25% Tax Auto-Withhold', done: true },
        { name: 'Configure Roth IRA Profit Split', done: false },
      ]
    },
    {
      id: 3,
      title: 'Scale & Optimization',
      status: 'Locked',
      steps: [
        { name: 'Elect S-Corp Status (Revenue > $50k)', done: false },
        { name: 'Apply for Tier 1 Business Credit', done: false },
        { name: 'Automated Expense Reconciliation', done: false },
        { name: 'Staffing for Order Fulfillment', done: false },
      ]
    },
    {
      id: 4,
      title: 'Financial Freedom',
      status: 'Locked',
      steps: [
        { name: 'Max Out 2026 Roth IRA Contribution', done: false },
        { name: 'Establish 6-Month OpEx Runway', done: false },
        { name: 'Diversified Asset Allocation', done: false },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Business Blueprint</h2>
        <p className="text-xs text-gray-500 uppercase tracking-[0.3em] font-medium">The roadmap from enthusiast to entrepreneur</p>
      </div>

      <div className="space-y-6">
        {roadmap.map((phase, idx) => (
          <div 
            key={phase.id} 
            className={`border ${phase.status === 'Locked' ? 'border-gray-100 bg-gray-50/30' : 'border-black bg-white'} p-8 transition-all`}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <span className={`text-lg font-black w-8 h-8 flex items-center justify-center border ${
                  phase.status === 'Completed' ? 'bg-black text-white border-black' : 
                  phase.status === 'In Progress' ? 'bg-white text-black border-black border-2' : 
                  'bg-white text-gray-300 border-gray-100'
                }`}>
                  {phase.id}
                </span>
                <div>
                  <h3 className={`text-xl font-black uppercase tracking-tight ${phase.status === 'Locked' ? 'text-gray-300' : 'text-black'}`}>
                    {phase.title}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    phase.status === 'Completed' ? 'text-green-600' : 
                    phase.status === 'In Progress' ? 'text-blue-600' : 
                    'text-gray-300'
                  }`}>
                    {phase.status}
                  </span>
                </div>
              </div>
              {phase.status === 'Locked' ? <Lock className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5" />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {phase.steps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3">
                  {step.done ? (
                    <CheckCircle2 className={`w-4 h-4 ${phase.status === 'Locked' ? 'text-gray-200' : 'text-black'}`} />
                  ) : (
                    <Circle className={`w-4 h-4 ${phase.status === 'Locked' ? 'text-gray-100' : 'text-gray-300'}`} />
                  )}
                  <span className={`text-xs font-medium uppercase tracking-widest ${
                    step.done ? (phase.status === 'Locked' ? 'text-gray-200' : 'text-black') : 
                    (phase.status === 'Locked' ? 'text-gray-200' : 'text-gray-400')
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {phase.status === 'In Progress' && (
              <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest italic">
                  Complete the "Roth IRA Profit Split" to unlock Phase 3.
                </p>
                <button className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all">
                  Take Action <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-black text-white p-12 text-center border border-black overflow-hidden relative">
        <Award className="w-20 h-20 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3]" />
        <div className="relative z-10">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Master Entrepreneur Status</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] max-w-md mx-auto leading-loose">
            Reach phase 4 to achieve complete financial independence and business automation. 
            The system works so you don't have to.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
