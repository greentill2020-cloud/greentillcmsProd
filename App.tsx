
import React, { useState, useEffect } from 'react';
import { Product, Transaction, View, UserRole, Device, Merchant } from './types';
import { StorageService } from './services/db';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import Inventory from './components/Inventory';
import DeviceManager from './components/DeviceManager';
import ReceiptManager from './components/ReceiptManager';
import CarbonManager from './components/CarbonManager';
import CustomerInsights from './components/CustomerInsights';
import AdminDashboard from './components/AdminDashboard';
import SupportTickets from './components/SupportTickets';
import EngagementManager from './components/EngagementManager';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [activeMerchantId, setActiveMerchantId] = useState<string>('m1');
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  // Database Initialization & Sync
  useEffect(() => {
    StorageService.init();
    setMerchants(StorageService.getMerchants());
    setProducts(StorageService.getProducts());
    setTransactions(StorageService.getTransactions());
  }, []);

  // The active simulated context
  const activeMerchant = merchants.find(m => m.id === activeMerchantId) || merchants[0];

  const handleUpdateMerchant = (updated: Merchant) => {
    const next = merchants.map(m => m.id === updated.id ? updated : m);
    setMerchants(next);
    StorageService.saveMerchants(next);
  };

  const handleContextChange = (newRole: UserRole, merchantId?: string) => {
    setRole(newRole);
    if (merchantId) setActiveMerchantId(merchantId);
    setActiveView('dashboard');
  };

  const allDevices: Device[] = merchants.flatMap(m => m.branches.flatMap(b => b.devices));

  const handleCompleteSale = (items: {productId: string, quantity: number, price: number}[]) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const ecoImpactSaved = items.reduce((acc, item) => {
      const p = products.find(prod => prod.id === item.productId);
      return acc + (p ? (p.ecoScore * 0.01) : 0);
    }, 0);

    const newTransaction: Transaction = {
      id: `TX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      items: items.map(i => ({...i, carbon: 0.1})),
      total,
      ecoImpactSaved,
      carbonOffsetContribution: 1.00,
      isMatched: true,
      timestamp: new Date()
    };

    const nextTransactions = [...transactions, newTransaction];
    setTransactions(nextTransactions);
    StorageService.saveTransaction(newTransaction);
    
    const updatedProducts = products.map(p => {
      const item = items.find(i => i.productId === p.id);
      return item ? { ...p, stock: p.stock - item.quantity } : p;
    });
    setProducts(updatedProducts);
    StorageService.saveProducts(updatedProducts);

    alert(`Sale Completed for ${activeMerchant.name}! Database updated.`);
  };

  const renderView = () => {
    if (merchants.length === 0) return <div>Loading Simulation Data...</div>;

    switch (activeView) {
      case 'dashboard':
        return role === 'ADMIN' 
          ? <AdminDashboard merchants={merchants} tickets={StorageService.getTickets()} />
          : <Dashboard products={products} transactions={transactions} role={role} />;
      case 'pos':
        return <POS products={products} onCompleteSale={handleCompleteSale} />;
      case 'inventory':
        return <Inventory products={products} activeMerchant={activeMerchant} />;
      case 'device_mgmt':
        return <DeviceManager role={role} devices={role === 'ADMIN' ? allDevices : activeMerchant.branches.flatMap(b => b.devices)} />;
      case 'support':
        return <SupportTickets tickets={StorageService.getTickets()} merchants={merchants} />;
      case 'engagement_mgmt':
        return <EngagementManager merchant={activeMerchant} role={role} onUpdateMerchant={handleUpdateMerchant} />;
      case 'customers':
        return <CustomerInsights />;
      case 'receipt_mgmt':
        return <ReceiptManager />;
      case 'carbon_mgmt':
        return <CarbonManager />;
      case 'merchant_mgmt':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center text-left">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Merchant Directory</h2>
                <p className="text-slate-500 font-medium">Enterprise account management across Ireland</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {merchants.map(m => (
                <div key={m.id} onClick={() => handleContextChange('MERCHANT', m.id)} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group text-left">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-[20px] bg-slate-50 p-2 flex items-center justify-center overflow-hidden border border-slate-100">
                      <img src={m.logo} alt={m.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">{m.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors leading-tight">{m.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mb-6">{m.email}</p>
                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    {m.branches.slice(0, 2).map(b => (
                      <div key={b.id} className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-slate-700 truncate">{b.name}</span>
                        <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-lg">{b.devices?.length || 0} Nodes</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <AdminDashboard merchants={merchants} tickets={StorageService.getTickets()} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView} 
      role={role} 
      merchants={merchants}
      activeMerchantId={activeMerchantId}
      onContextChange={handleContextChange}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
