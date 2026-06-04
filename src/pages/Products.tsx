import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ChevronDown } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Air Jordan 1 High "Chicago"',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Sneakers'
  },
  {
    id: '2',
    name: 'Off-White x Nike Dunk Low',
    price: 850,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Sneakers'
  },
  {
    id: '3',
    name: 'Supreme Box Logo Hoodie',
    price: 600,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    category: 'Streetwear'
  },
  {
    id: '4',
    name: 'Yeezy Boost 350 V2 "Zebra"',
    price: 450,
    image: 'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&q=80&w=800',
    category: 'Sneakers'
  },
  {
    id: '5',
    name: 'Nike Travis Scott SB Dunk Low',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Sneakers'
  },
  {
    id: '6',
    name: 'Fear of God Essentials Hoodie',
    price: 250,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    category: 'Streetwear'
  }
];

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Collection</h1>
          <p className="mt-2 text-gray-500 uppercase text-xs tracking-[0.2em]">Browse our curated selection of grails</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-black py-4 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH PRODUCTS..."
              className="w-full pl-10 pr-4 py-2 border border-black focus:outline-none text-xs uppercase tracking-widest"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <select
                className="w-full appearance-none bg-white border border-black px-4 py-2 pr-10 text-xs uppercase tracking-widest focus:outline-none rounded-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Streetwear">Streetwear</option>
                <option value="Accessories">Accessories</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
            <button className="flex items-center gap-2 border border-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm">No products found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-4 text-black border-b border-black font-bold uppercase text-xs pb-1"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
