
import React from 'react';
import { Product } from '../types';

interface InventoryProps {
  products: Product[];
}

const Inventory: React.FC<InventoryProps> = ({ products }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Inventory Management</h2>
          <p className="text-emerald-600">Track stock and sustainability profiles</p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-emerald-700 transition-colors">
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-emerald-50/50 border-b border-emerald-100">
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Eco Score</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Packaging</th>
              <th className="px-6 py-4 text-xs font-bold text-emerald-700 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-semibold text-emerald-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-emerald-600">{p.category}</td>
                <td className="px-6 py-4 text-emerald-900 font-medium">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${p.stock < 20 ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${p.ecoScore > 80 ? 'bg-emerald-500' : p.ecoScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${p.ecoScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-emerald-700">{p.ecoScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">{p.packaging}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
