import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setShowLogin(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, allow 'admin' as a universal password until backend is fully ready
    if (password === 'admin' || password === 'puresole2026') {
      localStorage.setItem('admin_token', 'mock-token-' + Date.now());
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setError('Invalid administrator credentials.');
    }
  };

  if (isAuthenticated === null) return null;

  if (showLogin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 border border-white">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Pure Sole Admin</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Secure Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Admin Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="w-full border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {error && <p className="mt-2 text-red-600 text-[10px] font-bold uppercase tracking-tight">{error}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all"
            >
              Authenticate
            </button>
            
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-8">
              &copy; {new Date().getFullYear()} Pure Sole HQ &bull; v1.0.0
            </p>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
