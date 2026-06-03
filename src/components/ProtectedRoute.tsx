import React, { useState } from 'react';
import { getToken, login as storeToken } from '../lib/auth';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First try to login
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        storeToken(data.token);
        onLogin();
      } else if (res.status === 400 && data.error === 'Setup not completed') {
        // Try setup
        const setupRes = await fetch('/api/admin/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const setupData = await setupRes.json();
        if (setupRes.ok) {
          // Now login with same password
          const loginRes = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.token) {
            storeToken(loginData.token);
            onLogin();
          } else {
            setError(loginData.error || 'Login failed');
          }
        } else {
          setError(setupData.error || 'Setup failed');
        }
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-sm w-full mx-4">
        <h1 className="text-2xl font-bold text-black mb-2 text-center">Pure Sole</h1>
        <p className="text-gray-500 text-sm mb-8 text-center">Admin Panel</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your admin password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 transition text-sm"
          >
            {loading ? 'Connecting...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-6 text-center">
          First time? Enter a password to set up your admin account.
        </p>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authed, setAuthed] = useState(!!getToken());

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;