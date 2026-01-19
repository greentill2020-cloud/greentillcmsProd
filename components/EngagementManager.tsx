
import React, { useState } from 'react';
import { Merchant, CESFeature, UserRole, Attachment, LoyaltyConfig } from '../types';
import { ICONS } from '../constants';

interface EngagementManagerProps {
  merchant: Merchant;
  role: UserRole;
  onUpdateMerchant: (updated: Merchant) => void;
}

const EngagementManager: React.FC<EngagementManagerProps> = ({ merchant, role, onUpdateMerchant }) => {
  const [activeTab, setActiveTab] = useState<'emails' | 'loyalty'>('emails');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('tc_email');

  const handleToggleFeature = (featureId: string, value: boolean, isLicenseChange: boolean) => {
    const updatedFeatures = [...merchant.cesConfig.features];
    
    const updateRecursive = (id: string, active: boolean) => {
      const idx = updatedFeatures.findIndex(f => f.id === id);
      if (idx === -1) return;

      if (isLicenseChange) {
        updatedFeatures[idx].isLicensed = active;
        if (!active) updatedFeatures[idx].isActive = false;
      } else {
        updatedFeatures[idx].isActive = active;
      }

      if (!active) {
        updatedFeatures.filter(f => f.parentId === id).forEach(child => updateRecursive(child.id, false));
      }
    };

    updateRecursive(featureId, value);
    onUpdateMerchant({
      ...merchant,
      cesConfig: { ...merchant.cesConfig, features: updatedFeatures }
    });
  };

  const handleLoyaltyUpdate = (updates: Partial<LoyaltyConfig>) => {
    onUpdateMerchant({
      ...merchant,
      loyaltyConfig: { ...merchant.loyaltyConfig, ...updates }
    });
  };

  const selectedFeature = merchant.cesConfig.features.find(f => f.id === selectedFeatureId) || merchant.cesConfig.features[0];

  const handleTemplateUpdate = (field: keyof typeof selectedFeature.template, val: any) => {
    if (!selectedFeature) return;
    const updatedFeatures = merchant.cesConfig.features.map(f => 
      f.id === selectedFeatureId ? { ...f, template: { ...f.template, [field]: val, lastUpdated: new Date() } } : f
    );
    onUpdateMerchant({
      ...merchant,
      cesConfig: { ...merchant.cesConfig, features: updatedFeatures }
    });
  };

  const addAttachment = () => {
    const newAtt: Attachment = { id: Math.random().toString(), name: 'New_Attachment.pdf', size: '1.2MB', type: 'PDF' };
    handleTemplateUpdate('attachments', [...(selectedFeature.template.attachments || []), newAtt]);
  };

  const removeAttachment = (id: string) => {
    handleTemplateUpdate('attachments', (selectedFeature.template.attachments || []).filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 font-heading text-left">Engagement Suite</h2>
           <p className="text-slate-500 font-medium text-left">Manage lifecycle triggers and customer loyalty logic</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('emails')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'emails' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Email Workflow
          </button>
          <button 
            onClick={() => setActiveTab('loyalty')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'loyalty' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Loyalty Suite
          </button>
        </div>
      </div>

      {activeTab === 'emails' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Workflow & Settings */}
          <div className="xl:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-left">
              <div className="flex items-center gap-3 mb-6">
                <ICONS.Megaphone className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-black text-slate-900 font-heading">Automated Sequences</h3>
              </div>
              
              <div className="space-y-4">
                {merchant.cesConfig.features.map(feature => {
                  const isChild = !!feature.parentId;
                  return (
                    <div 
                      key={feature.id} 
                      className={`relative flex items-start gap-4 p-4 rounded-3xl transition-all cursor-pointer border ${selectedFeatureId === feature.id ? 'bg-emerald-50 border-emerald-200 shadow-md scale-[1.02]' : 'hover:bg-slate-50 border-transparent'} ${isChild ? 'ml-8 before:content-[""] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-px before:bg-slate-200' : ''}`}
                      onClick={() => setSelectedFeatureId(feature.id)}
                    >
                      <div className="pt-1">
                        <input 
                          type="checkbox"
                          checked={role === 'ADMIN' ? feature.isLicensed : feature.isActive}
                          disabled={role === 'MERCHANT' && !feature.isLicensed}
                          onChange={(e) => handleToggleFeature(feature.id, e.target.checked, role === 'ADMIN')}
                          className="w-5 h-5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 leading-tight">{feature.name}</span>
                          {!feature.isLicensed && <span className="text-[8px] font-black bg-slate-900 text-white px-2 py-0.5 rounded uppercase tracking-tighter">Admin Locked</span>}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[40px] text-white text-left">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Email Server Settings</h3>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Campaign Frequency</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['DAILY', 'WEEKLY', 'MONTHLY'].map(p => (
                         <button 
                           key={p} 
                           onClick={() => onUpdateMerchant({...merchant, cesConfig: {...merchant.cesConfig, marketingPeriod: p as any}})}
                           className={`py-2.5 rounded-2xl text-[10px] font-black transition-all ${merchant.cesConfig.marketingPeriod === p ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                         >
                            {p}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Editor & Preview */}
          <div className="xl:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100 text-left">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 font-heading">Template Designer</h3>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-widest">{selectedFeature.name} Stage</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Line</label>
                    <input 
                      type="text" 
                      value={selectedFeature.template.subject}
                      onChange={(e) => handleTemplateUpdate('subject', e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Banner URL</label>
                    <input 
                      type="text" 
                      value={selectedFeature.template.bannerImage || ''}
                      onChange={(e) => handleTemplateUpdate('bannerImage', e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xs font-medium text-slate-500 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Body</label>
                    <textarea 
                      rows={8}
                      value={selectedFeature.template.body}
                      onChange={(e) => handleTemplateUpdate('body', e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-3xl p-6 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Automated Attachments</label>
                      <button onClick={addAttachment} className="text-[10px] font-black text-emerald-600 uppercase hover:text-emerald-700 transition-colors">+ Add Doc</button>
                    </div>
                    <div className="space-y-2">
                      {selectedFeature.template.attachments?.map(att => (
                        <div key={att.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-[8px]">{att.type}</div>
                            <span className="text-xs font-bold text-slate-700">{att.name}</span>
                          </div>
                          <button onClick={() => removeAttachment(att.id)} className="text-slate-300 group-hover:text-rose-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col items-center">
                   <p className="text-[10px] text-slate-400 font-black uppercase mb-8 tracking-widest text-center">Live Branded Preview</p>
                   <div className="w-full max-w-[340px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-slate-200">
                      {selectedFeature.template.bannerImage && (
                        <div className="h-40 w-full overflow-hidden relative">
                          <img src={selectedFeature.template.bannerImage} className="w-full h-full object-cover" alt="banner" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-8 space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
                          <div className="w-10 h-10 rounded-2xl bg-slate-900 p-2 shadow-inner">
                            <img src={merchant.logo} className="w-full h-full object-contain" alt="logo" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-slate-900 uppercase block tracking-wider">{merchant.name}</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Official Correspondence</span>
                          </div>
                        </div>
                        
                        <div>
                           <h4 className="text-sm font-black text-slate-900 mb-2">{selectedFeature.template.subject.replace('{{customer_name}}', 'Liam')}</h4>
                           <p className="text-[11px] text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                              {selectedFeature.template.body.replace('{{customer_name}}', 'Liam').replace('{{transaction_id}}', 'TX-DESK-4521')}
                           </p>
                        </div>
                        
                        {selectedFeature.template.attachments && selectedFeature.template.attachments.length > 0 && (
                          <div className="pt-6 border-t border-slate-50 space-y-3">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Document Vault (1)</p>
                             {selectedFeature.template.attachments.map(att => (
                               <div key={att.id} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all border border-slate-100">
                                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-[8px] font-black flex items-center justify-center shadow-lg shadow-emerald-600/20">{att.type}</div>
                                  <div className="flex-1 overflow-hidden">
                                    <span className="text-[10px] font-black text-slate-800 truncate block">{att.name}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase">{att.size}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                        )}

                        <div className="pt-8 text-center border-t border-slate-50">
                           <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Security Verified by GreenTill</p>
                           <p className="text-[7px] text-slate-300 font-medium mt-1 uppercase tracking-widest">© {new Date().getFullYear()} {merchant.name}</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Loyalty Logic Selection */}
          <div className="xl:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-left">
              <h3 className="text-xl font-black text-slate-900 mb-6 font-heading">Loyalty Program Logic</h3>
              <div className="space-y-4">
                <div 
                  className={`p-5 rounded-[28px] border transition-all cursor-pointer ${merchant.loyaltyConfig.type === 'VISIT' ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'border-slate-100 hover:bg-slate-50'}`}
                  onClick={() => handleLoyaltyUpdate({ type: 'VISIT', threshold: 10, reward: 'Free Item', stampDesign: { slots: 10, color: '#10b981', icon: 'Leaf' } })}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-slate-900">Return Visits</span>
                    {merchant.loyaltyConfig.type === 'VISIT' && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Customer earns stamps for each completed transaction.</p>
                </div>
                
                <div 
                  className={`p-5 rounded-[28px] border transition-all cursor-pointer ${merchant.loyaltyConfig.type === 'SPEND' ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'border-slate-100 hover:bg-slate-50'}`}
                  onClick={() => handleLoyaltyUpdate({ type: 'SPEND', threshold: 100, reward: 'Discount Coupon', couponDesign: { backgroundColor: '#10b981', textColor: '#ffffff', discountValue: '10%', prefix: 'SAVE' } })}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-slate-900">Purchase Threshold</span>
                    {merchant.loyaltyConfig.type === 'SPEND' && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Customer receives a reward after spending a specific amount.</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50 space-y-6">
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Target Goal</label>
                    <div className="flex items-center gap-4">
                       <input 
                         type="number" 
                         value={merchant.loyaltyConfig.threshold}
                         onChange={(e) => handleLoyaltyUpdate({ threshold: parseInt(e.target.value) || 0 })}
                         className="w-24 bg-slate-50 border-none rounded-xl p-3 font-black text-slate-900 text-center focus:ring-2 focus:ring-emerald-500"
                       />
                       <span className="text-xs font-bold text-slate-500">{merchant.loyaltyConfig.type === 'VISIT' ? 'Visits' : 'EUR Total'}</span>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Reward Description</label>
                    <input 
                      type="text" 
                      value={merchant.loyaltyConfig.reward}
                      onChange={(e) => handleLoyaltyUpdate({ reward: e.target.value })}
                      className="w-full bg-slate-50 border-none rounded-xl p-3 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Free Hot Chocolate"
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* Designer Tool */}
          <div className="xl:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100 text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-10 font-heading">
                {merchant.loyaltyConfig.type === 'VISIT' ? 'Stamp Card Designer' : 'Loyalty Coupon Designer'}
              </h3>

              {merchant.loyaltyConfig.type === 'VISIT' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Color</label>
                         <div className="flex gap-2">
                            {['#10b981', '#78350f', '#1e293b', '#b91c1c', '#15803d'].map(c => (
                              <button 
                                key={c} 
                                onClick={() => handleLoyaltyUpdate({ stampDesign: { ...merchant.loyaltyConfig.stampDesign!, color: c } })}
                                className={`w-8 h-8 rounded-full border-2 ${merchant.loyaltyConfig.stampDesign?.color === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stamp Icon</label>
                         <div className="flex gap-2">
                            {['Leaf', 'Star', 'Sparkles'].map(icon => (
                              <button 
                                key={icon} 
                                onClick={() => handleLoyaltyUpdate({ stampDesign: { ...merchant.loyaltyConfig.stampDesign!, icon: icon } })}
                                className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all ${merchant.loyaltyConfig.stampDesign?.icon === icon ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-transparent text-slate-400'}`}
                              >
                                {icon === 'Leaf' && <ICONS.Leaf className="w-5 h-5" />}
                                {icon === 'Star' && <ICONS.Star className="w-5 h-5" />}
                                {icon === 'Sparkles' && <ICONS.Sparkles className="w-5 h-5" />}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col items-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">Live View (Wallet Card)</p>
                      <div className="w-[300px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-8 space-y-6">
                         <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: merchant.loyaltyConfig.stampDesign?.color }}>
                               <img src={merchant.logo} className="w-8 h-8 object-contain brightness-0 invert" alt="" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-900">{merchant.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{merchant.loyaltyConfig.reward}</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-4 gap-3">
                            {Array.from({ length: merchant.loyaltyConfig.threshold }).map((_, i) => {
                               const Icon = (ICONS as any)[merchant.loyaltyConfig.stampDesign?.icon || 'Leaf'];
                               return (
                                 <div 
                                   key={i} 
                                   className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${i < 3 ? '' : 'bg-slate-50'}`}
                                   style={{ backgroundColor: i < 3 ? `${merchant.loyaltyConfig.stampDesign?.color}15` : undefined }}
                                 >
                                    <Icon 
                                      className={`w-5 h-5 ${i < 3 ? '' : 'opacity-10 text-slate-300'}`} 
                                      style={{ color: i < 3 ? merchant.loyaltyConfig.stampDesign?.color : undefined }}
                                    />
                                 </div>
                               );
                            })}
                         </div>
                         <p className="text-[10px] text-center font-bold text-slate-400 italic">3 of {merchant.loyaltyConfig.threshold} stamps collected</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voucher Color</label>
                         <div className="flex gap-2">
                            {['#10b981', '#78350f', '#1e293b', '#b91c1c', '#15803d'].map(c => (
                              <button 
                                key={c} 
                                onClick={() => handleLoyaltyUpdate({ couponDesign: { ...merchant.loyaltyConfig.couponDesign!, backgroundColor: c } })}
                                className={`w-8 h-8 rounded-full border-2 ${merchant.loyaltyConfig.couponDesign?.backgroundColor === c ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Value Display</label>
                            <input 
                               type="text" 
                               value={merchant.loyaltyConfig.couponDesign?.discountValue}
                               onChange={(e) => handleLoyaltyUpdate({ couponDesign: { ...merchant.loyaltyConfig.couponDesign!, discountValue: e.target.value } })}
                               className="w-full bg-slate-50 border-none rounded-xl p-3 font-black text-slate-900 focus:ring-2 focus:ring-emerald-500"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Code Prefix</label>
                            <input 
                               type="text" 
                               value={merchant.loyaltyConfig.couponDesign?.prefix}
                               onChange={(e) => handleLoyaltyUpdate({ couponDesign: { ...merchant.loyaltyConfig.couponDesign!, prefix: e.target.value.toUpperCase() } })}
                               className="w-full bg-slate-50 border-none rounded-xl p-3 font-black text-slate-900 focus:ring-2 focus:ring-emerald-500"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col items-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">Digital Coupon Preview</p>
                      <div className="w-[300px] h-[160px] rounded-[30px] shadow-2xl overflow-hidden relative border-4 border-white" style={{ backgroundColor: merchant.loyaltyConfig.couponDesign?.backgroundColor }}>
                         <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150">
                            <ICONS.Sparkles className="w-full h-full text-white" />
                         </div>
                         <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                               <img src={merchant.logo} className="w-8 h-8 object-contain brightness-0 invert" alt="" />
                               <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Loyalty Reward</span>
                            </div>
                            <div>
                               <p className="text-4xl font-black text-white">{merchant.loyaltyConfig.couponDesign?.discountValue}</p>
                               <p className="text-xs font-bold text-white/80 uppercase tracking-tight">{merchant.loyaltyConfig.reward}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 flex justify-between items-center border border-white/10">
                               <span className="text-[11px] font-black text-white font-mono">{merchant.loyaltyConfig.couponDesign?.prefix}-9842-OFF</span>
                               <span className="text-[8px] font-black text-white/50 uppercase">Scan at Till</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementManager;
