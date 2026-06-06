import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('puresole-cart') || '[]');
    setItems(cart);
  }, []);

  const subtotal = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.quantity || 1), 0);
  const tax = subtotal * 0.25;
  const total = subtotal + tax;

  const placeOrder = async () => {
    if (!form.name || !form.email) return;
    setPlacing(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerAddress: `${form.address}, ${form.city}, ${form.zip}`,
          items: items.map(i => ({ id: i.id, quantity: i.quantity || 1 })),
          total
        })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('puresole-cart');
        navigate(`/order/${data.id}`);
      } else {
        alert('Error placing order: ' + (data.error || 'Unknown error'));
      }
    } catch (e) {
      alert('Could not connect to server. Make sure the backend is running.');
    }
    setPlacing(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 mb-4">Your cart is empty</p>
        <Link to="/products" className="text-black underline">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-black text-lg mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" value={form.zip} onChange={e => setForm({...form, zip: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="font-bold text-black text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 text-sm">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600">{item.name}{item.selectedSize ? ` (Size ${item.selectedSize})` : ''} x{item.quantity || 1}</span>
                  <span className="text-black">${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-black">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax (25%)</span><span className="text-amber-600">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-2">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={placeOrder} disabled={placing || !form.name}
              className="block text-center w-full bg-black text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 transition mt-6">
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
              <Lock className="h-3 w-3" /> Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;