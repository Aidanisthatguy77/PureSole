import React, { useState } from 'react';
import { 
  RefreshCcw, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Settings as SettingsIcon,
  CheckCircle2,
  Database,
  Upload,
  AlertCircle
} from 'lucide-react';

const Autotropolis: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Sync Status Panel */}
      <div className="bg-white border border-black overflow-hidden">
        <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6 items-center">
            <div className={`w-20 h-20 border border-black flex items-center justify-center ${isSyncing ? 'animate-spin' : ''}`}>
              <RefreshCcw className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">HQ Sync Active</h2>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3 h-3" /> System Connected
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Last Sync: 42m ago
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full md:w-auto bg-black text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync to Autotropolis HQ'}
            <Upload className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-gray-50 p-6 border-t border-black grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Pending Exports: <span className="text-black">12</span></span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Encryption: <span className="text-black">AES-256-GCM</span></span>
          </div>
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">HQ Instance: <span className="text-black underline">hq.autotropolis.os</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sync Logs */}
        <div className="bg-white border border-black">
          <div className="p-6 border-b border-black flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest">Recent Sync Logs</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Clear Logs</button>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">2026-06-03 14:05</span>
                  <span className="text-black">Exported Order Data (ORD-9982)</span>
                </div>
                <span className="text-green-600">Success</span>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white border border-black p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-black pb-4 flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" /> Sync Configuration
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest">Auto-Sync Frequency</label>
                <span className="text-[10px] font-black uppercase">Every 60 Minutes</span>
              </div>
              <input type="range" className="w-full accent-black h-1 bg-gray-100 appearance-none" />
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Export Scope</h4>
              <div className="space-y-3">
                {[
                  { label: 'Order Transactions', checked: true },
                  { label: 'Inventory Movements', checked: true },
                  { label: 'Tax Liabilities', checked: true },
                  { label: 'Operational Logs', checked: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                    <button className={`w-10 h-5 relative flex items-center px-1 transition-colors ${item.checked ? 'bg-black' : 'bg-gray-200'}`}>
                      <div className={`w-3 h-3 bg-white transition-transform ${item.checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-100 flex gap-4">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <p className="text-[10px] text-yellow-700 uppercase tracking-widest leading-relaxed">
                Modifying export scope may affect your Autotropolis analytics dashboard. 
                Synchronize carefully.
              </p>
            </div>

            <button className="w-full py-4 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Save Sync Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autotropolis;
