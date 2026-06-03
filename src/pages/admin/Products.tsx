import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Air Jordan 1 Retro High OG', category: 'Sneakers', price: 349.99, cost: 180.00, stock: 5, status: 'live' },
  { id: '2', name: 'Nike Dunk Low Retro', category: 'Sneakers', price: 279.99, cost: 110.00, stock: 8, status: 'live' },
  { id: '3', name: 'Champion Reverse Weave Hoodie', category: 'Apparel', price: 129.99, cost: 55.00, stock: 3, status: 'live' },
  { id: '4', name: 'New Era 59FIFTY Cap', category: 'Accessories', price: 54.99, cost: 25.00, stock: 12, status: 'draft' },
  { id: '5', name: 'Air Force 1 White', category: 'Sneakers', price: 199.99, cost: 90.00, stock: 0, status: 'draft' },
];

const AdminProducts: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
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
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(product => {
              const margin = product.price - product.cost;
              const marginPct = ((margin / product.price) * 100).toFixed(0);
              return (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-black">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-black">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${product.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">${margin.toFixed(2)} ({marginPct}%)</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-black'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                      product.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-100 transition">
                        <Edit2 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 border border-gray-200 rounded hover:bg-red-50 transition">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
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