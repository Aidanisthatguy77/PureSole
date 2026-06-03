import React from 'react';
import { Globe, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const AdminAutotropolis: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Autotropolis HQ Sync</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Globe className="h-8 w-8 text-gray-400 mb-3" />
          <h2 className="font-bold text-black mb-2">Connection Status</h2>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Not Configured</span>
          </div>
          <p className="text-sm text-gray-500">Configure your Autotropolis endpoint and API key below to enable data sync.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Upload className="h-8 w-8 text-gray-400 mb-3" />
          <h2 className="font-bold text-black mb-2">Last Sync</h2>
          <p className="text-sm text-gray-500 mb-4">No sync has been performed yet.</p>
          <button className="w-full bg-black text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
            Sync Now to Autotropolis
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="font-bold text-black mb-4">Sync Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autotropolis Endpoint URL</label>
            <input
              type="text"
              placeholder="https://app-atvmhdbedaf5.appmedo.com/api"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
            <input
              type="password"
              placeholder="Enter your Autotropolis API key"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAutotropolis;