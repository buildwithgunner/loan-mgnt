import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, Home, Search, Filter, ArrowUpRight, DollarSign, X, Upload, FileText } from 'lucide-react';
import { apiClient, BASE_URL } from '../../../api/client.js';
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

const statusMapping = {
  approved:     { label: 'Approved',      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
  under_review: { label: 'Under Review',  color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',       icon: Clock },
  pending:      { label: 'Pending',       color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',     icon: AlertCircle },
  rejected:     { label: 'Not Approved',  color: 'bg-red-500/10 text-red-500 border-red-500/20',         icon: XCircle },
  credited:     { label: 'Credited',      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',   icon: CheckCircle },
  disbursed:    { label: 'Disbursed',     color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle },
};

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bankData, setBankData] = useState({ bank_name: '', account_name: '', account_number: '' });
  const [isSavingBank, setIsSavingBank] = useState(false);

  const fetchApps = async () => {
    try {
      const data = await apiClient('/dashboard/applications');
      setApplications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedApp) return;

    const formData = new FormData();
    formData.append('document', file);
    formData.append('category', 'Application Document');

    try {
      const response = await apiClient(`/dashboard/applications/upload-doc/${selectedApp.id}`, {
        method: 'POST',
        body: formData
      });
      
      if (response) {
        fetchApps();
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
                animation: pulse 2s infinite;
              ">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 style="color:#c5a059; font-size:22px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; font-style:italic; margin:0 0 8px;">Document Archived</h2>
              <p style="color:#94a3b8; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; margin:0 0 20px;">Securely synchronized to the vault</p>
              <div style="
                background: rgba(197,160,89,0.08);
                border: 1px solid rgba(197,160,89,0.2);
                border-radius: 16px;
                padding: 14px 20px;
                display: flex; align-items: center; gap: 12px;
              ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a059" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span style="color:#e2e8f0; font-size:12px; font-weight:600; text-align:left; word-break:break-all;">${file.name}</span>
              </div>
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
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      MySwal.fire({
        html: `
          <div style="padding: 10px 0 20px;">
            <div style="
              width: 80px; height: 80px;
              background: linear-gradient(135deg, #ef4444, #dc2626);
              border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              margin: 0 auto 24px;
              box-shadow: 0 0 40px rgba(239,68,68,0.4);
            ">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 style="color:#ef4444; font-size:22px; font-weight:900; letter-spacing:0.1em; text-transform:uppercase; font-style:italic; margin:0 0 8px;">Transfer Failed</h2>
            <p style="color:#94a3b8; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; margin:0;">Unable to synchronize with secure vault. Please retry.</p>
          </div>
        `,
        background: '#05101c',
        showConfirmButton: true,
        confirmButtonText: 'RETRY',
        customClass: {
          popup: 'rounded-[2.5rem] border border-red-500/20 shadow-2xl',
          confirmButton: 'bg-red-500 text-white font-black px-12 py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl mt-2',
        },
        buttonsStyling: false,
      });
    }
  };

  const handleRequestCodes = async (appId) => {
    try {
      const response = await apiClient(`/dashboard/applications/${appId}/request-codes`, {
        method: 'POST'
      });
      if (response) {
        Toast.fire({
          title: 'PROTOCOL INITIATED',
          text: 'Authorization code request has been broadcast to administration.',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false
        });
        fetchApps(); 
        if (selectedApp && selectedApp.id === appId) {
           setSelectedApp({...selectedApp, codes_requested: true});
        }
      } else {
        Toast.fire({
          title: 'REQUEST REJECTED',
          text: 'System refused to initialize code request protocol.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        title: 'NETWORK TIMEOUT',
        text: 'Infrastructure link failure during protocol broadcast.',
        icon: 'error'
      });
    }
  };
  
  const handleBankSubmit = async () => {
    if (!selectedApp) return;
    setIsSavingBank(true);
    try {
      const response = await apiClient(`/dashboard/applications/${selectedApp.id}/bank-details`, {
        method: 'POST',
        body: bankData
      });

      if (response) {
        Toast.fire({
          title: 'BANK DETAILS SAVED',
          text: 'Account information has been securely updated.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        fetchApps();
        setSelectedApp({ ...selectedApp, ...bankData });
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      Toast.fire({
        title: 'ERROR',
        text: 'Failed to synchronize bank parameters.',
        icon: 'error'
      });
    } finally {
      setIsSavingBank(false);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.property.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toString().includes(searchTerm.toLowerCase());
    const s = statusMapping[app.status] || statusMapping.pending;
    const matchesFilter = filterStatus === 'All' || s.label === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statuses = ['All', 'Approved', 'Under Review', 'Pending', 'Not Approved'];

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center animate-pulse">
        <div className="w-10 h-10 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in relative max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">My Asset Portfolio</h2>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Active Lifecycle Tracking — Black Wolves Acquisition LLC</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by address or application ID..."
            className="w-full pl-14 pr-6 py-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[1.5rem] text-sm text-[var(--text-primary)] placeholder-slate-500 focus:outline-none focus:border-[#c5a059] transition-all shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-[var(--bg-surface)] p-2 rounded-[1.5rem] border border-[var(--border-color)] shadow-xl overflow-x-auto scrollbar-hide">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filterStatus === s 
                  ? 'bg-[#c5a059] text-white shadow-xl shadow-[#c5a059]/20' 
                  : 'text-slate-500 hover:text-[var(--text-primary)]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-8">
        {filteredApps.length > 0 ? filteredApps.map(app => {
          const s = statusMapping[app.status] || statusMapping.pending;
          return (
            <div key={app.id} className="group bg-[var(--bg-surface)] rounded-[2.5rem] border border-[var(--border-color)] hover:border-[#c5a059]/40 transition-all p-2 shadow-2xl hover:shadow-[#c5a059]/5">
              <div className="p-8 md:p-10 flex flex-col lg:flex-row lg:items-center gap-12">
                <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[#c5a059] group-hover:scale-110 transition-transform shadow-inner`}>
                  <s.icon size={36} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="font-black text-[var(--text-primary)] text-2xl uppercase italic group-hover:text-[#c5a059] transition-colors truncate tracking-tighter">
                      {app.type} Protocol
                    </h3>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                      app.status === 'approved' && app.processing_level >= 100 ? s.color :
                      ['approved', 'under_review'].includes(app.status) ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      s.color
                    }`}>
                      {app.status === 'approved' && app.processing_level < 100 ? 'PROCESSING' :
                       app.status === 'under_review' ? 'PROCESSING' : s.label}
                    </span>
                  </div>
                  <p className="text-base text-slate-500 font-medium flex items-center gap-2 truncate">
                    <Home size={16} className="text-[#c5a059]" />
                    {app.property}
                  </p>
                  
                  {app.status !== 'rejected' && (
                    <div className="mt-8 flex items-center gap-6">
                       <div className="flex-1 max-w-[400px]">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                             <span className="truncate">{app.processing_stage}</span>
                             <span className="text-[#c5a059] text-sm italic">{app.processing_level}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 p-px shadow-inner">
                             <div 
                                className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] h-full transition-all duration-1000 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)]" 
                                style={{ width: `${app.processing_level}%` }} 
                             />
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:border-l lg:pl-12 border-white/5">
                  {[
                    { label: 'Asset Value', value: app.amount, icon: DollarSign },
                    { label: 'LTV Ratio', value: app.ltv },
                    { label: 'Initiated', value: new Date(app.created_at).toLocaleDateString(), },
                    { label: 'Reference ID', value: `#${app.id.toString().padStart(6, '0')}` },
                  ].map((f, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 flex items-center gap-1.5">
                        {f.icon && <f.icon size={12} />} {f.label}
                      </p>
                      <p className="font-black text-[var(--text-primary)] text-lg tracking-tight">{f.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 min-w-[180px]">
                  <button 
                    onClick={() => {
                      setSelectedApp(app);
                      setBankData({
                        bank_name: app.bank_name || '',
                        account_name: app.account_name || '',
                        account_number: app.account_number || ''
                      });
                      setShowModal(true);
                    }}
                    className="flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-[#c5a059]/30"
                  >
                    <Eye size={18} /> ASSET INTEL
                  </button>
                  {app.codes_requested && !app.approval_code && !app.tracking_code && (
                    <div className="text-center px-4 py-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] animate-pulse">
                        Clearance Pending
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-[var(--bg-surface)] rounded-[3rem] border border-dashed border-[var(--border-color)] p-32 text-center shadow-xl">
            <h3 className="text-[#c5a059] font-black uppercase italic text-3xl tracking-tighter">Portfolio Empty</h3>
            <p className="text-slate-500 text-base font-medium mt-3 uppercase tracking-widest">Initialize your first asset allocation to begin tracking.</p>
          </div>
        )}
      </div>

      {/* User Side Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-12 md:pt-20 backdrop-blur-xl bg-black/80 overflow-y-auto">
           <div className="bg-[#05101c] rounded-[2.5rem] w-full max-w-6xl shadow-2xl overflow-visible animate-in fade-in zoom-in duration-500 border border-white/10 relative">
              <div className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] px-8 py-6 flex justify-between items-center text-white rounded-t-[2.5rem]">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                       <Eye size={20} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Asset Intelligence</h3>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Deep lifecycle surveillance</p>
                    </div>
                 </div>
                 <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-transform bg-black/20 p-2 rounded-xl border border-white/10">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-12 md:p-16 relative overflow-y-auto max-h-[75vh] scrollbar-hide">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                   {/* Column 1: Financial Intelligence */}
                   <div className="space-y-12">
                      <div className="animate-in fade-in slide-in-from-left duration-500">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 font-mono">Ledger Timestamp</label>
                         <p className="text-[#c5a059] font-black text-3xl font-mono italic">
                           {new Date(selectedApp.created_at).toLocaleDateString()}
                         </p>
                      </div>

                      <div className="border-t border-white/5 pt-12 animate-in fade-in slide-in-from-left duration-700">
                         <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block mb-4 font-mono">Capital Injection Value</label>
                         <p className="text-white font-black text-6xl font-mono tracking-tighter leading-none">{selectedApp.amount}</p>
                      </div>

                      <div className="border-t border-white/5 pt-12 animate-in fade-in slide-in-from-left duration-1000">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 font-mono">Liability Duration Cycle</label>
                        <p className="text-white font-black text-3xl italic tracking-tighter uppercase">{selectedApp.form_data?.loanDuration || '24 Months'} Fixed</p>
                      </div>

                      <div className="border-t border-white/5 pt-12">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 font-mono">Asset Strategic Logic</label>
                        <p className="text-white font-black text-3xl uppercase italic tracking-tighter">{selectedApp.type}</p>
                      </div>
                   </div>

                   {/* Column 2: System Status & Clearance */}
                   <div className="space-y-12">
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest font-mono">Live Processing Protocol</label>
                           <span className={`text-white font-black text-xs bg-white/5 px-5 py-2.5 rounded-full uppercase tracking-widest border italic shadow-2xl ${
                             selectedApp.status === 'approved' && selectedApp.processing_level >= 100 ? 'border-emerald-500/20 text-emerald-500' :
                             ['approved', 'under_review'].includes(selectedApp.status) ? 'border-blue-500/20 text-blue-400' :
                             'border-white/10'
                           }`}>
                             {selectedApp.status === 'approved' && selectedApp.processing_level < 100 ? 'PROCESSING' :
                              selectedApp.status === 'under_review' ? 'PROCESSING' :
                              selectedApp.processing_stage || 'Pending'}
                           </span>
                        </div>
                        <div className="w-full bg-white/5 h-5 rounded-full overflow-hidden border border-white/5 p-px shadow-inner relative">
                           <div 
                              className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] h-full transition-all duration-1000 rounded-full relative shadow-[0_0_35px_rgba(197,160,89,0.5)]" 
                              style={{ width: `${selectedApp.processing_level || 20}%` }} 
                           >
                              <div className="absolute inset-0 bg-white/30 w-full animate-pulse"></div>
                           </div>
                        </div>
                        <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                           <span>System Initiation</span>
                           <span className="text-[#c5a059] italic text-lg">{selectedApp.processing_level || 20}% COMPLETED</span>
                        </div>
                     </div>

                     {selectedApp.approval_code && (
                       <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-10 space-y-4 shadow-2xl animate-in zoom-in duration-500">
                          <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block font-mono">Authorization Signature</label>
                          <p className="text-emerald-400 font-black text-4xl font-mono tracking-tighter">{selectedApp.approval_code}</p>
                          <p className="text-[10px] text-emerald-500/40 font-bold uppercase tracking-widest leading-none">Internal clearance confirmed — Black Wolves</p>
                       </div>
                     )}

                     {selectedApp.tracking_code && (
                       <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] p-10 space-y-4 shadow-2xl animate-in zoom-in duration-700">
                          <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Funding Protocol Tracking</label>
                          <div className="flex items-center justify-between">
                             <p className="text-indigo-400 font-black text-4xl font-mono tracking-tighter">{selectedApp.tracking_code}</p>
                             <button 
                               onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(selectedApp.tracking_code);
                                  Toast.fire({ title: 'DATA COPIED', text: 'Tracking identifier stored.', icon: 'info', timer: 1500, showConfirmButton: false });
                               }}
                               className="bg-indigo-500/10 text-indigo-400 p-4 rounded-2xl border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
                             >
                                <CheckCircle size={20} />
                             </button>
                          </div>
                          <p className="text-[10px] text-indigo-500/40 font-bold uppercase tracking-widest leading-none">External gateway clearance ID</p>
                       </div>
                     )}
                   </div>
                 </div>

                 {/* Requirements & Settlement Parameters (Full Width) */}
                 <div className="mt-20 space-y-20 border-t border-white/5 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                       <div className="space-y-8">
                          <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Protocol Requirements</label>
                          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 shadow-inner">
                            <p className="text-slate-300 text-base font-medium leading-relaxed italic">
                              {selectedApp.processing_level < 75 
                                 ? "Phase 1: Your application is in the Diligence stage. Please ensure all basic documents (ID, proof of income, property details) are correctly uploaded."
                                 : selectedApp.status === 'approved' && selectedApp.processing_level >= 75 && (!selectedApp.approval_code || !selectedApp.tracking_code)
                                 ? "Phase 2: You have reached the Funding stage. You can now request your unique authorization and tracking codes for payment clearance."
                                 : selectedApp.status === 'approved' && selectedApp.processing_level >= 75
                                 ? "Phase 2: Funding codes generated. Please upload any final signed disbursement agreements to complete the transaction."
                                 : "All requirements met. System awaiting final transaction completion."}
                            </p>
                          </div>
                          <label className="bg-[#c5a059] text-white px-12 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-[#c5a059]/30 cursor-pointer flex items-center justify-center gap-4 w-max">
                            <Upload size={20} /> SYNC DOCUMENTATION
                            <input type="file" className="hidden" onChange={handleDocumentUpload} />
                          </label>
                       </div>

                       {selectedApp.status === 'approved' && selectedApp.processing_stage === 'Withdrawal' && (
                         <div className="space-y-8">
                            <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Settlement Parameters</label>
                            <div className="grid grid-cols-1 gap-5">
                               <input 
                                 type="text" placeholder="Bank Name" 
                                 className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white placeholder-slate-500 focus:border-[#c5a059] outline-none transition-all text-lg"
                                 value={bankData.bank_name || selectedApp.bank_name || ''}
                                 onChange={(e) => setBankData({...bankData, bank_name: e.target.value})}
                               />
                               <div className="grid grid-cols-2 gap-5">
                                  <input 
                                    type="text" placeholder="Account Name" 
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white placeholder-slate-500 focus:border-[#c5a059] outline-none transition-all"
                                    value={bankData.account_name || selectedApp.account_name || ''}
                                    onChange={(e) => setBankData({...bankData, account_name: e.target.value})}
                                  />
                                  <input 
                                    type="text" placeholder="Account Number" 
                                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white font-mono placeholder-slate-500 focus:border-[#c5a059] outline-none transition-all"
                                    value={bankData.account_number || selectedApp.account_number || ''}
                                    onChange={(e) => setBankData({...bankData, account_number: e.target.value})}
                                  />
                               </div>
                               <button 
                                 onClick={handleBankSubmit} disabled={isSavingBank}
                                 className="w-full bg-[#c5a059] hover:bg-[#b08d4a] text-white text-[11px] font-black py-5 rounded-[1.5rem] uppercase tracking-[0.3em] transition-all shadow-2xl shadow-[#c5a059]/20"
                               >
                                 {isSavingBank ? 'SYNCHRONIZING...' : 'UPDATE SETTLEMENT PARAMETERS'}
                               </button>
                            </div>
                         </div>
                       )}

                       {/* Documents List */}
                       {selectedApp.documents?.length > 0 && (
                          <div className="space-y-8">
                             <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Archived Documentation</label>
                             <div className="grid grid-cols-1 gap-4">
                                {selectedApp.documents.map(doc => (
                                  <div key={doc.id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-[#c5a059]/30 transition-all group">
                                     <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                                           <FileText size={18} />
                                        </div>
                                        <div>
                                           <p className="text-sm font-bold text-white truncate max-w-[200px]">{doc.name}</p>
                                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{doc.category}</p>
                                        </div>
                                     </div>
                                     <a 
                                       href={`${BASE_URL.replace('/api', '')}/storage/${doc.path}`} 
                                       target="_blank" 
                                       rel="noreferrer" 
                                       className="bg-[#c5a059] text-white text-[10px] font-black px-6 py-2 rounded-xl uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                                     >
                                        DOWNLOAD
                                     </a>
                                  </div>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="pt-20 flex justify-between items-center border-t border-white/5 mt-20">
                    {selectedApp.status === 'approved' && (
                       <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                          LOAN OFFICIALLY VERIFIED
                       </div>
                    )}
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-slate-500 font-black text-xs uppercase tracking-[0.5em] hover:text-[#c5a059] transition-colors ml-auto"
                    >
                      EXIT ASSET INTEL
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
