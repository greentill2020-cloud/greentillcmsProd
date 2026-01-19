
import React from 'react';
import { MOCK_CUSTOMERS } from '../constants';

const CustomerInsights: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Customer Loyalty Insights</h2>
          <p className="text-emerald-600">Track visit frequency and eco-spending trends</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-emerald-50/50 border-b border-emerald-100">
              <th className="px-8 py-5 text-xs font-bold text-emerald-700 uppercase">Customer</th>
              <th className="px-8 py-5 text-xs font-bold text-emerald-700 uppercase">Visit Rate</th>
              <th className="px-8 py-5 text-xs font-bold text-emerald-700 uppercase">Total Spend</th>
              <th className="px-8 py-5 text-xs font-bold text-emerald-700 uppercase">Last Visit</th>
              <th className="px-8 py-5 text-xs font-bold text-emerald-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {MOCK_CUSTOMERS.sort((a, b) => b.visitCount - a.visitCount).map(customer => (
              <tr key={customer.id} className="hover:bg-emerald-50/20 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                      {customer.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-emerald-900">{customer.name}</p>
                      <p className="text-xs text-emerald-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-900">{customer.visitCount} visits</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 rounded-full ${i < (customer.visitCount / 5) ? 'bg-emerald-500' : 'bg-emerald-100'}`} />
                        ))}
                      </div>
                   </div>
                </td>
                <td className="px-8 py-5 font-bold text-emerald-900">
                  ${customer.totalSpend.toFixed(2)}
                </td>
                <td className="px-8 py-5 text-emerald-600 text-sm">
                   {customer.lastVisit.toLocaleDateString()}
                </td>
                <td className="px-8 py-5">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${customer.visitCount > 15 ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                      {customer.visitCount > 15 ? 'VIP' : 'Regular'}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerInsights;
