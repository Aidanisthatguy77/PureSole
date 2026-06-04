import React, { useState, useEffect } from 'react';
import { Plus, Search, Package } from 'lucide-react';

interface Product {
  id: string; name: string; category: string;
  price: number; cost: number; stock: number; status: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).catch(() => {});
  }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Products</h1>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text" placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Cost</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Margin</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                  <p className="font-medium">No products yet</p>
                  <p className="text-sm mt-1">Click "Add Product" to start building your inventory</p>
                </td>
              </tr>
            )}
            {filtered.map(product => {
              const margin = product.price - product.cost;
              const marginPct = product.price > 0 ? ((margin / product.price) * 100).toFixed(0) : '0';
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-black">${product.price?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${product.cost?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">${margin.toFixed(2)} ({marginPct}%)</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-black'}`}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                      product.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>{product.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;