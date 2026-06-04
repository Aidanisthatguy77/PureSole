import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Receipt, 
  Wallet, 
  Target, 
  Map, 
  RefreshCcw, 
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Receipt, label: 'Taxes', path: '/admin/taxes' },
    { icon: Wallet, label: 'Financial', path: '/admin/financial' },
    { icon: Target, label: 'Roth IRA', path: '/admin/roth-ira' },
    { icon: Map, label: 'Blueprint', path: '/admin/blueprint' },
    { icon: RefreshCcw, label: 'Autotropolis', path: '/admin/autotropolis' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin'); // This will trigger ProtectedRoute redirect
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-black flex flex-col">
        <div className="p-6 border-b border-black">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase flex items-center justify-between">
            Pure Sole <span className="text-[10px] bg-black text-white px-2 py-0.5 ml-2">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Storefront
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-black flex items-center justify-between px-8 bg-white">
          <h2 className="text-sm font-black uppercase tracking-widest">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase">Administrator</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">HQ Session Active</p>
            </div>
            <div className="w-8 h-8 bg-black"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
