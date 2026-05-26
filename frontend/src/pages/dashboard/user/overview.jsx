import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  Briefcase, 
  AlertCircle, 
  Wallet, 
  CheckCircle2, 
  X,
  CreditCard,
  Target,
  ArrowRight,
  Home,
  Shield,
  Loader2,
  BadgeCheck
} from 'lucide-react';
import { requestActivation } from '../../../api/user';

export default function Overview({ user, data, setActiveTab }) {
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [activationLoading, setActivationLoading] = useState(false);
  const [activationMsg, setActivationMsg]         = useState('');
  const recentApplications = Array.isArray(data?.recent_applications) ? data.recent_applications : [];
  const activeApplications = Array.isArray(data?.applications) ? data.applications : [];
  
  const stats = [
    { label: 'Total Loan Requested', value: data?.stats?.total_requested || '$0', icon: Wallet, subtitle: 'All Time' },
    { label: 'Active Applications', value: data?.stats?.active_count ?? 0, icon: FileText, subtitle: 'In Progress' },
    { label: 'Approved Loans', value: data?.stats?.approved_count ?? 0, icon: CheckCircle, subtitle: 'All Time' },
    { label: 'Total Repaid', value: data?.stats?.repaid_amount || '$0', icon: CreditCard, subtitle: 'All Time' },
  ];

  if (showWithdrawForm) {
    // Keeping withdraw form logic as it's useful business logic
    return (
       <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-200 overflow-hidden">
             <div className="p-10 border-b border-gray-100 flex justify-between items-start">
                <div>
                   <h2 className="text-2xl font-black text-[#c5a059] italic uppercase tracking-tighter">Withdraw Funds</h2>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 px-1">Current Balance: <span className="text-slate-900 font-bold">{data?.stats?.available_balance || '$0.00'}</span></p>
                </div>
                <button onClick={() => setShowWithdrawForm(false)} className="text-slate-400 hover:text-slate-600 transition-all hover:rotate-90"><X size={28}/></button>
             </div>
             {/* ... form content ... */}
             <div className="p-10 text-center text-slate-500 font-bold">
               Withdrawal system initialized. Enter details below.
               <div className="mt-8">
                 <button onClick={() => setShowWithdrawForm(false)} className="px-8 py-3 bg-gray-100 rounded-full text-xs uppercase tracking-widest font-black text-slate-600 hover:bg-gray-200 transition-all">Back to Dashboard</button>
               </div>
             </div>
          </div>
       </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight">
            {user?.name?.split(' ')[0] || 'USER'}, <span className="text-[var(--text-muted)]">WELCOME BACK</span>
          </h1>
          <p className="text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-[0.2em] mt-1">
            Here's what's happening with your account today.
          </p>
        </div>
        <div className="flex items-center gap-4">
           {/* Notification Badge could go here if Topbar isn't sufficient */}
        </div>
      </div>

      {/* Hero Status Banner */}
      <div className="relative overflow-hidden bg-[var(--bg-surface)] rounded-[2rem] border border-[var(--border-color)] shadow-xl group transition-all duration-500 hover:border-[#c5a059]/20">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c5a059]/10 to-transparent pointer-events-none" />
         <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c5a059]/5 blur-[100px] pointer-events-none group-hover:bg-[#c5a059]/10 transition-all duration-700" />
         
         <div className="relative z-10 px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
               <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight uppercase">Check your account status</h2>
               <p className="text-[var(--text-muted)] text-lg font-medium">
                 You have <span className="text-[#c5a059] font-black">{data?.stats?.active_count ?? 0} active applications</span>
               </p>
               <button 
                onClick={() => setActiveTab('applications')}
                className="mt-4 flex items-center gap-3 px-8 py-3.5 bg-transparent border border-[#c5a059]/50 rounded-xl text-[#c5a059] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#c5a059] hover:text-[#05101c] transition-all shadow-xl shadow-[#c5a059]/10"
               >
                 View Application <ChevronRight size={16} />
               </button>
            </div>

            {/* 3D Illustration Mockup */}
            <div className="relative hidden md:block">
               <div className="w-56 h-72 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-gray-200 shadow-xl transform -rotate-12 translate-y-4 transition-transform group-hover:rotate-0 duration-700 p-6">
                  <div className="w-12 h-12 bg-[#c5a059] rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-[#c5a059]/20">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-3">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-4/5 bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-3/5 bg-[#c5a059]/30 rounded-full !mt-8" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <div className="w-8 h-12 bg-gray-200 rounded-t-lg" />
                     <div className="w-8 h-20 bg-[#c5a059]/50 rounded-t-lg" />
                     <div className="w-8 h-16 bg-gray-200 rounded-t-lg" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* ── Dynamic Activation Banner ── */}
      {(() => {
        if (user?.is_active) {
          return (
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <BadgeCheck size={24} />
                </div>
                <div>
                  <p className="text-emerald-800 font-black uppercase text-xs tracking-widest">Account Activated</p>
                  <p className="text-emerald-600 text-[11px] font-bold mt-0.5">
                    Your account has full access. Activated on {user.activated_at ? new Date(user.activated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'recently'}.
                  </p>
                </div>
              </div>
              <span className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
                ✓ Active
              </span>
            </div>
          );
        }

        if (user?.activation_requested) {
          return (
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 animate-pulse">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-amber-800 font-black uppercase text-xs tracking-widest">Activation Pending</p>
                  <p className="text-amber-600 text-[11px] font-bold mt-0.5">Your request has been submitted. Awaiting admin approval.</p>
                </div>
              </div>
              <span className="px-6 py-2.5 bg-amber-400 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
                Under Review
              </span>
            </div>
          );
        }

        // Default: not requested
        return (
          <div className="bg-white rounded-2xl p-6 border border-[#c5a059]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-slate-900 font-black uppercase text-xs tracking-widest">Account Not Activated</p>
                <p className="text-slate-500 text-[11px] font-bold mt-0.5">Activate your account to unlock full access to loan services.</p>
                {activationMsg && (
                  <p className="text-red-500 text-[10px] font-bold mt-1">{activationMsg}</p>
                )}
              </div>
            </div>
            <button
              disabled={activationLoading}
              onClick={async () => {
                setActivationLoading(true);
                setActivationMsg('');
                try {
                  await requestActivation();
                  // Refresh page data by reloading
                  window.location.reload();
                } catch (err) {
                  setActivationMsg(err?.message || err || 'Failed to submit. Please try again.');
                } finally {
                  setActivationLoading(false);
                }
              }}
              className="flex items-center gap-2 px-8 py-3 bg-[#c5a059] text-[#05101c] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#c5a059]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {activationLoading ? <Loader2 size={14} className="animate-spin" /> : null}
              {activationLoading ? 'Submitting...' : <>Request Activation <ChevronRight size={14} className="inline ml-1" /></>}
            </button>
          </div>
        );
      })()}

      {/* Dynamic Stage 2 Funding Alert */}
      {activeApplications.some(app => ['approved', 'credited', 'disbursed'].includes(app.status)) && (
        <div className="bg-[#c5a059] rounded-3xl p-8 border border-[#c5a059]/20 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_20px_50px_rgba(197,160,89,0.2)] animate-in slide-in-from-bottom duration-700 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 border border-black/5 text-[#05101c] text-[10px] font-black uppercase tracking-widest mb-4">
                 <Shield size={12} /> Priority Funding Protocol
              </div>
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">Stage 2: Fund Acquisition</h3>
              <p className="text-white/80 text-sm font-medium max-w-lg">
                Congratulations! Your application has been verified. You have now entered the funding cycle. Please proceed to your applications to request release codes and finalize your disbursement parameters.
              </p>
           </div>
           <button 
             onClick={() => setActiveTab('applications')}
             className="relative z-10 px-10 py-5 bg-white text-[#c5a059] rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
           >
              Proceed to Stage 2 <ArrowRight size={18} />
           </button>
        </div>
      )}

      {/* Stats Cards Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[var(--bg-surface)] rounded-[1.5rem] border border-[var(--border-color)] p-8 flex flex-col gap-6 group hover:border-[#c5a059]/30 transition-all duration-300 shadow-sm hover:shadow-md">
             <div className="flex justify-between items-start">
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-loose">
                  {s.label}
                </p>
                <div className="p-2.5 bg-[#c5a059]/5 rounded-xl text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-all">
                   <s.icon size={18} />
                </div>
             </div>
             <div>
                <p className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mt-2">
                  {s.subtitle}
                </p>
             </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Strategic Asset Inspection */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-[#c5a059]/10 rounded-xl flex items-center justify-center text-[#c5a059]">
                    <Target size={20} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight italic">
                       Strategic Asset Inspection
                    </h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Live Surveillance of Active Allocations</p>
                 </div>
              </div>
              <button 
                onClick={() => setActiveTab('applications')}
                className="group flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition-all shadow-sm"
              >
                 Open Portfolio <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           
           <div className="grid grid-cols-1 gap-6">
              {recentApplications.length > 0 ? recentApplications.map((app, idx) => (
                <div key={idx} className="bg-[var(--bg-surface)] rounded-[2rem] p-8 border border-[var(--border-color)] shadow-xl flex flex-col sm:flex-row items-center justify-between group hover:border-[#c5a059]/40 hover:shadow-[#c5a059]/5 transition-all relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-[60px] -mr-16 -mt-16 pointer-events-none" />
                   
                   <div className="flex items-center gap-8 w-full sm:w-auto">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                         <Briefcase size={28} />
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-3">
                            <p className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tighter italic">{app.type} Allocation</p>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                               Phase {app.processing_level >= 75 ? '2' : '1'}
                            </span>
                         </div>
                         <p className="text-sm font-medium text-slate-500 flex items-center gap-2 italic">
                            <Home size={14} className="text-[#c5a059]" /> {app.property}
                         </p>
                      </div>
                   </div>

                   <div className="flex items-center gap-10 mt-8 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-6 sm:pt-0">
                      <div className="space-y-2">
                         <div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">
                            <span>SURVEILLANCE</span>
                            <span className="text-[#c5a059]">{app.processing_level || 20}%</span>
                         </div>
                         <div className="w-32 bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-px">
                            <div className="bg-[#c5a059] h-full rounded-full shadow-[0_0_10px_rgba(197,160,89,0.3)]" style={{ width: `${app.processing_level || 20}%` }} />
                         </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('applications')}
                        className="flex items-center gap-3 px-8 py-3.5 bg-[#c5a059] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#c5a059]/20"
                      >
                         PROCEED TO INTEL <ArrowRight size={16} />
                      </button>
                   </div>
                </div>
              )) : (
                <div className="bg-[var(--bg-surface)] rounded-[3rem] border border-dashed border-[var(--border-color)] p-20 text-center shadow-xl">
                   <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                      <FileText size={32} />
                   </div>
                   <h4 className="text-[#c5a059] font-black uppercase italic text-2xl tracking-tighter">No Active Surveillance</h4>
                   <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest">Initialize a loan request to begin asset tracking.</p>
                </div>
              )}
           </div>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
           <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic px-2">
              Account Summary
           </h3>
           <div className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#c5a059]/5 blur-[60px] pointer-events-none" />
              
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                 <p className="text-slate-500">Membership Status</p>
                 <div className="flex items-center gap-2 text-green-500">
                    Active <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                 <p className="text-slate-500">Account Type</p>
                 <p className="text-[#c5a059]">Member</p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                 <p className="text-slate-500">Member Since</p>
                 <p className="text-slate-700">{user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'May 10, 2024'}</p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                 <button 
                  onClick={() => setActiveTab('settings')}
                  className="w-full py-4 rounded-xl bg-gray-50 text-slate-700 font-black uppercase text-[10px] tracking-widest hover:bg-[#c5a059] hover:text-white transition-all flex items-center justify-center gap-2"
                 >
                    Manage Profile <ArrowRight size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
