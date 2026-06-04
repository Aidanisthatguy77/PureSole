import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Products from './pages/Products';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminAnalytics from './pages/admin/Analytics';
import AdminTaxes from './pages/admin/Taxes';
import AdminFinancial from './pages/admin/Financial';
import AdminRothIRA from './pages/admin/RothIRA';
import AdminBlueprint from './pages/admin/Blueprint';
import AdminAutotropolis from './pages/admin/Autotropolis';
import AdminSettings from './pages/admin/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navigation /><Home /></>} />
        <Route path="/products" element={<><Navigation /><Products /></>} />
        <Route path="/product/:id" element={<><Navigation /><ProductDetail /></>} />
        <Route path="/cart" element={<><Navigation /><Cart /></>} />
        <Route path="/checkout" element={<><Navigation /><Checkout /></>} />
        <Route path="/order/:id" element={<><Navigation /><OrderConfirmation /></>} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="taxes" element={<AdminTaxes />} />
          <Route path="financial" element={<AdminFinancial />} />
          <Route path="roth-ira" element={<AdminRothIRA />} />
          <Route path="blueprint" element={<AdminBlueprint />} />
          <Route path="autotropolis" element={<AdminAutotropolis />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
