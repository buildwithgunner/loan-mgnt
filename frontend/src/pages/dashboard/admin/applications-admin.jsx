import React, { useState, useEffect } from 'react';
import { 
  Eye, CheckCircle, XCircle, Clock, Info, 
  Settings, Key, AlertTriangle, ShieldCheck, X, Shield
} from 'lucide-react';
import { 
  getAdminApplications, 
  updateApplicationStatus, 
  updateApplicationProgress,
  generateApprovalCodeDirectly,
  generateTrackingCodeDirectly,
  generateBothCodesDirectly,
  updateApplicationDetails
} from '../../../api/admin';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../../../api/client.js';

const MySwal = withReactContent(Swal);

// Luxury themed SweetAlert mixin
const Toast = MySwal.mixin({
  background: '#0c1a24',
  color: '#ffffff',
  customClass: {
    popup: 'rounded-3xl border border-gray-100 shadow-xl bg-white',
    confirmButton: 'bg-[#c5a059] text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg',
    cancelButton: 'bg-gray-100 text-slate-600 font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});

const statusMap = {
  'approved': { label: 'Approved', color: 'bg-emerald-100 text-emerald-700' },
  'under_review': { label: 'In Review', color: 'bg-blue-100 text-blue-700' },
  'pending': { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  'credited': { label: 'Credited', color: 'bg-indigo-100 text-indigo-700' },
  'disbursed': { label: 'Disbursed', color: 'bg-emerald-200 text-emerald-900' },
};

export default function ApplicationsAdmin({ filterProp = 'all' }) {
  const [filter, setFilter] = useState(filterProp);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    setFilter(filterProp);
  }, [filterProp]);

  // Progress Edit State
  const [editProgress, setEditProgress] = useState({ stage: '', level: 20 });
  
  // Field Edit State
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editFields, setEditFields] = useState({ amount: '', property: '', type: '' });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getAdminApplications();
      setApplications(res.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatusUpdate = async (id, status) => {
    const result = await Toast.fire({
      title: 'CONFIRM PROTOCOL',
      text: `Initiate status transition to [${status.toUpperCase()}]?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'EXECUTE',
      cancelButtonText: 'ABORT'
    });

    if (!result.isConfirmed) return;

    try {
      await updateApplicationStatus(id, status);
      Toast.fire({
        title: 'PROTOCOL EXECUTED',
        text: 'System state has been synchronized.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      fetchApplications(); 
      // If modal is open, update local selected app status to refresh the gate
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
    } catch (error) {
      Toast.fire({
        title: 'EXECUTION FAILED',
        text: error.response?.data?.message || 'A network error occurred.',
        icon: 'error'
      });
    }
  };

  const handleProgressUpdate = async () => {
    try {
      await updateApplicationProgress(selectedApp.id, {
        processing_stage: editProgress.stage,
        processing_level: editProgress.level
      });
      setShowManageModal(false);
      Toast.fire({
        title: 'DATA SYNCED',
        text: 'Lifecycle tracking parameters updated.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      fetchApplications();
    } catch (error) {
      Toast.fire({
        title: 'SYNC ERROR',
        text: 'Failed to update tracking parameters.',
        icon: 'error'
      });
    }
  };

  const handleGenerateCode = async (id) => {
    try {
      await generateApprovalCodeDirectly(id);
      fetchApplications();
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };

  const handleGenerateTrackingCode = async (id) => {
    try {
      await generateTrackingCodeDirectly(id);
      fetchApplications();
    } catch (error) {
      console.error('Error generating tracking code:', error);
    }
  };

  const handleGenerateBothCodes = async (id) => {
    try {
      await generateBothCodesDirectly(id);
      Toast.fire({
        title: 'CODES GENERATED',
        text: 'Both codes have been securely generated.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      fetchApplications();
      if(selectedApp && selectedApp.id === id) {
         setSelectedApp({...selectedApp, codes_requested: false}); // local optimistic update
      }
    } catch (error) {
      console.error('Error generating both codes:', error);
      Toast.fire({
        title: 'GENERATION FAILED',
        text: 'An error occurred while generating codes.',
        icon: 'error'
      });
    }
  };

  const handleDetailsUpdate = async () => {
    try {
      await updateApplicationDetails(selectedApp.id, editFields);
      setIsEditingDetails(false);
      Toast.fire({
        title: 'RECORD UPDATED',
        text: 'Loan particulars successfully modified.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      fetchApplications();
      setSelectedApp({ ...selectedApp, ...editFields });
    } catch (error) {
      Toast.fire({
        title: 'UPDATE REJECTED',
        text: 'Server refused to commit record changes.',
        icon: 'error'
      });
    }
  };

  const openManageModal = (app) => {
    setSelectedApp(app);
    setEditProgress({ 
      stage: app.processing_stage || 'Pending', 
      level: app.processing_level || 20 
    });
    setEditFields({
      amount: app.amount_raw || app.amount,
      property: app.property,
      type: app.type
    });
    setIsEditingDetails(false);
    setShowManageModal(true);
  };

  const filtered = applications.filter(a => {
    const user = (a.user || '').toLowerCase();
    const id = (a.id || '').toString();
    const term = search.toLowerCase();
    const matchesSearch = user.includes(term) || id.includes(term);
    
    let matchesFilter = filter === 'all' || a.status === filter;
    if (filter === 'funding') {
      matchesFilter = ['approved', 'credited'].includes(a.status);
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">
            {filter === 'rejected' ? 'Rejected Loans' : filter === 'funding' ? 'Funding Phase (Stage 2)' : 'Loan Management'}
          </h2>
          <p className="text-slate-500 text-sm font-medium">Review and process loan applications</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
           <span>Filter Applications:</span>
            <div className="relative">
              <input 
                 type="text" 
                 className="glass-panel border border-white/10 rounded-xl px-4 py-2.5 w-72 focus:outline-none focus:border-[#c5a059] text-white transition-all shadow-sm placeholder:text-slate-500"
                 placeholder="Search by name or ID..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
            </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a059] mx-auto mb-4"></div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading Applications...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-black uppercase tracking-widest">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Application ID</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Progress</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((app, index) => (
                  <tr key={app.id} className="text-slate-300 font-medium hover:bg-[#c5a059]/5 transition-colors">
                    <td className="px-4 py-5 font-mono text-[#c5a059]">#{app.id.toString().padStart(5, '0')}</td>
                    <td className="px-4 py-5 font-bold text-white">{app.user}</td>
                    <td className="px-4 py-5">{app.amount}</td>
                    <td className="px-4 py-5">{app.date}</td>
                      <td className="px-4 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          app.status === 'approved' && app.processing_level >= 100 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          ['approved', 'under_review'].includes(app.status) ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          app.status === 'credited' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                          app.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                          app.status === 'disbursed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                           {app.status === 'approved' && app.processing_level < 100 ? 'PROCESSING' : 
                            app.status === 'under_review' ? 'PROCESSING' : app.status}
                        </span>
                        <div className="mt-1 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                          {app.processing_level >= 75 ? 'Phase 2: Funding' : 'Phase 1: Diligence'}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-col gap-1.5 min-w-[120px]">
                          <div className="flex justify-between items-center text-[10px] font-black">
                            <span className="text-[#c5a059] italic uppercase">{app.processing_level}%</span>
                            <span className="text-slate-500 uppercase tracking-tighter">COMPLETE</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="bg-gradient-to-r from-[#c5a059] to-amber-300 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(197,160,89,0.3)]"
                              style={{ width: `${app.processing_level}%` }}
                            />
                          </div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                            {app.processing_stage || 'PENDING'}
                          </div>
                        </div>
                      </td>
                    <td className="px-4 py-5 text-right">
                       {app.codes_requested && !app.approval_code && !app.tracking_code && (
                         <span className="inline-block mr-3 px-2 py-1 rounded bg-amber-500/20 text-amber-500 text-[9px] font-black uppercase tracking-widest border border-amber-500/30 animate-pulse">
                           Code Req.
                         </span>
                       )}
                       <button 
                         onClick={() => openManageModal(app)}
                         className="p-2 hover:bg-[#c5a059] hover:text-white rounded-xl transition-all text-[#c5a059] border border-[#c5a059]/30"
                       >
                         <Settings size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showManageModal && selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 overflow-y-auto">
           <div className="bg-[var(--bg-surface)] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-8 border border-[var(--border-color)]">
              <div className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] px-6 py-5 flex justify-between items-center text-[#05101c]">
                 <h3 className="text-xl font-black uppercase italic tracking-tighter">Application Management</h3>
                 <button onClick={() => setShowManageModal(false)} className="hover:rotate-90 transition-transform text-[#05101c]"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                 {/* Details Section */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Loan Particulars</h4>
                       <button 
                         onClick={() => setIsEditingDetails(!isEditingDetails)}
                         className="text-[10px] font-black text-[#c5a059] uppercase hover:underline"
                       >
                         {isEditingDetails ? 'CANCEL EDIT' : 'EDIT DETAILS'}
                       </button>
                    </div>

                    {isEditingDetails ? (
                      <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase">Amount</label>
                                <input 
                                  type="text" 
                                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#c5a059] outline-none shadow-sm"
                                  value={editFields.amount}
                                  onChange={(e) => setEditFields({...editFields, amount: e.target.value})}
                                />
                             </div>
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase">Loan Type</label>
                                <input 
                                  type="text" 
                                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-slate-900 text-sm focus:border-[#c5a059] outline-none shadow-sm"
                                  value={editFields.type}
                                  onChange={(e) => setEditFields({...editFields, type: e.target.value})}
                                />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[9px] font-black text-slate-500 uppercase">Property Address</label>
                             <input 
                               type="text" 
                               className="w-full bg-[#05101c] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-[#c5a059] outline-none shadow-sm"
                               value={editFields.property}
                               onChange={(e) => setEditFields({...editFields, property: e.target.value})}
                             />
                          </div>
                         <button 
                           onClick={handleDetailsUpdate}
                           className="w-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[10px] font-black py-2 rounded-lg hover:bg-emerald-500 hover:text-white transition-all uppercase tracking-widest"
                         >
                           Save Application Changes
                         </button>
                      </div>
                     ) : (
                      <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                        <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">Financial Request</p>
                          <p className="text-xl text-[#c5a059] font-black">{selectedApp.amount}</p>
                        </div>
                        <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">Asset Category</p>
                          <p className="text-xl text-[var(--text-primary)] font-black truncate">{selectedApp.type}</p>
                        </div>
                        <div className="col-span-2 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">Target Property</p>
                          <p className="text-sm text-[var(--text-primary)] font-bold">{selectedApp.property}</p>
                        </div>
                      </div>
                    )}
                 </div>

                 {/* Strategic Intent & Asset Intelligence */}
                 <div className="space-y-4 animate-in fade-in duration-500">
                    <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Strategy & Asset Intelligence</h4>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                       <div className="col-span-2 bg-[#c5a059]/10 p-4 rounded-xl border border-[#c5a059]/20">
                          <p className="text-[#c5a059] uppercase text-[9px] font-black tracking-widest mb-2">Primary Loan Purpose (The "Why")</p>
                          <p className="text-[var(--text-primary)] font-bold text-sm">
                             {selectedApp.form_data?.purpose || 'Not specified by client'}
                          </p>
                       </div>
                        <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                           <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Purchase Price / Value</p>
                           <p className="text-[var(--text-primary)] font-black">{selectedApp.form_data?.purchasePrice || 'N/A'}</p>
                        </div>
                        <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                           <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Requested Term</p>
                           <p className="text-[var(--text-primary)] font-black">{selectedApp.form_data?.loanDuration || 'N/A'}</p>
                        </div>
                        <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                           <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Estimated FICO</p>
                           <p className="text-[var(--text-primary)] font-black">{selectedApp.borrower?.fico || selectedApp.form_data?.estimatedFico || 'N/A'}</p>
                        </div>
                        <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                           <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Net Worth Est.</p>
                           <p className="text-[var(--text-primary)] font-black">{selectedApp.borrower?.net_worth || selectedApp.form_data?.estimatedNetWorth || 'N/A'}</p>
                        </div>
                     </div>
                 </div>

                 {/* Borrower Detailed Profile */}
                 {(selectedApp.form_data || selectedApp.borrower) && (
                     <div className="space-y-4 animate-in fade-in duration-500">
                       <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Borrower Profile Data</h4>
                       <div className="grid grid-cols-2 gap-3 text-[11px]">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">SSN</p>
                             <p className="text-[var(--text-primary)] font-mono">{selectedApp.borrower?.ssn || selectedApp.form_data?.ssn || 'N/A'}</p>
                          </div>
                          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                             <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Birth Date</p>
                             <p className="text-[var(--text-primary)] font-bold">{selectedApp.borrower?.dob || (selectedApp.form_data?.dobMonth ? `${selectedApp.form_data.dobMonth}/${selectedApp.form_data.dobDay}/${selectedApp.form_data.dobYear}` : 'MM/DD/YYYY')}</p>
                          </div>
                          <div className="col-span-2 bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                             <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Residential Address</p>
                             <p className="text-[var(--text-primary)] text-xs font-bold">{selectedApp.borrower?.address?.trim() || (selectedApp.form_data?.address ? `${selectedApp.form_data.address}, ${selectedApp.form_data.city}, ${selectedApp.form_data.state} ${selectedApp.form_data.zipCode}` : 'N/A')}</p>
                          </div>
                          <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                             <p className="text-[var(--text-muted)] uppercase text-[9px] font-bold mb-1">Occupation</p>
                             <p className="text-[var(--text-primary)] font-bold truncate">{selectedApp.borrower?.occupation || selectedApp.form_data?.occupation || 'N/A'}</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">Credit (Est.)</p>
                             <p className="text-white">{selectedApp.form_data?.estimatedFico || 'N/A'}</p>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">Co-Borrower</p>
                             <p className="text-white">{selectedApp.form_data?.hasCoBorrower === 'yes' ? 'Yes' : 'No'}</p>
                          </div>
                       </div>
                    </div>
                 )}

                  {/* Code Generation Section - Only visible during withdrawal/payment stage */}
                  {['approved', 'credited', 'disbursed'].includes(selectedApp.status) && (
                 <div className="space-y-4">
                    {selectedApp.codes_requested && (!selectedApp.approval_code || !selectedApp.tracking_code) && (
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-1">Attention Required</p>
                           <p className="text-slate-400 text-xs font-medium">User has requested Authorization and Tracking codes.</p>
                        </div>
                        <button 
                          onClick={() => handleGenerateBothCodes(selectedApp.id)}
                          className="bg-amber-500 text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest hover:bg-amber-600 transition-all hover:scale-105"
                        >
                          GENERATE BOTH CODES
                        </button>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Approval Code</p>
                          <p className="text-sm font-mono text-emerald-500">{selectedApp.approval_code || '---'}</p>
                          <button 
                            onClick={() => handleGenerateCode(selectedApp.id)}
                            className="w-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black py-2 rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            {selectedApp.approval_code ? 'REGENERATE' : 'GENERATE CURRENT'}
                          </button>
                       </div>
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Tracking Code</p>
                          <p className="text-sm font-mono text-indigo-400">{selectedApp.tracking_code || '---'}</p>
                          <button 
                            onClick={() => handleGenerateTrackingCode(selectedApp.id)}
                            className="w-full bg-indigo-500/10 text-indigo-400 text-[9px] font-black py-2 rounded-lg border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all"
                          >
                            {selectedApp.tracking_code ? 'REGENERATE' : 'GENERATE CURRENT'}
                          </button>
                       </div>
                    </div>
                 </div>
                  )}

                  {selectedApp.bank_details?.bank_name && (
                    <div className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] space-y-3 shadow-sm">
                      <h4 className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Withdrawal Account Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-medium text-[var(--text-muted)]">
                        <div><p className="text-[var(--text-muted)] mb-1">Bank Name</p><p className="font-bold text-[var(--text-primary)]">{selectedApp.bank_details.bank_name}</p></div>
                        <div><p className="text-[var(--text-muted)] mb-1">Account Name</p><p className="font-bold text-[var(--text-primary)]">{selectedApp.bank_details.account_name}</p></div>
                        <div className="col-span-2"><p className="text-[var(--text-muted)] mb-1">Account Number</p><p className="font-bold text-[var(--text-primary)] text-sm font-mono">{selectedApp.bank_details.account_number}</p></div>
                      </div>
                    </div>
                  )}

                 {selectedApp.guarantor?.name && (
                    <div className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] space-y-3 shadow-sm">
                      <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Guarantor Profile</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-medium text-[var(--text-muted)]">
                        <div><p className="text-[var(--text-muted)] mb-1">Name</p><p className="font-bold text-[var(--text-primary)]">{selectedApp.guarantor.name}</p></div>
                        <div><p className="text-[var(--text-muted)] mb-1">Phone</p><p className="font-bold text-[var(--text-primary)]">{selectedApp.guarantor.phone}</p></div>
                        <div><p className="text-[var(--text-muted)] mb-1">Email</p><p className="truncate font-bold text-[var(--text-primary)]">{selectedApp.guarantor.email}</p></div>
                        <div><p className="text-[var(--text-muted)] mb-1">Address</p><p className="truncate font-bold text-[var(--text-primary)]">{selectedApp.guarantor.address}</p></div>
                      </div>
                    </div>
                 )}

                 {selectedApp.documents?.length > 0 && (
                    <div className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)] space-y-3 shadow-sm">
                      <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Documents Supplied</h4>
                      <div className="space-y-2">
                        {selectedApp.documents.map(doc => (
                          <div key={doc.id} className="flex justify-between items-center bg-[var(--bg-surface)] p-3 rounded-lg border border-[var(--border-color)] shadow-sm">
                            <span className="text-xs text-[var(--text-primary)] font-medium truncate max-w-[200px]">{doc.name}</span>
                             <a href={`${BASE_URL}/admin/documents/${doc.id}/view?token=${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')}`} target="_blank" rel="noreferrer" className="text-[10px] bg-[#c5a059] text-black px-4 py-1.5 rounded-lg font-black hover:scale-105 transition-all shadow-sm">VIEW ASSET</a>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}

                 <div className="space-y-4">
                    {/* Progress Parameters Gate */}
                    <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl space-y-6">
                      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                        <h4 className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.2em] flex items-center gap-2">
                          <Clock size={14} /> {editProgress.level >= 75 ? 'Phase 2: Funding Intelligence' : 'Phase 1: Diligence Intelligence'}
                        </h4>
                        {['under_review', 'approved', 'credited', 'disbursed'].includes(selectedApp.status) ? (
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Authorized</span>
                        ) : (
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5 italic shadow-sm">Approval Required</span>
                        )}
                      </div>

                      {['approved', 'credited', 'disbursed'].includes(selectedApp.status) ? (
                        <div className="grid grid-cols-1 gap-8 pt-2">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Progress Stage</label>
                            <select
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                              value={editProgress.stage}
                              onChange={(e) => {
                                const val = e.target.value;
                                let newLevel = editProgress.level;
                                if (val.includes('50%')) newLevel = 50;
                                else if (val.includes('60%')) newLevel = 60;
                                else if (val.includes('70%')) newLevel = 70;
                                else if (val.includes('80%')) newLevel = 80;
                                else if (val.includes('90%')) newLevel = 90;
                                else if (val === 'Withdrawal') newLevel = 95;
                                else if (val === 'APPROVED' || val === 'CREDITED' || val === 'DISBURSED') newLevel = 100;
                                else if (val === 'Pending') newLevel = 20;
                                else if (val === 'Under Review') newLevel = 30;
                                
                                setEditProgress({ ...editProgress, stage: val, level: newLevel });
                              }}
                            >
                              <option className="bg-slate-950">Pending</option>
                              <option className="bg-slate-950" value="Under Review">Under Review</option>
                              <option className="bg-slate-950">Processing 50%</option>
                              <option className="bg-slate-950">Processing 60%</option>
                              <option className="bg-slate-950">Processing 70%</option>
                              <option className="bg-slate-950">Processing 80%</option>
                              <option className="bg-slate-950">Processing 90%</option>
                              <option className="bg-slate-950">Withdrawal</option>
                              <option className="bg-slate-950">Contact Care</option>
                              <option className="bg-slate-950">APPROVED</option>
                              <option className="bg-slate-950">DISAPPROVED</option>
                              <option className="bg-slate-950" value="CREDITED">CREDITED</option>
                              <option className="bg-slate-950" value="DISBURSED">DISBURSED</option>
                            </select>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Percent Completion</label>
                               <span className="text-xl font-black text-[#c5a059] italic tracking-tighter">{editProgress.level}%</span>
                            </div>
                            <input
                              type="range" min="0" max="100" step="5"
                              value={editProgress.level}
                              onChange={(e) => {
                                const level = parseInt(e.target.value);
                                let newStage = editProgress.stage;
                                if (level === 50) newStage = 'Processing 50%';
                                else if (level === 60) newStage = 'Processing 60%';
                                else if (level === 70) newStage = 'Processing 70%';
                                else if (level === 80) newStage = 'Processing 80%';
                                else if (level === 90) newStage = 'Processing 90%';
                                else if (level === 95) newStage = 'Withdrawal';
                                else if (level === 100) newStage = 'APPROVED';
                                else if (level === 20) newStage = 'Pending';
                                else if (level === 30) newStage = 'Under Review';
                                else if (level > 30 && level < 100) newStage = `Processing ${level}%`;
                                
                                setEditProgress({ ...editProgress, stage: newStage, level: level });
                              }}
                              className="w-full accent-[#c5a059]"
                            />
                          </div>
                          <button 
                            onClick={handleProgressUpdate} 
                            className="w-full bg-[#c5a059] text-white font-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#c5a059]/20"
                          >
                            UPDATE TRACKER STATUS
                          </button>
                        </div>
                      ) : (
                        <div className="py-10 text-center space-y-4">
                          <Shield className="mx-auto text-slate-500 opacity-20" size={48} />
                           <p className="text-xs text-[var(--text-muted)] font-medium max-w-[200px] mx-auto leading-relaxed">
                             Please <span className="text-[#c5a059] font-black">START PROCESSING</span> this application first to unlock parameters.
                           </p>
                        </div>
                      )}
                    </div>
                 </div>
               </div>
                <div className="p-8 pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-3 items-center justify-center">
                   {selectedApp.status === 'pending' && (
                     <button 
                       onClick={() => handleStatusUpdate(selectedApp.id, 'under_review')} 
                       className="bg-[#c5a059] text-[#05101c] font-black px-10 py-3 rounded-full text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                     >
                       START PROCESSING
                     </button>
                   )}

                   {selectedApp.status === 'under_review' && (
                     <div className="flex flex-col gap-2">
                       <button 
                         onClick={async () => {
                           try {
                             await updateApplicationProgress(selectedApp.id, {
                               processing_stage: 'Withdrawal',
                               processing_level: 95
                             });
                             handleStatusUpdate(selectedApp.id, 'approved');
                           } catch (err) {
                             console.error('Failed to auto-update progress:', err);
                             handleStatusUpdate(selectedApp.id, 'approved');
                           }
                         }} 
                         className="bg-[#c5a059] text-[#05101c] font-black px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_25px_rgba(197,160,89,0.4)] border-2 border-white/20"
                       >
                         INITIATE STAGE 2: READY FOR FUNDING
                       </button>
                       <p className="text-[9px] font-black text-center text-slate-500 uppercase tracking-widest italic">
                         Moves application to withdrawal phase and alerts client
                       </p>
                     </div>
                   )}

                   {['approved', 'credited', 'disbursed'].includes(selectedApp.status) && (
                     <>
                       {selectedApp.codes_requested && !selectedApp.approval_code && !selectedApp.tracking_code && (
                         <button 
                           onClick={() => handleGenerateBothCodes(selectedApp.id)}
                           className="bg-amber-500 text-[#05101c] font-black px-10 py-3 rounded-full text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse"
                         >
                           GENERATE BOTH RELEASE CODES
                         </button>
                       )}
                       <button onClick={() => handleStatusUpdate(selectedApp.id, 'credited')} className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black px-6 py-3 rounded-full text-[11px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">MARK CREDITED</button>
                       <button onClick={() => handleStatusUpdate(selectedApp.id, 'disbursed')} className="bg-emerald-500 text-white font-black px-6 py-3 rounded-full text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">MARK DISBURSED</button>
                     </>
                   )}

                   {selectedApp.status === 'rejected' && (
                     <button 
                       onClick={() => handleStatusUpdate(selectedApp.id, 'pending')} 
                       className="bg-[#c5a059] text-[#05101c] font-black px-10 py-3 rounded-full text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                     >
                       RE-OPEN APPLICATION (PENDING)
                     </button>
                   )}

                   <button onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')} className="bg-red-500/10 text-red-400 border border-red-500/20 font-black px-6 py-3 rounded-full text-[11px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">REJECT LOAN</button>
                </div>
               <div className="px-8 pb-8 pt-0 flex justify-end">
                 <button onClick={() => setShowManageModal(false)} className="text-slate-500 font-black text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors">TERMINATE VIEW</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}
