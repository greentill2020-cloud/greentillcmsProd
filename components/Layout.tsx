
import React from 'react';
import { View, UserRole } from '../types';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, role, onRoleChange }) => {
  const adminNav = [
    { id: 'dashboard' as View, label: 'Super Admin', icon: ICONS.Chart },
    { id: 'merchant_mgmt' as View, label: 'Merchants', icon: ICONS.Store },
    { id: 'device_mgmt' as View, label: 'Global Devices', icon: ICONS.Device },
    { id: 'support' as View, label: 'Support Tickets', icon: ICONS.Ticket },
    { id: 'ads_mgmt' as View, label: 'Ad Campaigns', icon: ICONS.Megaphone },
  ];

  const merchantNav = [
    { id: 'dashboard' as View, label: 'Store Insights', icon: ICONS.Chart },
    { id: 'pos' as View, label: 'Till / POS', icon: ICONS.Receipt },
    { id: 'inventory' as View, label: 'Inventory', icon: ICONS.Store },
    { id: 'device_mgmt' as View, label: 'My Terminals', icon: ICONS.Device },
    { id: 'ads_mgmt' as View, label: 'Store Ads', icon: ICONS.Megaphone },
    { id: 'receipt_mgmt' as View, label: 'Receipt Designer', icon: ICONS.Receipt },
    { id: 'carbon_mgmt' as View, label: 'Carbon Offset', icon: ICONS.Leaf },
    { id: 'loyalty_mgmt' as View, label: 'Loyalty Program', icon: ICONS.Users },
    { id: 'customers' as View, label: 'Customers', icon: ICONS.Users },
  ];

  const navItems = role === 'ADMIN' ? adminNav : merchantNav;

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-50">
          <ICONS.Logo />
          <h1 className="text-xl font-bold text-slate-900 font-heading">GreenTill</h1>
        </div>

        {/* Role Switcher */}
        <div className="p-4 mx-4 my-4 bg-slate-50 rounded-2xl flex flex-col gap-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Context</label>
           <select 
            value={role} 
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
           >
              <option value="ADMIN">Super Admin (HQ)</option>
              <option value="MERCHANT">Green Grocer Co</option>
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <div className="bg-slate-900 text-white rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ICONS.Lock className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold uppercase">Enterprise Tier</p>
            </div>
            <p className="text-[10px] text-slate-400 italic">2FA Enabled | Security Token Active</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 px-8 flex items-center justify-between z-10">
           <div>
              <h2 className="text-lg font-black text-slate-900 font-heading">
                {navItems.find(i => i.id === activeView)?.label || 'Overview'}
              </h2>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="text-sm font-black text-slate-900">{role === 'ADMIN' ? 'Admin Node Alpha' : 'Green Grocer HQ'}</span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Master Key Sync: OK</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden p-1">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${role}&backgroundColor=b6e3f4,c0aede,d1d4f9`} alt="avatar" />
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
