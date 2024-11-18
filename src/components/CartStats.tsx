import React from 'react';
import { ShoppingCart, Calendar, Package } from 'lucide-react';
import { CartStats as CartStatsType } from '../types';

interface CartStatsProps {
  stats: CartStatsType;
}

function CartStats({ stats }: CartStatsProps) {
  const createdDate = new Date(stats.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="neo-border bg-pink-400 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full neo-border">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-black">TOTAL ITEMS</p>
            <p className="text-3xl font-black">{stats.totalItems}</p>
          </div>
        </div>
      </div>

      <div className="neo-border bg-blue-400 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full neo-border">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-black">TOTAL COST</p>
            <p className="text-3xl font-black">${stats.totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="neo-border bg-green-400 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full neo-border">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-black">CREATED AT</p>
            <p className="text-xl font-black">{createdDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartStats;