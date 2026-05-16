import React, { useState, useEffect } from 'react';
import { Landmark, CheckCircle, ArrowRight, DollarSign, Wallet, AlertCircle, Loader2 } from 'lucide-react';
import { apiClient } from '../../../api/client.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#ffffff',
  color: '#0f172a',
  customClass: {
    popup: 'rounded-[2rem] border border-white/10 shadow-2xl bg-[#05101c] text-white',
    confirmButton: 'bg-[#c5a059] text-white font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#c5a059]/20',
    cancelButton: 'bg-white/5 text-slate-300 font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5'
  },
  buttonsStyling: false
});

export default function Withdrawals() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [bankData, setBankData] = useState({
    bank_name: '',
    account_name: '',
    account_number: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchApps = async () => {
    try {
      const data = await apiClient('/dashboard/applications');
      // Filter for approved applications or those in withdrawal stage
      const withdrawable = (data || []).filter(app => 
        app.status === 'approved' || app.status === 'credited' || app.status === 'disbursed'
      );
      setApplications(withdrawable);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!bankData.bank_name || !bankData.account_name || !bankData.account_number) {
        Toast.fire({
            title: 'INCOMPLETE DATA',
            text: 'Please fill in all settlement parameters.',
            icon: 'warning'
        });
        return;
    }

    setIsSaving(true);
    try {
      const response = await apiClient(`/dashboard/applications/${selectedApp.id}/bank-details`, {
        method: 'POST',
        body: bankData
      });

      if (response) {
        await MySwal.fire({
          html: `
            <div style="padding: 10px 0 20px;">
              <div style="
                width: 80px; height: 80px;
                background: linear-gradient(135deg, #c5a059, #b08d4a);
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                margin: 0 auto 24px;
                box-shadow: 0 0 40px rgba(197,160,89,0.4);
              ">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 style="color:#c5a059; font-size:22px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; font-style:italic; margin:0 0 8px;">Settlement Ready</h2>
              <p style="color:#94a3b8; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; margin:0;">Bank details have been securely broadcast.</p>
            </div>
          `,
          background: '#05101c',
          showConfirmButton: true,
          confirmButtonText: 'CONFIRMED',
          customClass: {
            popup: 'rounded-[2.5rem] border border-white/10 shadow-2xl',
            confirmButton: 'bg-[#c5a059] text-white font-black px-12 py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-[#c5a059]/20 mt-2',
          },
          buttonsStyling: false,
        });
        fetchApps();
        setSelectedApp(null);
      }
    } catch (err) {
      Toast.fire({
        title: 'SYNC ERROR',
        text: 'Failed to synchronize bank parameters.',
        icon: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center animate-pulse">
        <div className="w-10 h-10 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">Withdrawal Protocol</h2>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Settlement & Asset Liquidation — Black Wolves Acquisition LLC</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Selection List */}
        <div className="lg:col-span-1 space-y-6">
          <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Select Asset for Liquidation</label>
          <div className="space-y-4">
            {applications.length > 0 ? applications.map(app => (
              <button 
                key={app.id}
                onClick={() => {
                    setSelectedApp(app);
                    setBankData({
                        bank_name: app.bank_name || '',
                        account_name: app.account_name || '',
                        account_number: app.account_number || ''
                    });
                }}
                className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden ${
                  selectedApp?.id === app.id 
                    ? 'bg-[#c5a059]/10 border-[#c5a059] shadow-xl' 
                    : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[#c5a059]/50'
                }`}
              >
                <div className="flex items-center gap-5 relative z-10">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                     selectedApp?.id === app.id ? 'bg-[#c5a059] text-white border-white/10' : 'bg-[var(--bg-secondary)] text-[#c5a059] border-[var(--border-color)]'
                   }`}>
                      <Landmark size={20} />
                   </div>
                   <div>
                      <h4 className="font-black text-[var(--text-primary)] uppercase italic tracking-tighter text-lg leading-tight">{app.type}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{app.amount}</p>
                   </div>
                   {app.status === 'disbursed' && (
                     <CheckCircle size={16} className="ml-auto text-emerald-500" />
                   )}
                </div>
                {selectedApp?.id === app.id && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <ArrowRight size={20} className="text-[#c5a059] animate-bounce-x" />
                  </div>
                )}
              </button>
            )) : (
              <div className="bg-[var(--bg-surface)] rounded-[2rem] border border-dashed border-[var(--border-color)] p-12 text-center">
                 <AlertCircle className="mx-auto text-slate-400 mb-4" size={32} />
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">No verified assets available for withdrawal yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bank Details Form */}
        <div className="lg:col-span-2">
           <div className="bg-[var(--bg-surface)] rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl overflow-hidden relative min-h-[500px]">
              {!selectedApp ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                   <div className="w-20 h-20 bg-[#c5a059]/5 rounded-full flex items-center justify-center text-[#c5a059]/20 mb-8 border border-[#c5a059]/10">
                      <Wallet size={40} />
                   </div>
                   <h3 className="text-2xl font-black text-slate-700 uppercase italic tracking-tighter">Gateway Locked</h3>
                   <p className="text-slate-500 text-sm font-medium mt-3 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                      Please select a verified asset from the portfolio list to initialize settlement parameters.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleBankSubmit} className="p-10 md:p-16 space-y-12 animate-in fade-in zoom-in duration-500">
                   <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <div>
                         <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Active Target</label>
                         <h3 className="text-3xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter">{selectedApp.type} Settlement</h3>
                      </div>
                      <div className="text-right">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-mono">Asset Valuation</label>
                         <p className="text-2xl font-black text-white font-mono">{selectedApp.amount}</p>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">Receiving Institution</label>
                           <div className="relative group">
                              <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={20} />
                              <input 
                                type="text"
                                placeholder="Bank Name"
                                required
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl pl-16 pr-6 py-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#c5a059] transition-all"
                                value={bankData.bank_name}
                                onChange={(e) => setBankData({...bankData, bank_name: e.target.value})}
                              />
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">Beneficiary Name</label>
                           <div className="relative group">
                              <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={20} />
                              <input 
                                type="text"
                                placeholder="Account Name"
                                required
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl pl-16 pr-6 py-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#c5a059] transition-all"
                                value={bankData.account_name}
                                onChange={(e) => setBankData({...bankData, account_name: e.target.value})}
                              />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">Account Identification Number</label>
                         <div className="relative group">
                            <Wallet className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={20} />
                            <input 
                              type="text"
                              placeholder="Account Number"
                              required
                              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl pl-16 pr-6 py-5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-[#c5a059] transition-all"
                              value={bankData.account_number}
                              onChange={(e) => setBankData({...bankData, account_number: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>

                   <div className="bg-[#c5a059]/5 border border-[#c5a059]/20 rounded-2xl p-6 flex items-start gap-4">
                      <AlertCircle className="text-[#c5a059] shrink-0 mt-1" size={18} />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                         By updating settlement parameters, you authorize the transfer of verified assets to the designated institution. Ensure all data is accurate to prevent protocol redirection failure.
                      </p>
                   </div>

                   <button 
                     type="submit"
                     disabled={isSaving}
                     className="w-full bg-[#c5a059] hover:bg-[#b08d4a] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] shadow-2xl shadow-[#c5a059]/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                   >
                      {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Landmark size={18} />}
                      {isSaving ? 'SYNCHRONIZING...' : 'AUTHORIZE LIQUIDATION'}
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
