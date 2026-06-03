import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, BarChart3, Receipt,
  TrendingUp, PiggyBank, LineChart, Globe, Settings, LogOut,
  Menu, X, ChevronRight
} from 'lucide-react';
import { logout, getToken } from '../lib/auth';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/taxes', label: 'Taxes', icon: Receipt },
  { path: '/admin/financial', label: 'Financial', icon: TrendingUp },
  { path: '/admin/roth-ira', label: 'Roth IRA', icon: PiggyBank },
  { path: '/admin/blueprint', label: 'Blueprint', icon: LineChart },
  { path: '/admin/autotropolis', label: 'Autotropolis', icon: Globe },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!getToken()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-black mb-4">Admin Login</h1>
          <p className="text-gray-600 mb-6">Login required to access the admin panel.</p>
          <a
            href="/admin"
            className="block w-full text-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-black text-white transform transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-bold text-lg">Pure Sole Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 hover:bg-gray-800 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition ${
                isActive(item.path, item.end)
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {isActive(item.path, item.end) && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-gray-400 hover:bg-red-900/30 hover:text-red-300 w-full transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-6 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-black"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-black transition">
                View Store
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;