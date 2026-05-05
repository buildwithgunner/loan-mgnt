import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Award } from 'lucide-react';
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

export default function Referrals({ user }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const result = await apiClient('/dashboard/referrals');
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  const referralLink = `https://blackwolves.ac/ref/${user?.name?.toLowerCase().replace(/\s+/g, '') || 'partner'}`;

  const stats = [
    { label: 'Total Referrals', value: data?.stats?.total_count || '0', icon: Users },
    { label: 'Total Earned', value: data?.stats?.total_earned || '$0.00', icon: DollarSign },
    { label: 'Success Rate', value: data?.stats?.success_rate || '0%', icon: Award },
  ];

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in relative z-10 py-6">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Invite Friends</h2>
          <p className="text-slate-600 text-sm font-medium">Earn rewards for each successful referral — Black Wolves Acquisition LLC</p>
        </div>
      </div>

      <div className="text-center py-12 bg-white rounded-[3rem] border border-gray-100 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 blur-[120px] pointer-events-none" />
        <div className="w-24 h-24 bg-[#c5a059]/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#c5a059] rotate-12 relative z-10">
           <Users size={40} />
        </div>
        <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight relative z-10">Your Referral Network</h3>
        <p className="text-slate-600 text-sm font-medium mt-4 max-w-md mx-auto leading-relaxed relative z-10">
           Invite others to join Black Wolves and earn rewards when they successfully close their first loan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {stats.map((s, i) => (
           <div key={i} className="bg-white rounded-[2.5rem] p-10 text-center border border-gray-100 hover:border-[#c5a059]/30 transition-all group shadow-sm">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 group-hover:text-[#c5a059] transition-colors">{s.label}</p>
              <p className="text-4xl font-black text-[#c5a059] italic">{s.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-white p-12 rounded-[3rem] border border-gray-100 space-y-8 relative overflow-hidden shadow-sm">
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#c5a059]/5 blur-[80px] pointer-events-none" />
         <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] ml-1">Your Referral Link</label>
            <p className="text-slate-600 text-xs font-medium">Share this link with your friends and partners to track your rewards.</p>
         </div>
         <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <input 
              readOnly 
              value={referralLink}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 text-sm font-mono text-slate-900 focus:outline-none shadow-inner"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                Toast.fire({
                  title: 'LINK COPIED',
                  text: 'Referral identifier has been stored in memory.',
                  icon: 'info',
                  timer: 2000,
                  showConfirmButton: false
                });
              }}
              className="bg-[#c5a059] text-white font-black px-12 py-5 rounded-2xl text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/30"
            >
               COPY LINK
            </button>
         </div>
      </div>
    </div>
  );
}
