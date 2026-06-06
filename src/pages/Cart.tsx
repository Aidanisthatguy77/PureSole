import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('puresole-cart') || '[]');
    setItems(cart);
  }, []);

  const updateCart = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem('puresole-cart', JSON.stringify(newItems));
  };

  const removeItem = (index: number) => {
    updateCart(items.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, delta: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, (newItems[index].quantity || 1) + delta);
    updateCart(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-black mb-2">Cart</h1>
      <p className="text-gray-500 mb-8">{items.length} item(s) in your cart</p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-8 w-8 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button onClick={() => updateQty(i, -1)} className="px-2.5 py-1 text-sm hover:bg-gray-100">-</button>
                      <span className="px-3 py-1 text-sm border-x border-gray-200">{item.quantity || 1}</span>
                      <button onClick={() => updateQty(i, 1)} className="px-2.5 py-1 text-sm hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => removeItem(i)} className="p-1.5 text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-bold text-black text-lg">${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h2 className="font-bold text-black text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (25%)</span>
                <span className="text-amber-600">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="block text-center w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition mt-6">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;