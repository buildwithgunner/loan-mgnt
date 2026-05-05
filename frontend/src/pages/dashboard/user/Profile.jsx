import React, { useState, useEffect } from 'react';
import { User as UserIcon, Shield, CreditCard, Camera, Check, AlertCircle, Save, Share2, Award, Users } from 'lucide-react';
import { apiClient } from '../../../api/client.js';

export default function Profile({ user: initialUser, initialTab = 'general' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: initialUser?.name || '',
    email: initialUser?.email || '',
    phone: initialUser?.phone || '',
    company: initialUser?.company || '',
    address: initialUser?.address || '',
    ssn: initialUser?.ssn || '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const result = await apiClient('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Update local storage if user info changed
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      }
    } catch (err) {
      setError(err?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general',  label: 'Personal Information', icon: UserIcon },
    { id: 'security', label: 'Security & Password',   icon: Shield },
    { id: 'banking',  label: 'Bank Details',          icon: CreditCard },
  ];

  const avatarSrc = initialUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(initialUser?.name || 'User')}&background=c5a059&color=05101c&bold=true&size=128`;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Account Settings</h2>
          <p className="text-slate-600 text-sm font-medium">Control center — Black Wolves Acquisition LLC</p>
        </div>
        <div className="flex items-center gap-4">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 animate-in fade-in slide-in-from-right-4">
              <Check size={16} /> CHANGES SAVED
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 bg-[#c5a059] text-[#05101c] font-black px-10 py-3.5 rounded-2xl text-xs transition-all shadow-2xl shadow-[#c5a059]/20 hover:scale-105 disabled:opacity-50 uppercase tracking-[0.2em]"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-[#05101c]/30 border-t-[#05101c] rounded-full animate-spin" /> : <Save size={18} />}
            {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 space-y-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border ${
                activeTab === tab.id 
                ? 'bg-white text-slate-900 border-gray-200 shadow-md scale-[1.02]' 
                : 'bg-transparent text-slate-500 border-transparent hover:bg-gray-50 hover:text-slate-900'
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? 'text-[#c5a059]' : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 blur-[100px] pointer-events-none" />
          
          {activeTab === 'general' && (
            <div className="space-y-12 animate-fade-in relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-10 pb-12 border-b border-gray-100">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#c5a059] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-[#c5a059]/20 shadow-lg relative z-10"
                  />
                  <button className="absolute bottom-1 right-1 p-3.5 bg-[#c5a059] text-white rounded-2xl shadow-md hover:scale-110 transition-all z-20 group-hover:rotate-12">
                    <Camera size={20} />
                  </button>
                </div>
                <div className="text-center sm:text-left space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tight">{formData.name || 'Member'}</h3>
                  <p className="text-[#c5a059] text-[11px] font-black uppercase tracking-[0.3em]">Institutional Partner // Black Wolves</p>
                  <div className="flex flex-wrap gap-3 mt-6 justify-center sm:justify-start">
                     <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 shadow-lg">
                       <Check size={12}/> IDENTITY VERIFIED
                     </span>
                     <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/5 px-4 py-2 rounded-xl border border-[#c5a059]/10 shadow-lg">
                       <Award size={12}/> ALPHA TIER ACCESS
                     </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { label: 'Full Name', name: 'name', value: formData.name, type: 'text' },
                  { label: 'Email Address', name: 'email', value: formData.email, type: 'email' },
                  { label: 'Phone Number', name: 'phone', value: formData.phone, type: 'tel' },
                  { label: 'Company (Optional)', name: 'company', value: formData.company, type: 'text' },
                  { label: 'SSN / Tax ID', name: 'ssn', value: formData.ssn, type: 'text' },
                  { label: 'Address', name: 'address', value: formData.address, type: 'text' },
                ].map((f, i) => (
                  <div key={i} className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={f.value}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-12 animate-fade-in relative z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase italic tracking-wider">
                  <Shield size={28} className="text-[#c5a059]" /> Account Security
                </h3>
                <p className="text-slate-600 text-sm font-medium mt-2">Update your password to keep your account safe.</p>
              </div>

              <div className="space-y-8 max-w-xl">
                {[
                  { label: 'New Password', name: 'password', placeholder: 'Enter new password' },
                  { label: 'Confirm New Password', name: 'password_confirmation', placeholder: 'Confirm new password' },
                ].map((l, i) => (
                  <div key={i} className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">{l.label}</label>
                    <input 
                      type="password" 
                      name={l.name}
                      onChange={handleInputChange}
                      placeholder={l.placeholder}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-amber-50 border border-amber-200 flex items-start gap-6 shadow-sm">
                <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={24} />
                <div className="space-y-4">
                   <h4 className="font-black text-amber-500 text-xs uppercase tracking-[0.2em]">Security Recommended</h4>
                   <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                     We recommend enabling Two-Factor Authentication (2FA) to add an extra layer of security to your account.
                   </p>
                   <button className="text-[#c5a059] font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-[#c5a059] pb-0.5 hover:scale-105 transition-transform">
                     ENABLE 2FA
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banking' && (
            <div className="space-y-12 animate-fade-in relative z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase italic tracking-wider">
                  <CreditCard size={28} className="text-[#c5a059]" /> Bank Details
                </h3>
                <p className="text-slate-600 text-sm font-medium mt-2">Saved bank accounts for receiving and sending funds.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { label: 'Bank Name', value: 'Black Wolves Strategic Bank', placeholder: '' },
                  { label: 'Account Holder', value: formData.name, placeholder: '' },
                  { label: 'Account Number', value: '•••• •••• 8824', placeholder: '' },
                  { label: 'Routing Number', value: '•••• •••• 0110', placeholder: '' },
                ].map((f, i) => (
                  <div key={i} className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">{f.label}</label>
                    <div className="relative">
                       <input
                         type="text"
                         readOnly
                         value={f.value}
                         className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-500 focus:outline-none transition-all pr-14 cursor-not-allowed"
                       />
                       <Shield size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 p-10 rounded-[2rem] relative overflow-hidden shadow-lg border border-gray-100 group">
                <div className="relative z-10 space-y-4">
                  <h4 className="font-black text-xl text-white uppercase italic tracking-widest">Security Protocol</h4>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                    Your financial data is protected by multi-layer encryption. We will never ask for your password or sensitive bank details via email.
                  </p>
                </div>
                <CreditCard className="absolute -right-12 -bottom-12 text-white/5 w-64 h-64 rotate-12 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DollarSign = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
