
import React from 'react';
import { View, UserRole, Merchant } from '../types';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
  role: UserRole;
  merchants: Merchant[];
  activeMerchantId: string;
  onContextChange: (role: UserRole, merchantId?: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onViewChange, 
  role, 
  merchants, 
  activeMerchantId, 
  onContextChange 
}) => {
  const adminNav = [
    { id: 'dashboard' as View, label: 'Super Admin', icon: ICONS.Chart },
    { id: 'merchant_mgmt' as View, label: 'Merchants', icon: ICONS.Store },
    { id: 'engagement_mgmt' as View, label: 'Engagement Suite', icon: ICONS.Megaphone },
    { id: 'device_mgmt' as View, label: 'Global Devices', icon: ICONS.Device },
    { id: 'support' as View, label: 'Support Tickets', icon: ICONS.Ticket },
  ];

  const merchantNav = [
    { id: 'dashboard' as View, label: 'Store Insights', icon: ICONS.Chart },
    { id: 'pos' as View, label: 'Till / POS', icon: ICONS.Receipt },
    { id: 'inventory' as View, label: 'Inventory', icon: ICONS.Store },
    { id: 'engagement_mgmt' as View, label: 'Engagement Suite', icon: ICONS.Megaphone },
    { id: 'device_mgmt' as View, label: 'My Terminals', icon: ICONS.Device },
    { id: 'receipt_mgmt' as View, label: 'Receipt Designer', icon: ICONS.Receipt },
    { id: 'carbon_mgmt' as View, label: 'Carbon Offset', icon: ICONS.Leaf },
    { id: 'customers' as View, label: 'Customers', icon: ICONS.Users },
  ];

  const navItems = role === 'ADMIN' ? adminNav : merchantNav;
  const currentMerchant = merchants.find(m => m.id === activeMerchantId);

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col hidden md:flex shadow-2xl shadow-slate-200/50">
        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
          <ICONS.Logo />
          <h1 className="text-xl font-bold text-slate-900 font-heading text-left">GreenTill</h1>
        </div>

        {/* Dynamic Context Switcher */}
        <div className="p-4 mx-4 my-6 bg-slate-900 rounded-[30px] flex flex-col gap-3 shadow-xl shadow-slate-900/20 transition-all">
           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-left">Simulated Node</label>
           <select 
            value={role === 'ADMIN' ? 'ADMIN' : activeMerchantId}
            onChange={(e) => {
              if (e.target.value === 'ADMIN') {
                onContextChange('ADMIN');
              } else {
                onContextChange('MERCHANT', e.target.value);
              }
            }}
            className="bg-white/10 border-none rounded-2xl px-3 py-2.5 text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer hover:bg-white/20 transition-colors"
           >
              <optgroup label="Core Infrastructure" className="bg-slate-900 text-white">
                <option value="ADMIN">Super Admin (Global)</option>
              </optgroup>
              <optgroup label="Active Merchants" className="bg-slate-900 text-white">
                {merchants.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
           </select>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
                <span className="font-black text-sm tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left">
            <div className="flex items-center gap-2 mb-1">
              <ICONS.Lock className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Enterprise Security</p>
            </div>
            <p className="text-[9px] text-slate-400 font-bold">Node: {role === 'ADMIN' ? 'Alpha-HQ' : `Merch-${activeMerchantId}`}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 px-8 flex items-center justify-between z-10">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-slate-900 font-heading text-left">
                {navItems.find(i => i.id === activeView)?.label || 'Overview'}
              </h2>
              {role === 'MERCHANT' && (
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                  {currentMerchant?.name} Context
                </span>
              )}
           </div>
           <div className="flex items-center gap-5">
              <div className="flex flex-col text-right">
                <span className="text-sm font-black text-slate-900">{role === 'ADMIN' ? 'Operations HQ' : currentMerchant?.email}</span>
                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Key Sync: Verified
                </span>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-slate-900 border-2 border-white shadow-lg overflow-hidden flex items-center justify-center p-1.5">
                <img src={role === 'ADMIN' ? `https://api.dicebear.com/7.x/shapes/svg?seed=hq&backgroundColor=1e293b` : currentMerchant?.logo} alt="avatar" className="w-full h-full object-contain" />
              </div>
           </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
