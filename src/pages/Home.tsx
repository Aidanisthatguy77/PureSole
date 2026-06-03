import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, TrendingUp, Wallet, BarChart3 } from 'lucide-react';

const MOCK_FEATURED = [
  { id: '1', name: 'Air Jordan 1 Retro High OG', category: 'Sneakers', price: 349.99, sizes: '7-14' },
  { id: '2', name: 'Nike Dunk Low Retro', category: 'Sneakers', price: 279.99, sizes: '6-13' },
  { id: '3', name: 'Champion Reverse Weave Hoodie', category: 'Apparel', price: 129.99, sizes: 'S-3XL' },
  { id: '4', name: 'New Era 59FIFTY Cap', category: 'Accessories', price: 54.99, sizes: 'OSFM' },
];

const Home: React.FC = () => {
  return (
    <div>
      {/* Disclaimer Banner */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            Pure Sole is an independent personal shopping service. We are not affiliated with Nike, Adidas, Foot Locker, 
            or any brand. All products sourced from authorized retailers.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Premium Sneaker &<br />
              Streetwear Service
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Curated, authenticated, and sourced from authorized retailers. 
              Skip the hunt — buy with confidence from your personal boutique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Shop Collection <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="h-10 w-10 mx-auto mb-4 text-black" />
              <h3 className="font-bold text-lg mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600 text-sm">Every product sourced from authorized retailers. No fakes, ever.</p>
            </div>
            <div className="text-center p-6">
              <TrendingUp className="h-10 w-10 mx-auto mb-4 text-black" />
              <h3 className="font-bold text-lg mb-2">Curated Collection</h3>
              <p className="text-gray-600 text-sm">Hand-picked sneakers and streetwear you won't find everywhere.</p>
            </div>
            <div className="text-center p-6">
              <BarChart3 className="h-10 w-10 mx-auto mb-4 text-black" />
              <h3 className="font-bold text-lg mb-2">Direct From You</h3>
              <p className="text-gray-600 text-sm">Buy from a real person building a brand, not a faceless marketplace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-black">Featured</h2>
            <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_FEATURED.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Product Image</p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-semibold text-black group-hover:underline mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.sizes}</p>
                  <p className="text-lg font-bold text-black mt-2">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5" />
                <span className="text-lg font-bold">PURE SOLE</span>
              </div>
              <p className="text-gray-400 text-sm">Premium sneaker & streetwear service.</p>
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>Pure Sole is an independent personal shopping service.</p>
              <p>Not affiliated with any brand. All products sourced from authorized retailers.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pure Sole. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;