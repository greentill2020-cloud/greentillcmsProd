
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Product, Transaction, UserRole } from '../types';

interface DashboardProps {
  products: Product[];
  transactions: Transaction[];
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ products, transactions, role }) => {
  const stats = useMemo(() => {
    const totalSales = transactions.reduce((acc, t) => acc + t.total, 0);
    const carbonSaved = transactions.reduce((acc, t) => acc + t.ecoImpactSaved, 0);
    const customerOffset = transactions.reduce((acc, t) => acc + t.carbonOffsetContribution, 0);
    const merchantMatch = transactions.filter(t => t.isMatched).reduce((acc, t) => acc + t.carbonOffsetContribution, 0);
    
    return { totalSales, carbonSaved, customerOffset, merchantMatch };
  }, [transactions]);

  const chartData = [
    { name: 'Mon', sales: 400, offset: 20 },
    { name: 'Tue', sales: 300, offset: 15 },
    { name: 'Wed', sales: 500, offset: 45 },
    { name: 'Thu', sales: 200, offset: 10 },
    { name: 'Fri', sales: 600, offset: 80 },
    { name: 'Sat', sales: 800, offset: 120 },
    { name: 'Sun', sales: 700, offset: 90 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Revenue</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">${stats.totalSales.toFixed(2)}</p>
          <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">↑ 12%</span> vs last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Customer Offsets</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">${stats.customerOffset.toFixed(2)}</p>
          <div className="mt-2 text-xs text-emerald-600">Directly to selected NGOs</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">Merchant Match</p>
          <p className="text-3xl font-bold text-emerald-900 mt-1">${stats.merchantMatch.toFixed(2)}</p>
          <div className="mt-2 text-xs text-emerald-600">Company contribution</div>
        </div>
        <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Total CO2 Impact</p>
          <p className="text-3xl font-bold mt-1">{(stats.carbonSaved + stats.customerOffset * 5).toFixed(1)}kg</p>
          <div className="mt-2 text-xs text-emerald-100">8.2 Tons avoided this year</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-emerald-900 font-heading">Performance Trend</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Sales
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-300"></span> Offsets
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#059669" fill="#059669" fillOpacity={0.05} strokeWidth={3} />
                <Area type="monotone" dataKey="offset" stroke="#34d399" fill="#34d399" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden h-full">
            <div className="absolute top-[-20px] right-[-20px] opacity-10">
              <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2z"/></svg>
            </div>
            <h4 className="text-lg font-bold mb-4">Carbon Offset Status</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                 <span className="text-sm font-medium">Ocean Cleanup</span>
                 <span className="font-bold text-emerald-400">$12,450.00</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                 <span className="text-sm font-medium">Tree Plantation</span>
                 <span className="font-bold text-emerald-400">$8,210.50</span>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs text-emerald-300 mb-2">Total Monthly Goal</p>
              <div className="w-full bg-white/20 h-2 rounded-full">
                 <div className="bg-emerald-400 h-full rounded-full" style={{width: '75%'}}></div>
              </div>
              <p className="text-right text-[10px] mt-1 font-bold">75% Achieved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
