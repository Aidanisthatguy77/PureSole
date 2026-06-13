import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, X } from 'lucide-react';
import { getToken } from '../../lib/auth';

interface Product {
  id: string; name: string; category: string; description?: string;
  price: number; cost: number; stock: number; status: string; sizes?: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Sneakers', price: '', cost: '', stock: '0', sizes: '', description: '', status: 'draft' });
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    fetch('/api/products').then(r => r.json()).then(setProducts).catch(() => {});
  };

  useEffect(() => { loadProducts(); }, []);

  const addProduct = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      const token = getToken();
      const sizes = form.sizes.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          price: parseFloat(form.price),
          cost: parseFloat(form.cost || '0'),
          stock: parseInt(form.stock || '0'),
          sizes,
          description: form.description,
          status: form.status
        })
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ name: '', category: 'Sneakers', price: '', cost: '', stock: '0', sizes: '', description: '', status: 'draft' });
        loadProducts();
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || 'Failed to create product'));
      }
    } catch (e) {
      alert('Could not connect to server');
    }
    setSaving(false);
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Products</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Search products..." value={search}
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
              <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                <p className="font-medium">No products yet</p>
                <p className="text-sm mt-1">Click "Add Product" to start building your inventory</p>
              </td></tr>
            )}
            {filtered.map(product => {
              const margin = (product.price || 0) - (product.cost || 0);
              const marginPct = product.price > 0 ? ((margin / product.price) * 100).toFixed(0) : '0';
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-black">${product.price?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${product.cost?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">${margin.toFixed(2)} ({marginPct}%)</td>
                  <td className="px-6 py-4"><span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-black'}`}>{product.stock}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${product.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{product.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-black text-lg">Add Product</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Air Jordan 1 Retro High OG"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                    <option>Sneakers</option><option>Apparel</option><option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="draft">Draft</option><option value="live">Live</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    placeholder="349.99"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                  <input type="number" step="0.01" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})}
                    placeholder="180.00"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
                  <input type="text" value={form.sizes} onChange={e => setForm({...form, sizes: e.target.value})}
                    placeholder="7, 8, 9, 10, 11"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={3} placeholder="Product description..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={addProduct} disabled={saving || !form.name || !form.price}
                className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:bg-gray-300 transition">
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;