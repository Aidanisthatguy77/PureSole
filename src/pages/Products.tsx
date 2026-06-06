import React, { useState, useEffect } from 'react';
import { Search, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).catch(() => {});
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filtered = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-black mb-2">Products</h1>
      <p className="text-gray-500 mb-8">Browse our curated collection of premium sneakers and streetwear.</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text" placeholder="Search products..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                category === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>{cat}</button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
          <Package className="h-16 w-16 mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-medium">No products available</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon — new products are added regularly</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-20">No products match your search.</p>
          )}
          {filtered.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
              <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
                <Package className="h-12 w-12 text-gray-300" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.category || 'General'}</p>
                <h3 className="font-semibold text-black group-hover:underline mb-1">{product.name}</h3>
                {product.sizes && <p className="text-sm text-gray-400">
                  {Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}
                </p>}
                <p className="text-lg font-bold text-black mt-2">
                  ${product.price ? Number(product.price).toFixed(2) : '0.00'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;