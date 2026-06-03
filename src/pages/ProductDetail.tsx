import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Ruler } from 'lucide-react';

const MOCK_PRODUCT = {
  id: '1', name: 'Air Jordan 1 Retro High OG', category: 'Sneakers',
  price: 349.99, cost: 180.00, sizes: ['7', '8', '9', '10', '10.5', '11', '12', '13'],
  description: 'The iconic Air Jordan 1 Retro High OG. Premium leather upper with Nike Air cushioning. A timeless silhouette that started it all. Sourced from authorized retailers — 100% authentic.',
  inStock: true,
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const product = MOCK_PRODUCT;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-8 transition">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-300">Product Image</p>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-black mb-6">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-black">Select Size</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-700 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition ${
              selectedSize
                ? added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            {added ? 'Added to Cart!' : selectedSize ? 'Add to Cart' : 'Select a Size'}
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            100% Authentic. Sourced from authorized retailers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;