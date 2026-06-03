import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="border-b border-black p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">PURE SOLE</Link>
      <div className="space-x-6">
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </div>
    </nav>
  );
};

export default Navigation;
