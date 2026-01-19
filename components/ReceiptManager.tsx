
import React, { useState } from 'react';

const ReceiptManager: React.FC = () => {
  const [promoText, setPromoText] = useState("Join our community garden! Get 10% off seeds today.");
  const [selectedCondition, setSelectedCondition] = useState("HIGH_CO2");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Receipt Smart-Promotions</h2>
          <p className="text-emerald-600">Configure conditional text and offers based on transaction data</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
           <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Promotion Content</label>
              <textarea 
                value={promoText}
                onChange={(e) => setPromoText(e.target.value)}
                className="w-full h-24 p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-emerald-900"
                placeholder="Enter text to show on receipt..."
              />
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Display Logic</label>
              <select 
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-emerald-900 font-medium"
              >
                <option value="ALWAYS">Always show this promotion</option>
                <option value="HIGH_CO2">Show if cart CO2 is &gt; 5kg</option>
                <option value="LOW_CO2">Show if cart is &quot;Green&quot; (Eco Score &gt; 90)</option>
                <option value="SPEND_THRESHOLD">Show if Total &gt; $50</option>
              </select>
           </div>

           <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200">
              Save Promotion Rule
           </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Stitched Receipt Preview</p>
        <div className="w-[340px] bg-white shadow-2xl rounded-sm p-6 border border-emerald-50 font-mono text-[11px] text-gray-800 space-y-4">
           <div className="text-center space-y-1">
              <h1 className="text-base font-bold uppercase tracking-widest">Green Grocer Co</h1>
              <p>Downtown Branch #402</p>
              <p>VAT: GB123456789</p>
           </div>
           
           <div className="border-t border-dashed border-gray-300 pt-2 space-y-1">
              <div className="flex justify-between">
                <span>Bamboo Toothbrush</span>
                <span>$4.50</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-bold italic">Eco Score: 95 | CO2: 0.05kg</div>
              
              <div className="flex justify-between mt-2">
                <span>Glass Water Bottle</span>
                <span>$18.50</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-bold italic">Eco Score: 85 | CO2: 0.3kg</div>
           </div>

           <div className="border-t border-dashed border-gray-300 pt-2 space-y-1">
              <div className="flex justify-between font-bold text-sm">
                 <span>TOTAL</span>
                 <span>$23.00</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                 <span>Carbon Offset (NGO)</span>
                 <span>$1.00</span>
              </div>
           </div>

           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center text-emerald-800">
              <p className="font-bold mb-1">Impact Summary</p>
              <p>Total CO2 Avoided: 1.2kg</p>
              <p>Trees Equivalent: 0.05 Trees</p>
           </div>

           <div className="pt-4 border-t border-dashed border-gray-300 text-center">
              <p className="font-bold text-xs mb-2">PROMOTION</p>
              <p className="italic uppercase">{promoText}</p>
           </div>

           <div className="text-center pt-4 opacity-50">
              <p>Transaction: #GT-20394-B</p>
              <p>{new Date().toLocaleString()}</p>
              <p>Powered by GreenTill</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptManager;
