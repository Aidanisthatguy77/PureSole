import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

const featuredProducts = [
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
  }
];

const Home: React.FC = () => {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center border-b border-black overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            Pure Sole<br />Boutique
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-10 text-gray-600 uppercase tracking-widest">
            The ultimate operating system for sneaker and streetwear resale.
            Authenticated. Curated. Delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all flex items-center justify-center"
            >
              Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">100% Authentic</h3>
            <p className="text-gray-400 text-sm">Every item is rigorously inspected by our experts before shipping.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Instant Payouts</h3>
            <p className="text-gray-400 text-sm">Our automated financial system handles every transaction with zero friction.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Award className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Curated Selection</h3>
            <p className="text-gray-400 text-sm">Only the most sought-after grails and essential streetwear pieces.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Featured Drops</h2>
            <p className="text-gray-500 uppercase text-xs tracking-widest mt-2">Hand-picked for the community</p>
          </div>
          <Link to="/products" className="text-sm font-bold uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* About / Disclaimer */}
      <section className="py-20 border-t border-black bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">Our Commitment</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Pure Sole is more than a store. It's a complete business engine for the modern entrepreneur. 
            Every purchase automatically cascades through 11 integrated systems, ensuring financial health 
            and operational excellence for our sellers, and guaranteed authenticity for our buyers.
          </p>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose">
            Disclaimer: Pure Sole is an independent boutique. We are not affiliated with, endorsed by, or in any way officially connected with the brands we sell. All product names, logos, and brands are property of their respective owners.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Pure Sole</h3>
            <p className="text-gray-400 text-sm max-w-sm mb-6 uppercase tracking-wider leading-relaxed">
              Premium curated sneakers and streetwear. Built for the entrepreneur, authenticated for the collector.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400 uppercase tracking-wider">
              <li><Link to="/products" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Information</h4>
            <ul className="space-y-4 text-sm text-gray-400 uppercase tracking-wider">
              <li><a href="#" className="hover:text-white transition-colors">Authenticity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Pure Sole. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
