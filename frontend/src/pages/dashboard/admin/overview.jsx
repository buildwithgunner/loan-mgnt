import React, { useState, useEffect } from 'react';
import { Users, FileText, DollarSign, Clock, CheckCircle, XCircle, Eye, BarChart2 } from 'lucide-react';
import { getAdminStats, getAdminApplications, updateApplicationStatus } from '../../../api/admin';
import Swal from 'sweetalert2';
import { navigateTo } from '../../../App.jsx';

const statusMap = {
  'approved': { label: 'Approved', color: 'bg-emerald-100 text-emerald-700' },
  'under_review': { label: 'In Review', color: 'bg-blue-100 text-blue-700' },
  'pending': { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-700' },
};

export default function Overview({ setActiveTab }) {
  const [stats, setStats] = useState([]);
  const [charts, setCharts] = useState({ monthly: [], types: [] });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        getAdminStats(),
        getAdminApplications()
      ]);
      setStats(statsRes?.stats || (Array.isArray(statsRes) ? statsRes : []));
      setCharts({
        monthly: Array.isArray(statsRes?.charts?.monthly) ? statsRes.charts.monthly : [],
        types: Array.isArray(statsRes?.charts?.types) ? statsRes.charts.types : [],
      });
      const appsList = Array.isArray(appsRes) ? appsRes : (appsRes?.applications || []);
      setApplications(appsList);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.data?.type === 'connection_error') {
        Swal.fire({
          icon: 'error',
          title: 'DATABASE OFFLINE',
          text: 'The backend cannot connect to MySQL. Please ensure your database service is running.',
          background: '#0c1a24',
          color: '#fff',
          confirmButtonColor: '#c5a059'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateApplicationStatus(id, newStatus);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: `Application marked as ${newStatus}`
      });
      fetchData(); // Refresh the data to update the table
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update application status.'
      });
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 animate-pulse">
      <div className="w-12 h-12 border-4 border-[#c5a059]/20 border-t-[#c5a059] rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compiling Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-[var(--text-primary)] uppercase italic tracking-tighter">Command Center</h2>
        <p className="text-[var(--text-muted)] text-sm font-medium">Real-time platform intelligence — Black Wolves Acquisition LLC.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.label === 'Total Users' ? Users : 
                      s.label === 'Active Applications' ? FileText : 
                      s.label === 'Loans Funded (Total)' ? DollarSign : 
                      s.label === 'Pending Review' ? Clock : Users;
          return (
            <div 
              key={i} 
              onClick={() => {
                let tab = 'overview';
                if (s.label === 'Total Users') tab = 'users';
                else if (s.label === 'Active Applications') tab = 'applications';
                else if (s.label === 'Rejected Loans') tab = 'disapproved';
                
                if (tab !== 'overview') {
                   setActiveTab(tab);
                   navigateTo(`/admin/${tab}`);
                }
              }}
              className="glass-panel rounded-2xl border border-white/5 p-8 flex items-start gap-5 hover:bg-[#c5a059]/5 hover:border-[#c5a059]/30 transition-all group cursor-pointer shadow-sm"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} border border-[#c5a059]/10 group-hover:scale-110 transition-transform shadow-sm`}>
                <Icon size={24} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-white tracking-tight">{s.value}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{s.label}</p>
                <div className="flex items-center gap-1.5 mt-2">
                   <div className={`w-1 h-1 rounded-full ${s.up ? 'bg-emerald-500' : 'bg-red-400'}`} />
                   <p className={`text-[10px] font-black uppercase tracking-widest ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>System Optimal</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-1 xl:col-span-2 glass-panel rounded-2xl border border-white/5 p-8 relative shadow-sm">
          <div className="flex justify-between items-center mb-10">
             <h3 className="font-black text-[#c5a059] text-[10px] uppercase tracking-widest flex items-center gap-2">
               <BarChart2 size={14} /> Capital Velocity Timeline
             </h3>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/10">Dynamic Metric</span>
          </div>
          <div className="flex items-end gap-5 h-48 px-4">
            {charts.monthly.map((m, i) => {
              const max = Math.max(...charts.monthly.map(x => x.value), 1);
              const h = (m.value / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-xl bg-gradient-to-t from-[#c5a059] to-[#e6c98a] transition-all duration-1000 shadow-[0_0_20px_rgba(197,160,89,0.2)] group-hover:brightness-125"
                      style={{ height: `${h || 10}%`, minHeight: '4px' }}
                    />
                    <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-[#c5a059]">{m.value}</div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loan types */}
        <div className="glass-panel rounded-2xl border border-white/5 p-8 shadow-sm">
          <h3 className="font-black text-[#c5a059] text-[10px] uppercase tracking-widest mb-8 flex items-center gap-2">
             <Users size={14} /> Portfolio Distribution
          </h3>
          <div className="space-y-8">
            {Array.isArray(charts.types) && charts.types.length > 0 ? charts.types.map((l, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">
                  <span className="group-hover:text-[#c5a059] transition-colors">{l.label}</span>
                  <span className="text-[#c5a059]">{l.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-px">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#c5a059] to-[#e6c98a] shadow-[0_0_10px_rgba(197,160,89,0.3)] transition-all duration-1000" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            )) : (
              <div className="py-20 text-center space-y-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Waiting for Data Allocation</p>
                 <div className="flex justify-center gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-[#c5a059]/30 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}} />)}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Applications table */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
           <h3 className="font-black text-[#c5a059] text-[10px] uppercase tracking-widest">Inbound Pipeline — Recent</h3>
           <button onClick={() => { setActiveTab('applications'); navigateTo('/admin/applications'); }} className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#c5a059] transition-colors">VIEW FULL REGISTRY →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-[10px] text-slate-400 uppercase font-black tracking-widest">
              <tr>
                {['ID','Applicant','Type','Amount','Status','Date','Actions'].map(h => (
                  <th key={h} className="px-8 py-5 text-left border-b border-white/5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.slice(0, 5).map(app => {
                return (
                  <tr key={app.id} className="hover:bg-[#c5a059]/5 transition-colors group">
                    <td className="px-8 py-5 font-mono text-xs text-[#c5a059]">#{app.id.toString().padStart(4, '0')}</td>
                    <td className="px-8 py-5 font-bold text-white whitespace-nowrap">{app.user}</td>
                    <td className="px-8 py-5 text-slate-400 text-xs font-medium uppercase">{app.type}</td>
                    <td className="px-8 py-5 font-black text-white">{app.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 ${
                        ['approved', 'disbursed', 'credited'].includes(app.status) ? 'bg-emerald-500/10 text-emerald-500' : 
                        app.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-red-500/10 text-red-500'
                      }`}>
                         {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 shadow-inner text-slate-400 text-[11px] font-bold whitespace-nowrap">{app.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => { setActiveTab('applications'); navigateTo('/admin/applications'); }}
                          className="text-slate-500 hover:text-[#c5a059] transition-colors" title="View Application"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'approved')}
                          className="text-slate-500 hover:text-emerald-500 transition-colors" title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(app.id, 'rejected')}
                          className="text-slate-500 hover:text-red-400 transition-colors" title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
