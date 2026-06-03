import React from 'react';
import { Lock, Key, Shield } from 'lucide-react';

const AdminSettings: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

      <div className="max-w-2xl space-y-8">
        {/* Change Password */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-gray-400" />
            <h2 className="font-bold text-black text-lg">Change Password</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <button className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
              Update Password
            </button>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Key className="h-6 w-6 text-gray-400" />
            <h2 className="font-bold text-black text-lg">Security</h2>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800">JWT authentication enabled. Sessions expire after 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;