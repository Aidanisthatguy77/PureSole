import React, { useState } from 'react';
import { ExternalLink, Plus, X, ShoppingBag } from 'lucide-react';

const DEFAULT_BRANDS = [
  { name: 'Nike', url: 'https://www.nike.com', color: 'bg-black' },
  { name: 'Adidas', url: 'https://www.adidas.com', color: 'bg-green-700' },
  { name: 'Foot Locker', url: 'https://www.footlocker.com', color: 'bg-red-600' },
  { name: 'StockX', url: 'https://stockx.com', color: 'bg-gray-700' },
  { name: 'GOAT', url: 'https://www.goat.com', color: 'bg-amber-800' },
  { name: 'Champs Sports', url: 'https://www.champssports.com', color: 'bg-blue-700' },
  { name: 'JD Sports', url: 'https://www.jdsports.com', color: 'bg-red-700' },
  { name: 'Hibbett', url: 'https://www.hibbett.com', color: 'bg-orange-600' },
  { name: 'DSW', url: 'https://www.dsw.com', color: 'bg-yellow-700' },
  { name: 'Finish Line', url: 'https://www.finishline.com', color: 'bg-blue-600' },
];

const AdminBrands: React.FC = () => {
  const [brands, setBrands] = useState(DEFAULT_BRANDS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [color, setColor] = useState('bg-gray-800');

  const addBrand = () => {
    if (!newName || !newUrl) return;
    setBrands(prev => [...prev, { name: newName, url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`, color }]);
    setNewName('');
    setNewUrl('');
    setShowForm(false);
  };

  const removeBrand = (index: number) => {
    if (index < DEFAULT_BRANDS.length) return; // Can't remove defaults
    setBrands(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Brand Quick Links</h1>
          <p className="text-gray-500 mt-1">One-click access to your sourcing retailers</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
        >
          <Plus className="h-4 w-4" /> Add Brand
        </button>
      </div>

      {/* Add Brand Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-black">Add New Brand</h3>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
              <input
                type="text" value={newName} onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Sneaker King"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)}
                placeholder="e.g. sneakerking.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select value={color} onChange={e => setColor(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                <option value="bg-gray-800">Gray</option>
                <option value="bg-black">Black</option>
                <option value="bg-blue-600">Blue</option>
                <option value="bg-red-600">Red</option>
                <option value="bg-green-700">Green</option>
                <option value="bg-amber-800">Amber</option>
                <option value="bg-purple-700">Purple</option>
              </select>
            </div>
          </div>
          <button onClick={addBrand}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
            Add Brand
          </button>
        </div>
      )}

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map((brand, i) => (
          <div key={i} className="group relative">
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${brand.color} text-white rounded-lg p-6 flex items-center gap-4 hover:opacity-90 transition block`}
            >
              <ShoppingBag className="h-8 w-8 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-lg">{brand.name}</p>
                <p className="text-sm opacity-75 truncate">{brand.url.replace('https://', '')}</p>
              </div>
              <ExternalLink className="h-5 w-5 shrink-0 opacity-50" />
            </a>
            {i >= DEFAULT_BRANDS.length && (
              <button
                onClick={() => removeBrand(i)}
                className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
              >
                <X className="h-3 w-3 text-red-500" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBrands;