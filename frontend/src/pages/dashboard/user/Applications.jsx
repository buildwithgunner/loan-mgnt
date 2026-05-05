import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Eye, Home, Search, Filter, ArrowUpRight, DollarSign, X, Upload } from 'lucide-react';
import { apiClient } from '../../../api/client.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#ffffff',
  color: '#0f172a',
  customClass: {
    popup: 'rounded-3xl border border-gray-100 shadow-xl',
    confirmButton: 'bg-[#c5a059] text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all',
    cancelButton: 'bg-gray-100 text-slate-600 font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});

const statusMapping = {
  approved:     { label: 'Approved',      color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle },
  under_review: { label: 'Under Review',  color: 'bg-blue-50 text-blue-600',       icon: Clock },
  pending:      { label: 'Pending',       color: 'bg-amber-50 text-amber-600',     icon: AlertCircle },
  rejected:     { label: 'Not Approved',  color: 'bg-red-50 text-red-600',         icon: XCircle },
  credited:     { label: 'Credited',      color: 'bg-indigo-50 text-indigo-600',   icon: CheckCircle },
  disbursed:    { label: 'Disbursed',     color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
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
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/dashboard/applications/${selectedApp.id}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        Toast.fire({
          title: 'UPLOAD COMPLETE',
          text: 'Asset documentation has been securely archived.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        fetchApps();
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      Toast.fire({
        title: 'TRANSFER ERROR',
        text: 'Failed to synchronize documentation with secure vault.',
        icon: 'error'
      });
    }
  };

  const handleRequestCodes = async (appId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/dashboard/applications/${appId}/request-codes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
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
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/dashboard/applications/${selectedApp.id}/bank-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bankData)
      });

      if (response.ok) {
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
    <div className="space-y-8 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">My Applications</h2>
          <p className="text-slate-600 text-sm font-medium">Loan Amount and status tracking — Black Wolves Acquisition LLC</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search by address or ID..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filterStatus === s 
                    ? 'bg-[#c5a059] text-white shadow-lg shadow-[#c5a059]/20' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredApps.length > 0 ? filteredApps.map(app => {
          const s = statusMapping[app.status] || statusMapping.pending;
          return (
            <div key={app.id} className="group bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] hover:border-[#c5a059]/30 transition-all p-1 shadow-sm hover:shadow-md">
              <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[#c5a059] group-hover:scale-110 transition-transform`}>
                  <s.icon size={32} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h3 className="font-black text-[var(--text-primary)] text-xl uppercase italic group-hover:text-[#c5a059] transition-colors truncate">
                      {app.type} Application
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-gray-50 border border-gray-200 ${s.color.includes('emerald') ? 'text-emerald-600' : s.color.includes('blue') ? 'text-blue-500' : s.color.includes('amber') ? 'text-amber-600' : 'text-red-600'}`}>
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-2 truncate">
                    <Home size={14} className="text-[#c5a059]" />
                    {app.property}
                  </p>
                  
                  {app.status !== 'rejected' && (
                    <div className="mt-6 flex items-center gap-4">
                       <div className="flex-1 max-w-[300px]">
                          <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
                             <span className="truncate">{app.processing_stage}</span>
                             <span className="text-[#c5a059]">{app.processing_level}%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden border border-gray-200 p-px">
                             <div 
                                className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] h-full transition-all duration-1000 rounded-full" 
                                style={{ width: `${app.processing_level}%` }} 
                             />
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:border-l lg:pl-10 border-gray-100">
                  {[
                    { label: 'Amount', value: app.amount, icon: DollarSign },
                    { label: 'LTV Ratio', value: app.ltv },
                    { label: 'Date', value: new Date(app.created_at).toLocaleDateString(), },
                    { label: 'Application ID', value: `#${app.id.toString().padStart(6, '0')}` },
                  ].map((f, i) => (
                    <div key={i}>
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5 flex items-center gap-1">
                        {f.icon && <f.icon size={10} />} {f.label}
                      </p>
                      <p className="font-bold text-slate-900 text-[14px]">{f.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
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
                    className="flex items-center justify-center gap-2 bg-[#c5a059] text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20"
                  >
                    <Eye size={16} /> INSPECT
                  </button>
                  {/* Status Indicator for codes requested */}
                  {app.codes_requested && !app.approval_code && !app.tracking_code && (
                    <span className="text-center text-[9px] font-black text-amber-500 uppercase tracking-widest mt-1">
                      Codes Requested
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-24 text-center shadow-sm">
            <h3 className="text-[#c5a059] font-black uppercase italic text-xl">Portfolio Empty</h3>
            <p className="text-slate-500 text-sm font-medium mt-2">Initialize your first asset allocation to begin lifecycle tracking.</p>
          </div>
        )}
      </div>

      {/* User Side Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
           <div className="bg-[var(--bg-surface)] rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-[var(--border-color)]">
              <div className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] px-6 py-5 flex justify-between items-center text-white">
                 <h3 className="text-xl font-black uppercase italic tracking-tighter">Asset Intel</h3>
                 <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-transform">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 relative space-y-10 max-h-[80vh] overflow-y-auto scrollbar-hide">
                 {/* Approved Stamp */}
                 {selectedApp.status === 'approved' && (
                   <div className="absolute top-6 right-10 z-10 rotate-[25deg] transform">
                      <div className="border-4 border-emerald-500/80 px-6 py-1.5 rounded-xl">
                         <div className="text-emerald-500/20 text-[10px] font-black leading-none text-center">VERIFIED</div>
                         <div className="text-emerald-500/80 text-2xl font-black leading-none text-center">APPROVED</div>
                         <div className="text-emerald-500/20 text-[10px] font-black leading-none text-center">VERIFIED</div>
                      </div>
                   </div>
                 )}

                 <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 font-mono">Timestamp</label>
                    <p className="text-[#c5a059] font-bold text-xl font-mono">
                      {new Date(selectedApp.created_at).toLocaleDateString()}
                    </p>
                 </div>

                 <div className="border-t border-[var(--border-color)] pt-10">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-2 font-mono">Capital Injection</label>
                    <p className="text-[var(--text-primary)] font-bold text-2xl font-mono">{selectedApp.amount}</p>
                 </div>

                  <div className="border-t border-gray-100 pt-10">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 font-mono">Liability Cycle</label>
                    <p className="text-slate-900 font-bold text-xl">{selectedApp.form_data?.loanDuration || '24 Months'} Fixed</p>
                  </div>

                 <div className="border-t border-gray-100 pt-10">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 font-mono">Strategic Logic</label>
                    <p className="text-slate-900 font-bold text-xl uppercase italic">{selectedApp.type}</p>
                 </div>

                 <div className="border-t border-gray-100 pt-10 space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest font-mono">Live Processing Status</label>
                       <span className="text-slate-900 font-bold text-sm bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">{selectedApp.processing_stage || 'Pending'}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-200 p-px shadow-inner">
                       <div 
                          className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] h-full transition-all duration-1000 rounded-full relative" 
                          style={{ width: `${selectedApp.processing_level || 20}%` }} 
                       >
                          <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                       </div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                       <span>Initiated</span>
                       <span>{selectedApp.processing_level || 20}% Completed</span>
                    </div>
                 </div>

                 {selectedApp.approval_code && (
                   <div className="border-t border-emerald-500/10 bg-emerald-500/5 -mx-10 px-10 py-8 space-y-2">
                      <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block font-mono">Authorization Signature</label>
                      <p className="text-emerald-400 font-black text-2xl font-mono tracking-tighter">{selectedApp.approval_code}</p>
                      <p className="text-[9px] text-emerald-500/50 font-bold uppercase tracking-widest leading-none">Internal clearance confirmed — Black Wolves</p>
                   </div>
                 )}

                 {selectedApp.tracking_code && (
                   <div className="border-t border-indigo-500/10 bg-indigo-500/5 -mx-10 px-10 py-8 space-y-2">
                      <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Payment Protocol Tracking</label>
                      <div className="flex items-center justify-between">
                         <p className="text-indigo-400 font-black text-2xl font-mono tracking-tighter">{selectedApp.tracking_code}</p>
                         <button 
                           onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(selectedApp.tracking_code);
                              Toast.fire({
                                title: 'DATA COPIED',
                                text: 'Tracking identifier stored in local clipboard.',
                                icon: 'info',
                                timer: 1500,
                                showConfirmButton: false
                              });
                           }}
                           className="bg-indigo-500/10 text-indigo-400 p-2 rounded-lg border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all"
                         >
                            <CheckCircle size={14} />
                         </button>
                      </div>
                      <p className="text-[9px] text-indigo-500/50 font-bold uppercase tracking-widest leading-none">External funding gateway identifier</p>
                   </div>
                 )}
                 <div className="border-t border-gray-100 pt-10">
                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block mb-4 font-mono">Next Requirements</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-4">
                      <p className="text-slate-600 text-xs font-medium mb-3">
                        {selectedApp.processing_level < 75 
                           ? "Phase 1: Your application is in the Diligence stage. Please ensure all basic documents (ID, proof of income, property details) are correctly uploaded."
                           : selectedApp.status === 'approved' && selectedApp.processing_level >= 75 && (!selectedApp.approval_code || !selectedApp.tracking_code)
                           ? "Phase 2: You have reached the Funding stage. You can now request your unique authorization and tracking codes for payment clearance."
                           : selectedApp.status === 'approved' && selectedApp.processing_level >= 75
                           ? "Phase 2: Funding codes generated. Please upload any final signed disbursement agreements to complete the transaction."
                           : "All requirements met. System awaiting final transaction completion."}
                      </p>
                    </div>
                    <label className="bg-[#c5a059] text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/30 cursor-pointer flex items-center justify-center gap-2 max-w-[200px]">
                      <Upload size={14} /> Upload Document
                      <input type="file" className="hidden" onChange={handleDocumentUpload} />
                    </label>
                 </div>

                 {/* Bank Details Section - ONLY if in Withdrawal Stage */}
                 {selectedApp.status === 'approved' && selectedApp.processing_stage === 'Withdrawal' && (
                   <div className="border-t border-gray-100 pt-10 space-y-4">
                      <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block font-mono">Withdrawal Bank Details</label>
                      <div className="space-y-3">
                         <input 
                           type="text" 
                           placeholder="Bank Name" 
                           className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-[#c5a059] outline-none"
                           value={bankData.bank_name || selectedApp.bank_name || ''}
                           onChange={(e) => setBankData({...bankData, bank_name: e.target.value})}
                         />
                         <input 
                           type="text" 
                           placeholder="Account Name" 
                           className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-[#c5a059] outline-none"
                           value={bankData.account_name || selectedApp.account_name || ''}
                           onChange={(e) => setBankData({...bankData, account_name: e.target.value})}
                         />
                         <input 
                           type="text" 
                           placeholder="Account Number" 
                           className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-[#c5a059] outline-none"
                           value={bankData.account_number || selectedApp.account_number || ''}
                           onChange={(e) => setBankData({...bankData, account_number: e.target.value})}
                         />
                         <button 
                           onClick={handleBankSubmit}
                           disabled={isSavingBank}
                           className="w-full bg-[#c5a059] hover:bg-[#b08d4a] text-white text-[10px] font-black py-3 rounded-xl uppercase tracking-widest transition-all shadow-md"
                         >
                           {isSavingBank ? 'SAVING...' : 'UPDATE BANK DETAILS'}
                         </button>
                      </div>
                   </div>
                 )}

                 {/* Code Request Area - ONLY if in Withdrawal Stage */}
                 {selectedApp.processing_stage === 'Withdrawal' && (!selectedApp.approval_code || !selectedApp.tracking_code) && (
                   <div className="border-t border-gray-100 pt-10">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                        <div>
                           <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-2 font-mono">Authorization & Tracking Codes</label>
                           <p className="text-slate-600 text-xs font-medium">Stage reached. Request your unique codes from the Administrator.</p>
                        </div>
                        {selectedApp.codes_requested ? (
                          <div className="bg-white text-amber-600 font-black px-6 py-3 rounded-full text-[10px] uppercase tracking-widest border border-amber-200">
                             REQUEST PENDING
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRequestCodes(selectedApp.id)}
                            className="bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-3 rounded-full text-[10px] uppercase tracking-widest transition-all hover:scale-105 shadow-md"
                          >
                            REQUEST CODES
                          </button>
                        )}
                      </div>
                   </div>
                 )}

                 <div className="pt-8 flex justify-end">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] hover:text-[#c5a059] transition-colors"
                    >
                      EXIT VIEW
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
