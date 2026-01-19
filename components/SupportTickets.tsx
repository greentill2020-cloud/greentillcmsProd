
import React, { useState } from 'react';
import { Ticket, Merchant } from '../types';

interface SupportTicketsProps {
  tickets: Ticket[];
  merchants: Merchant[];
}

const SupportTickets: React.FC<SupportTicketsProps> = ({ tickets, merchants }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const getMerchantName = (id: string) => merchants.find(m => m.id === id)?.name || 'Unknown';

  const filtered = tickets.filter(t => filterStatus === 'ALL' || t.status === filterStatus);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Support Operations</h2>
          <p className="text-slate-500">Log and manage merchant terminal issues</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
           {['ALL', 'OPEN', 'IN_PROGRESS', 'CLOSED'].map(s => (
             <button 
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === s ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
             >
                {s.replace('_', ' ')}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(ticket => (
          <div key={ticket.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-emerald-200 transition-all cursor-pointer group">
            <div className="flex gap-6 items-center">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ticket.priority === 'HIGH' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                <span className="text-xs font-black">{ticket.priority[0]}</span>
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-900">{ticket.subject}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">{ticket.id}</span>
                 </div>
                 <div className="flex gap-4 text-xs text-slate-500">
                    <span className="font-medium">Merchant: <b className="text-slate-800">{getMerchantName(ticket.merchantId)}</b></span>
                    <span>•</span>
                    <span className="font-medium">Terminal ID: <b className="text-slate-800">{ticket.deviceId}</b></span>
                    <span>•</span>
                    <span className="font-medium">Logged: {new Date(ticket.createdAt).toLocaleString()}</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="text-right">
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${ticket.status === 'OPEN' ? 'text-rose-500' : 'text-emerald-500'}`}>{ticket.status}</p>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full rounded-full ${ticket.status === 'OPEN' ? 'bg-rose-500 w-1/4' : 'bg-emerald-500 w-full'}`}></div>
                  </div>
               </div>
               <button className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTickets;
