import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Mock product data (in a real app, this would be fetched based on id)
  const product = {
    id: id || '1',
    name: 'Air Jordan 1 High "Chicago"',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200'
    ],
    category: 'Sneakers',
    description: 'The Air Jordan 1 High "Chicago" is one of the most iconic sneakers of all time. First released in 1985, it features the legendary red, white, and black colorway of the Chicago Bulls. This premium retro version captures every detail of the original.',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    stock: 5
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-[10px] uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 border border-black overflow-hidden relative group">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 border border-black opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 border border-black opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square border overflow-hidden ${activeImage === idx ? 'border-black border-2' : 'border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="border-b border-black pb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-bold">${product.price.toLocaleString()}</p>
            </div>

            <div className="py-8 space-y-8 border-b border-black">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest">Select Size</h3>
                  <button className="text-[10px] underline uppercase tracking-widest text-gray-500">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-bold border transition-all ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Quantity</h3>
                <div className="flex items-center border border-black w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button 
                className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all disabled:bg-gray-300"
                disabled={!selectedSize}
              >
                {selectedSize ? 'Add to Cart' : 'Select a Size'}
              </button>
            </div>

            {/* Product Details */}
            <div className="py-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed uppercase tracking-tight">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium">
                  <ShieldCheck className="w-5 h-5" />
                  <span>100% Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium">
                  <Truck className="w-5 h-5" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-medium">
                  <RefreshCw className="w-5 h-5" />
                  <span>Easy Returns Within 14 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
