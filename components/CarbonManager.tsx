
import React, { useState } from 'react';
import { MOCK_NGOS } from '../constants';

const CarbonManager: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [matching, setMatching] = useState(true);
  const [selectedNGOs, setSelectedNGOs] = useState<string[]>(['ngo1', 'ngo2']);

  const toggleNGO = (id: string) => {
    setSelectedNGOs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Carbon Offset Program</h2>
          <p className="text-emerald-600">Configure contribution options for your customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-8">
           <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-900">Enable Offset Contributions</h4>
                <p className="text-sm text-emerald-500">Allow customers to add offset to their purchase</p>
              </div>
              <button 
                onClick={() => setEnabled(!enabled)}
                className={`w-14 h-8 rounded-full transition-colors relative ${enabled ? 'bg-emerald-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${enabled ? 'right-1' : 'left-1 shadow-sm'}`} />
              </button>
           </div>

           <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-900">Merchant Matching</h4>
                <p className="text-sm text-emerald-500">Match 100% of customer contributions</p>
              </div>
              <button 
                onClick={() => setMatching(!matching)}
                className={`w-14 h-8 rounded-full transition-colors relative ${matching ? 'bg-emerald-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${matching ? 'right-1' : 'left-1 shadow-sm'}`} />
              </button>
           </div>

           <div className="pt-6 border-t border-emerald-50">
              <h4 className="font-bold text-emerald-900 mb-4">Available NGOs (Your Region)</h4>
              <div className="space-y-3">
                {MOCK_NGOS.map(ngo => (
                  <button 
                    key={ngo.id}
                    onClick={() => toggleNGO(ngo.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${selectedNGOs.includes(ngo.id) ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-emerald-100 hover:border-emerald-200'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedNGOs.includes(ngo.id) ? 'border-emerald-600 bg-emerald-600' : 'border-emerald-200'}`}>
                      {selectedNGOs.includes(ngo.id) && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="text-left">
                       <p className="font-bold text-emerald-900">{ngo.name}</p>
                       <p className="text-xs text-emerald-600">{ngo.description}</p>
                    </div>
                  </button>
                ))}
              </div>
           </div>
        </div>

        <div className="bg-emerald-900 text-white p-10 rounded-3xl flex flex-col justify-center text-center">
           <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
           </div>
           <h3 className="text-2xl font-bold font-heading mb-4">CSR Dashboard Preview</h3>
           <p className="text-emerald-100 mb-8 opacity-80">By matching contributions, your brand has planted 450 trees and removed 2 tons of plastic this quarter.</p>
           <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-xl transition-all">
              Download Quarterly CSR Report
           </button>
        </div>
      </div>
    </div>
  );
};

export default CarbonManager;
