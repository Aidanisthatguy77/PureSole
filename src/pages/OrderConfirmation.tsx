import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-black text-white rounded-none flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>
        </div>
        
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Order Confirmed</h1>
        <p className="text-gray-500 uppercase text-xs tracking-[0.2em] mb-12">
          Order #{id} &bull; We've sent a confirmation email to you.
        </p>

        <div className="bg-gray-50 border border-black p-8 text-left mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-black pb-4">Next Steps</h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <Package className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-tight mb-1">Authentication</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide leading-relaxed">
                  Your items are being shipped to our center for professional authentication.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Truck className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-tight mb-1">Express Shipping</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide leading-relaxed">
                  Once verified, we'll ship your order via DHL Express. You'll receive a tracking number.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Calendar className="w-6 h-6 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-tight mb-1">Estimated Delivery</h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide leading-relaxed">
                  3-5 Business Days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/products" 
            className="bg-black text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all flex items-center justify-center"
          >
            Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <button className="border border-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            Track Order
          </button>
        </div>
        
        <div className="mt-20 pt-12 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-loose">
            Questions about your order? Contact our support team at support@puresole.com<br />
            Our specialists are available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
