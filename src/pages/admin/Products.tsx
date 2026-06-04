import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Download,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const AdminProducts: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const products = [
    { id: '1', name: 'Air Jordan 1 High "Chicago"', category: 'Sneakers', price: 1200, stock: 5, status: 'Live', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100' },
    { id: '2', name: 'Off-White x Nike Dunk Low', category: 'Sneakers', price: 850, stock: 2, status: 'Live', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=100' },
    { id: '3', name: 'Supreme Box Logo Hoodie', category: 'Streetwear', price: 600, stock: 12, status: 'Draft', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=100' },
    { id: '4', name: 'Yeezy Boost 350 V2 "Zebra"', category: 'Sneakers', price: 450, stock: 0, status: 'Archived', image: 'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&q=80&w=100' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search catalog..."
            className="w-full pl-10 pr-4 py-2 border border-black text-xs uppercase tracking-widest focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white border border-black overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black bg-gray-50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 border border-gray-100 bg-gray-100 flex-shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs uppercase tracking-widest text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 text-xs font-black">${product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${product.stock === 0 ? 'text-red-600' : 'text-black'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 flex items-center w-fit gap-1 ${
                      product.status === 'Live' ? 'text-green-600 bg-green-50 border border-green-200' :
                      product.status === 'Draft' ? 'text-gray-500 bg-gray-50 border border-gray-200' :
                      'text-red-500 bg-red-50 border border-red-200'
                    }`}>
                      {product.status === 'Live' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-black transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-black transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 text-gray-400 hover:text-red-600 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-black flex justify-between items-center bg-gray-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Showing 1-4 of 156 products
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-black hover:bg-white disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-black hover:bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
