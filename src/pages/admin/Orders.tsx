import React from 'react';
import { 
  Search, 
  Filter, 
  Truck, 
  CheckCircle, 
  Clock, 
  MoreHorizontal, 
  FileText,
  Package
} from 'lucide-react';

const AdminOrders: React.FC = () => {
  const orders = [
    { id: 'ORD-9982', date: '2026-06-03 14:22', customer: 'James Wilson', email: 'j.wilson@example.com', total: '$1,800.00', status: 'Shipped', items: 2 },
    { id: 'ORD-9981', date: '2026-06-03 12:45', customer: 'Sarah Miller', email: 'sarah.m@testmail.com', total: '$450.00', status: 'Processing', items: 1 },
    { id: 'ORD-9980', date: '2026-06-02 21:10', customer: 'Michael Chen', email: 'mchen88@web.com', total: '$3,200.00', status: 'Delivered', items: 3 },
    { id: 'ORD-9979', date: '2026-06-02 18:30', customer: 'Elena Rodriguez', email: 'elena.rod@provider.net', total: '$120.00', status: 'Pending', items: 1 },
    { id: 'ORD-9978', date: '2026-06-02 16:15', customer: 'David Thompson', email: 'dt.sneakers@outlook.com', total: '$850.00', status: 'Shipped', items: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, customers, IDs..."
            className="w-full pl-10 pr-4 py-2 border border-black text-xs uppercase tracking-widest focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" /> Filter By Status
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-black overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black bg-gray-50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Order</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Items</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Total</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-tight">{order.id}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-tight">{order.customer}</span>
                      <span className="text-[10px] text-gray-400">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold">{order.items} items</td>
                  <td className="px-6 py-4 text-xs font-black">{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 border flex items-center gap-1 ${
                        order.status === 'Delivered' ? 'border-green-600 text-green-600 bg-green-50' :
                        order.status === 'Shipped' ? 'border-blue-600 text-blue-600 bg-blue-50' :
                        order.status === 'Processing' ? 'border-yellow-600 text-yellow-600 bg-yellow-50' :
                        'border-gray-400 text-gray-400 bg-gray-50'
                      }`}>
                        {order.status === 'Delivered' ? <CheckCircle className="w-3 h-3" /> : 
                         order.status === 'Shipped' ? <Truck className="w-3 h-3" /> :
                         order.status === 'Processing' ? <Package className="w-3 h-3" /> :
                         <Clock className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest border border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
                        <FileText className="w-3 h-3" /> Details
                      </button>
                      <button className="p-1 hover:bg-gray-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
