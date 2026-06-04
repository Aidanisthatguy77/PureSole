import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
              Pure Sole
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium hover:text-gray-500 transition-colors uppercase tracking-widest">
              Shop
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {/* Optional: Add cart count badge here */}
            </Link>
            <Link to="/admin" className="p-2 border border-black hover:bg-black hover:text-white transition-all">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-black bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/products" 
              className="block px-3 py-4 text-base font-medium border-b border-gray-100 uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-4 text-base font-medium uppercase tracking-widest"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
