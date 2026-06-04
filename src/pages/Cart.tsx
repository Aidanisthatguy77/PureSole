import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Air Jordan 1 High "Chicago"',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
      size: 'US 10',
      quantity: 1
    },
    {
      id: '3',
      name: 'Supreme Box Logo Hoodie',
      price: 600,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400',
      size: 'L',
      quantity: 1
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-16 h-16 mb-6 text-gray-200" />
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h1>
        <p className="text-gray-500 uppercase text-xs tracking-widest mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items List */}
          <div className="lg:col-span-8">
            <div className="border-t border-black">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-8 border-b border-gray-100 flex gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 border border-black flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-black uppercase tracking-tight">{item.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Size: {item.size}</p>
                      </div>
                      <p className="text-sm sm:text-base font-bold">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-black">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 border border-black p-8 sticky top-24">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h2>
              
              <div className="space-y-4 text-sm uppercase tracking-widest">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Tax</span>
                  <span className="font-bold">--</span>
                </div>
                
                <div className="pt-4 border-t border-black flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-black text-white mt-8 py-5 flex items-center justify-center font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all"
              >
                Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-500">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Secure SSL Encryption
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-500">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  Verified Authenticity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
