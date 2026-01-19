
import React, { useState } from 'react';
import { Product, Merchant, Branch } from '../types';

interface InventoryProps {
  products: Product[];
  activeMerchant: Merchant;
}

const Inventory: React.FC<InventoryProps> = ({ products, activeMerchant }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const branches = activeMerchant.branches || [];

  const getStockForProduct = (productId: string, branchId: string) => {
    if (branchId === 'all') {
      return branches.reduce((acc, b) => {
        const item = b.inventory?.find(i => i.productId === productId);
        return acc + (item?.quantity || 0);
      }, 0);
    }
    const branch = branches.find(b => b.id === branchId);
    return branch?.inventory?.find(i => i.productId === productId)?.quantity || 0;
  };

  const getThresholdForProduct = (productId: string, branchId: string) => {
    const branch = branchId === 'all' ? branches[0] : branches.find(b => b.id === branchId);
    return branch?.inventory?.find(i => i.productId === productId)?.minThreshold || 0;
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-heading">Multi-Location Inventory</h2>
          <p className="text-slate-500 font-medium">Manage stock across {activeMerchant.name}'s physical nodes</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
            Transfer Inventory
          </button>
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[35px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:w-96">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search catalog..." 
            className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setSelectedBranchId('all')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${selectedBranchId === 'all' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            All Locations
          </button>
          {branches.map(branch => (
            <button 
              key={branch.id}
              onClick={() => setSelectedBranchId(branch.id)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-2 ${selectedBranchId === branch.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${branch.isOnline ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
              {branch.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product SKU</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Stock Level</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Eco Footprint</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((p) => {
              const currentStock = getStockForProduct(p.id, selectedBranchId);
              const threshold = getThresholdForProduct(p.id, selectedBranchId);
              const isLow = currentStock <= threshold;

              return (
                <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 font-bold uppercase">
                         {p.image ? <img src={p.image} className="w-full h-full object-cover" alt="" /> : 'IMG'}
                      </div>
                      <div>
                        <span className="font-black text-slate-900 block leading-none mb-1">{p.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{p.category} • #{p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${isLow ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>
                      {isLow ? 'LOW STOCK' : 'OPTIMAL'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`text-xl font-black ${isLow ? 'text-rose-500' : 'text-slate-900'}`}>{currentStock}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[80px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.ecoScore}%` }} />
                      </div>
                      <span className="text-xs font-black text-slate-600">{p.ecoScore}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg">EDIT</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
