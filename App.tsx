
import React, { useState } from 'react';
import { Product, Transaction, View, UserRole, Device } from './types';
import { INITIAL_PRODUCTS, MOCK_MERCHANTS, MOCK_TICKETS } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import DeviceManager from './components/DeviceManager';
import ReceiptManager from './components/ReceiptManager';
import CarbonManager from './components/CarbonManager';
import CustomerInsights from './components/CustomerInsights';
import AdminDashboard from './components/AdminDashboard';
import SupportTickets from './components/SupportTickets';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const allDevices: Device[] = MOCK_MERCHANTS.flatMap(m => m.branches.flatMap(b => b.devices));

  const handleCompleteSale = (items: {productId: string, quantity: number, price: number}[]) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const ecoImpactSaved = items.reduce((acc, item) => {
      const p = products.find(prod => prod.id === item.productId);
      return acc + (p ? (p.ecoScore * 0.01) : 0);
    }, 0);

    const offsetContribution = 1.00;
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      items: items.map(i => ({...i, carbon: 0.1})),
      total,
      ecoImpactSaved,
      carbonOffsetContribution: offsetContribution,
      isMatched: true,
      timestamp: new Date()
    };

    setTransactions(prev => [...prev, newTransaction]);
    alert(`Sale Completed! Carbon Offset Matched.`);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return role === 'ADMIN' 
          ? <AdminDashboard merchants={MOCK_MERCHANTS} tickets={MOCK_TICKETS} />
          : <Dashboard products={products} transactions={transactions} role={role} />;
      case 'pos':
        return <POS products={products} onCompleteSale={handleCompleteSale} />;
      case 'inventory':
        return <Inventory products={products} />;
      case 'device_mgmt':
        return <DeviceManager role={role} devices={allDevices} />;
      case 'support':
        return <SupportTickets tickets={MOCK_TICKETS} merchants={MOCK_MERCHANTS} />;
      case 'receipt_mgmt':
        return <ReceiptManager />;
      case 'carbon_mgmt':
        return <CarbonManager />;
      case 'customers':
        return <CustomerInsights />;
      case 'merchant_mgmt':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Merchant Directory</h2>
                <p className="text-slate-500 font-medium">Enterprise account management across Ireland</p>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-slate-200">
                Onboard New Merchant
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_MERCHANTS.map(m => (
                <div key={m.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-[20px] bg-slate-50 p-2 flex items-center justify-center overflow-hidden border border-slate-100">
                      <img src={m.logo} alt={m.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">{m.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors leading-tight">{m.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mb-6">{m.email}</p>
                  
                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    {m.branches.map(b => (
                      <div key={b.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-slate-700 truncate max-w-[120px]">{b.name}</span>
                          <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-lg">{b.devices.length} T1</span>
                        </div>
                        <p className="text-[10px] text-slate-400 italic truncate">{b.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ads_mgmt':
        return <div className="p-12 text-center text-slate-900 font-black">Ad Campaign Rotator Config</div>;
      default:
        return <AdminDashboard merchants={MOCK_MERCHANTS} tickets={MOCK_TICKETS} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView} 
      role={role} 
      onRoleChange={(r) => { setRole(r); setActiveView('dashboard'); }}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
