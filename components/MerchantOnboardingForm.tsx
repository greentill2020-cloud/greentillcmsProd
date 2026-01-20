import React, { useState } from 'react';
import type { Merchant } from '../types';

export type MerchantOnboardingInput = {
  name: string;
  email: string;
  category: Merchant['category'];
  branchName: string;
  branchLocation: string;
};

interface MerchantOnboardingFormProps {
  onCreate: (data: MerchantOnboardingInput) => Promise<void> | void;
  onCancel: () => void;
}

const categoryOptions: Merchant['category'][] = ['Grocery', 'Cafe'];

const MerchantOnboardingForm: React.FC<MerchantOnboardingFormProps> = ({ onCreate, onCancel }) => {
  const [form, setForm] = useState<MerchantOnboardingInput>({
    name: '',
    email: '',
    category: 'Grocery',
    branchName: '',
    branchLocation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof MerchantOnboardingInput, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.branchName || !form.branchLocation) {
      setError('Fill every required field to onboard a merchant.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onCreate(form);
    } catch (err) {
      console.error(err);
      setError('Failed to create merchant. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-emerald-100 rounded-[32px] shadow-sm p-8 text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Merchant Onboarding</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">Create a new enterprise</h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-bold text-slate-500 hover:text-slate-900"
        >
          Cancel
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Merchant Name</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Des Kelly Interiors"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Contact Email</label>
          <input
            type="email"
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="ops@merchant.ie"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Category</label>
          <select
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">HQ Branch Name</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Glasnevin"
            value={form.branchName}
            onChange={(e) => handleChange('branchName', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">HQ Location</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Dublin, IE"
            value={form.branchLocation}
            onChange={(e) => handleChange('branchLocation', e.target.value)}
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 transition disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create Merchant'}
          </button>
        </div>
        {error && (
          <div className="md:col-span-2 text-rose-600 text-sm font-semibold bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default MerchantOnboardingForm;
