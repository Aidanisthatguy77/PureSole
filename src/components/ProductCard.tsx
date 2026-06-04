import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 border border-black relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-[10px] uppercase tracking-tighter">
          {category}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-black uppercase tracking-tight">
            {name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 uppercase tracking-widest">
            Authentication Guaranteed
          </p>
        </div>
        <p className="text-sm font-black text-black">
          ${price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
