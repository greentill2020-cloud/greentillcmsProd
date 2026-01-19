
import React, { useState } from 'react';
import { Product } from '../types';
import { getSustainabilityAudit } from '../services/geminiService';

interface ReportsProps {
  products: Product[];
}

const Reports: React.FC<ReportsProps> = ({ products }) => {
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);

  const runAudit = async () => {
    setLoading(true);
    const data = await getSustainabilityAudit(products);
    setAuditData(data);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Sustainability Audit</h2>
          <p className="text-emerald-600">Deep analysis of your inventory impact powered by AI</p>
        </div>
        <button 
          onClick={runAudit}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-800 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Auditing...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Generate AI Report
            </>
          )}
        </button>
      </div>

      {!auditData && !loading && (
        <div className="bg-white border-2 border-dashed border-emerald-100 rounded-3xl p-16 text-center">
          <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-emerald-900 mb-2">No active report</h3>
          <p className="text-emerald-600 max-w-md mx-auto">Analyze your product lineup to find carbon-saving opportunities and sustainable alternatives.</p>
        </div>
      )}

      {auditData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-500 font-heading">#</span> Executive Summary
              </h3>
              <p className="text-emerald-800 leading-relaxed text-lg">
                {auditData.summary}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <span className="text-emerald-500 font-heading">#</span> Improvement Strategy
              </h3>
              <div className="space-y-4">
                {auditData.suggestions.map((suggestion: string, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start bg-emerald-50/50 p-4 rounded-2xl">
                    <div className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-emerald-900 font-medium">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
              <h3 className="text-lg font-bold text-rose-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                Risk Analysis
              </h3>
              <div className="space-y-2">
                {auditData.highRiskProducts.map((p: string, idx: number) => (
                  <div key={idx} className="bg-white px-4 py-3 rounded-xl shadow-sm border border-rose-200 text-rose-900 font-bold text-sm">
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                Swap Recommendations
              </h3>
              <div className="space-y-6">
                {auditData.alternatives.map((alt: any, idx: number) => (
                  <div key={idx} className="border-b border-emerald-800 pb-4 last:border-0">
                    <p className="text-xs text-emerald-400 font-bold uppercase mb-1">Swap {alt.original} for:</p>
                    <p className="text-emerald-100 font-bold text-lg mb-2">{alt.replacement}</p>
                    <p className="text-sm text-emerald-300 italic">"{alt.reason}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
