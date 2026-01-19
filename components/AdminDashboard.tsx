
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Merchant, Device, Ticket } from '../types';
import { ICONS as UI_ICONS } from '../constants';

interface AdminDashboardProps {
  merchants: Merchant[];
  tickets: Ticket[];
}

const COLORS = ['#10b981', '#fbbf24', '#f87171', '#64748b'];
const MERCH_COLORS = ['#334155', '#475569', '#64748b', '#94a3b8', '#10b981'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ merchants, tickets }) => {
  const allDevices = merchants.flatMap(m => m.branches.flatMap(b => b.devices));
  
  const terminalStats = [
    { name: 'Online', value: allDevices.filter(d => d.status === 'ONLINE').length },
    { name: 'Maintenance', value: allDevices.filter(d => d.status === 'MAINTENANCE').length },
    { name: 'Offline', value: allDevices.filter(d => d.status === 'OFFLINE').length },
    { name: 'Powered Off', value: allDevices.filter(d => d.status === 'POWERED_OFF').length },
  ];

  const merchantCategories = Array.from(new Set(merchants.map(m => m.category))).map(cat => ({
    name: cat,
    value: merchants.filter(m => m.category === cat).length
  }));

  const openTickets = tickets.filter(t => t.status === 'OPEN').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Top Operations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-left">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Merchants</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{merchants.length}</p>
          <div className="mt-2 text-xs text-emerald-600 font-bold">Active in 4 Provinces</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-left">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Global Fleet</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{allDevices.length}</p>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {terminalStats[0].value} T1 Terminals Live
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-left">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Alerts / Offline</p>
          <p className="text-4xl font-black text-rose-500 mt-1">{allDevices.filter(d => d.status === 'OFFLINE' || d.status === 'POWERED_OFF').length}</p>
          <div className="mt-2 text-xs text-rose-400 font-bold">Require immediate attention</div>
        </div>
        <div className="bg-emerald-900 p-6 rounded-3xl shadow-lg text-white text-left">
          <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest">Support Queue</p>
          <p className="text-4xl font-black mt-1">{openTickets}</p>
          <div className="mt-2 text-xs text-emerald-400 font-bold">Average response: 12m</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-[450px]">
          <h3 className="text-xl font-black text-slate-900 mb-6 font-heading text-left">Fleet Health Status</h3>
          <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={terminalStats} innerRadius={70} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                    {terminalStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
             {terminalStats.map((s, i) => (
               <div key={s.name} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}}></span>
                    <span className="text-xs font-bold text-slate-500 uppercase">{s.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{s.value}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-[450px]">
          <h3 className="text-xl font-black text-slate-900 mb-6 font-heading text-left">Merchant Verticals</h3>
          <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={merchantCategories} innerRadius={70} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                    {merchantCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MERCH_COLORS[index % MERCH_COLORS.length]} cornerRadius={8} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
             {merchantCategories.map((s, i) => (
               <div key={s.name} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: MERCH_COLORS[i]}}></span>
                    <span className="text-xs font-bold text-slate-500 uppercase">{s.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{s.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] p-10 rounded-[50px] shadow-2xl overflow-hidden relative border border-white/5 text-left">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <UI_ICONS.Signal className="w-64 h-64 text-emerald-400" />
         </div>
         <div className="relative z-10">
            <div className="flex justify-between items-center mb-10">
               <div>
                 <h3 className="text-2xl font-black text-white font-heading">Global Terminal Cockpit</h3>
                 <p className="text-slate-400 text-sm font-medium mt-1">SIM connectivity and system telemetry live feed</p>
               </div>
               <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 transition-all">
                  Run Global Diagnostic
               </button>
            </div>
            <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700">
               {merchants.flatMap(m => m.branches.flatMap(b => b.devices.map(d => {
                 const openTicket = tickets.find(t => t.deviceId === d.id && t.status !== 'CLOSED');
                 return (
                 <div key={d.id} className={`bg-white/5 border ${openTicket ? 'border-rose-500/30 bg-rose-500/5' : 'border-white/10'} p-5 rounded-[30px] flex items-center justify-between hover:bg-white/10 transition-all group`}>
                    <div className="flex items-center gap-6">
                       <div className="relative">
                         <div className={`w-4 h-4 rounded-full ${d.status === 'ONLINE' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse' : d.status === 'POWERED_OFF' ? 'bg-slate-700' : d.status === 'MAINTENANCE' ? 'bg-amber-500' : 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]'}`}></div>
                         {openTicket && (
                           <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-[#0f172a]">TICKET</div>
                         )}
                       </div>
                       <div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-black text-white uppercase tracking-wider">{d.serial}</p>
                            <span className="text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-lg font-bold">{d.model}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">Merchant: {m.name} | Branch: {b.name}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-16">
                       <div className="flex flex-col items-end">
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-tighter">Signal (dBm)</p>
                          <div className="flex items-end gap-1 h-4">
                             {[...Array(5)].map((_, i) => (
                               <div key={i} className={`w-1.5 rounded-sm transition-all duration-500 ${i < ((d.sim?.signalStrength || 0) / 20) ? 'bg-emerald-400' : 'bg-slate-800'}`} style={{height: `${(i+1)*20}%`}}></div>
                             ))}
                          </div>
                       </div>
                       <div className="flex flex-col items-end min-w-[60px]">
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-tighter">Battery</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black ${d.batteryLevel && d.batteryLevel < 20 ? 'text-rose-400' : 'text-emerald-400'}`}>{d.batteryLevel || 0}%</span>
                            <div className="w-8 h-3.5 bg-slate-800 rounded-sm border border-slate-700 p-0.5 relative overflow-hidden">
                              <div className={`h-full rounded-sm ${d.batteryLevel && d.batteryLevel < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{width: `${d.batteryLevel || 0}%`}}></div>
                            </div>
                          </div>
                       </div>
                       <div className="flex flex-col items-end">
                          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-tighter">SIM ICCID</p>
                          <span className="text-xs font-bold text-slate-300 font-mono">{d.sim?.iccid.slice(0, 10)}...</span>
                       </div>
                    </div>
                 </div>
                 );
               })))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
