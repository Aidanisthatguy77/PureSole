import React, { useState } from 'react';
import { Lock, Key, Shield, Bot } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [claudeKey, setClaudeKey] = useState('');

  const saveClaudeKey = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key: 'claude_api_key', value: claudeKey })
      });
      alert('Claude API key saved! The AI Agent will now use Claude.');
    } catch (e) {
      alert('Error saving key. Make sure the server is running.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Settings</h1>

      <div className="max-w-2xl space-y-8">
        {/* Password Change */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-gray-400" />
            <h2 className="font-bold text-black text-lg">Change Password</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <button className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
              Update Password
            </button>
          </div>
        </div>

        {/* Claude AI Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-6 w-6 text-gray-400" />
            <h2 className="font-bold text-black text-lg">AI Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Claude API Key</label>
              <input
                type="password"
                value={claudeKey}
                onChange={e => setClaudeKey(e.target.value)}
                placeholder="sk-ant-xxxxxxxxxxxx"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-400 mt-1">
                Get your key at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com</a>
              </p>
            </div>
            <button onClick={saveClaudeKey} className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition text-sm">
              Save Claude Key
            </button>
          </div>
        </div>

        {/* Security Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-gray-400" />
            <h2 className="font-bold text-black text-lg">Security</h2>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-800 font-medium">JWT authentication active</p>
              <p className="text-xs text-green-600">Sessions expire after 24 hours. Admin panel at secret path.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;