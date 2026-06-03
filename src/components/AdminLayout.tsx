import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-black p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin" className="hover:underline">Dashboard</Link>
          <Link to="/admin/products" className="hover:underline">Products</Link>
          <Link to="/admin/orders" className="hover:underline">Orders</Link>
          <Link to="/admin/analytics" className="hover:underline">Analytics</Link>
          <Link to="/admin/taxes" className="hover:underline">Taxes</Link>
          <Link to="/admin/financial" className="hover:underline">Financial</Link>
          <Link to="/admin/roth-ira" className="hover:underline">Roth IRA</Link>
          <Link to="/admin/blueprint" className="hover:underline">Blueprint</Link>
          <Link to="/admin/autotropolis" className="hover:underline">Autotropolis</Link>
          <Link to="/admin/settings" className="hover:underline">Settings</Link>
          <Link to="/" className="pt-8 text-gray-500 hover:underline">View Site</Link>
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
