import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Ruler, Package } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(p => {
      setProduct(p);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>;

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <Package className="h-16 w-16 mx-auto text-gray-200 mb-4" />
      <p className="text-gray-400 font-medium">Product not found</p>
      <Link to="/products" className="text-sm text-black underline mt-2 inline-block">Back to Products</Link>
    </div>
  );

  const sizes = typeof product.sizes === 'string' ? JSON.parse(product.sizes || '[]') : (product.sizes || []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const cart = JSON.parse(localStorage.getItem('puresole-cart') || '[]');
    cart.push({ ...product, selectedSize, quantity: 1 });
    localStorage.setItem('puresole-cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-8 transition">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
          <Package className="h-20 w-20 text-gray-300" />
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{product.category || 'General'}</p>
          <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-black mb-6">
            ${product.price ? Number(product.price).toFixed(2) : '0.00'}
          </p>
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">{product.description || 'No description available.'}</p>
          </div>
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-black">Select Size</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size: string) => (
                  <button key={size} onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-lg text-sm font-medium border transition ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-700 hover:border-black'
                    }`}>{size}</button>
                ))}
              </div>
            </div>
          )}
          <button onClick={handleAddToCart} disabled={sizes.length > 0 && !selectedSize}
            className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition ${
              sizes.length > 0 && !selectedSize
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
            }`}>
            <ShoppingCart className="h-5 w-5" />
            {added ? 'Added to Cart!' : sizes.length > 0 && !selectedSize ? 'Select a Size' : 'Add to Cart'}
          </button>
          <p className="text-xs text-gray-400 mt-4 text-center">100% Authentic. Sourced from authorized retailers.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;