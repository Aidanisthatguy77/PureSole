import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  LogOut
} from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Navigation */}
        <aside className="space-y-1">
          {[
            { icon: User, label: 'Profile Information', active: true },
            { icon: Lock, label: 'Security & Auth', active: false },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Shield, label: 'Legal & Compliance', active: false },
            { icon: CreditCard, label: 'Billing & Tiers', active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center justify-between px-6 py-4 text-xs font-black uppercase tracking-widest transition-all border ${
                item.active ? 'bg-black text-white border-black' : 'text-gray-400 hover:text-black border-transparent hover:border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.active && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
          <div className="pt-8">
            <button className="w-full flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest text-red-600 border border-transparent hover:border-red-100 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" /> Terminate Session
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Profile Section */}
          <section className="space-y-8">
            <h3 className="text-xl font-black uppercase tracking-tighter border-b border-black pb-4">Profile Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
                  <input type="text" className="w-full border border-black p-3 text-sm focus:outline-none" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                  <input type="text" className="w-full border border-black p-3 text-sm focus:outline-none" defaultValue="User" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Business Email</label>
                <input type="email" className="w-full border border-black p-3 text-sm focus:outline-none" defaultValue="hq@puresole.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Timezone</label>
                <select className="w-full border border-black p-3 text-sm focus:outline-none bg-white rounded-none appearance-none">
                  <option>PST (UTC-8:00)</option>
                  <option>EST (UTC-5:00)</option>
                  <option>UTC (Coordinated Universal Time)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Password Change */}
          <section className="space-y-8">
            <h3 className="text-xl font-black uppercase tracking-tighter border-b border-black pb-4">Security</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-black p-3 text-sm focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-black p-3 text-sm focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-black p-3 text-sm focus:outline-none" />
              </div>
            </div>
            
            <button className="bg-black text-white px-10 py-4 font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all">
              Save Changes
            </button>
          </section>

          {/* Help Footer */}
          <section className="pt-12 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <HelpCircle className="w-4 h-4" /> Need assistance?
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1">
              Contact HQ Support
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
