import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Air Jordan 1 Retro High OG', category: 'Sneakers', price: 349.99, sizes: '7-14' },
  { id: '2', name: 'Nike Dunk Low Retro', category: 'Sneakers', price: 279.99, sizes: '6-13' },
  { id: '3', name: 'Champion Reverse Weave Hoodie', category: 'Apparel', price: 129.99, sizes: 'S-3XL' },
  { id: '4', name: 'New Era 59FIFTY Cap', category: 'Accessories', price: 54.99, sizes: 'OSFM' },
  { id: '5', name: 'Air Force 1 White', category: 'Sneakers', price: 199.99, sizes: '7-14' },
  { id: '6', name: 'Nike Tech Fleece Joggers', category: 'Apparel', price: 119.99, sizes: 'S-3XL' },
  { id: '7', name: 'Yeezy 350 V2', category: 'Sneakers', price: 449.99, sizes: '7-14' },
  { id: '8', name: 'Carhartt Beanie', category: 'Accessories', price: 34.99, sizes: 'OSFM' },
];

const Products: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Sneakers', 'Apparel', 'Accessories'];
  const filtered = MOCK_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-black mb-2">Products</h1>
      <p className="text-gray-500 mb-8">Browse our curated collection of premium sneakers and streetwear.</p>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                category === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-20">No products found.</p>
        )}
        {filtered.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
          >
            <div className="aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
              <p className="text-gray-300 text-sm">Image</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="font-semibold text-black group-hover:underline mb-1">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.sizes}</p>
              <p className="text-lg font-bold text-black mt-2">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;