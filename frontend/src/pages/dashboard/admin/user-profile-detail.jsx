import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, Phone, Calendar, FileText, 
  ChevronRight, ExternalLink, Download, Clock, MapPin
} from 'lucide-react';
import { getAdminUserProfile } from '../../../api/admin';

export default function UserProfileDetail({ userId, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminUserProfile(userId);
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center backdrop-blur-md bg-slate-900/40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c5a059]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-end backdrop-blur-md bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl h-full bg-white border-l border-gray-200 shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-right duration-500 rounded-l-[3rem] overflow-hidden">
        
        {/* Header */}
        <div className="p-8 pb-0 flex justify-between items-start">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] flex items-center justify-center text-white shadow-lg">
                 <User size={40} />
              </div>
              <div>
                 <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{user.name}</h2>
                 <p className="text-[#c5a059] text-xs font-black uppercase tracking-widest flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Client Account Active
                 </p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 text-slate-600 rounded-full transition-all hover:rotate-90">
              <X size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
           
           {/* Quick Stats */}
           <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Apps', value: user.applications?.length || 0, icon: FileText },
                { label: 'Documents', value: user.applications?.reduce((acc, app) => acc + (app.documents?.length || 0), 0), icon: Download },
                { label: 'Member Since', value: new Date(user.created_at).getFullYear(), icon: Calendar },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1">
                      <s.icon size={12} className="text-[#c5a059]" /> {s.label}
                   </p>
                   <p className="text-xl font-black text-slate-900">{s.value}</p>
                </div>
              ))}
           </div>

           {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-100 pb-2">Primary Identification</h4>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Email Protocol</label>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                       <Mail size={14} className="text-[#c5a059]" /> {user.email}
                    </div>
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Mobile Carrier</label>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                       <Phone size={14} className="text-[#c5a059]" /> {user.phone || 'Not Synchronized'}
                    </div>
                 </div>
                 <div className="col-span-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Residential Vector</label>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                       <MapPin size={14} className="text-[#c5a059]" /> {user.address || 'N/A'}, {user.city}, {user.state} {user.zip_code}
                    </div>
                 </div>
              </div>
           </div>

           {/* Financial Profile */}
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-100 pb-2">Financial Intelligence</h4>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">FICO (Est.)</p>
                    <p className="text-slate-900 font-black text-lg">{user.estimated_fico || 'N/A'}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">Net Worth (Est.)</p>
                    <p className="text-slate-900 font-black text-lg">{user.estimated_net_worth || 'N/A'}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">Occupation</p>
                    <p className="text-slate-900 font-bold">{user.occupation || 'N/A'}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <p className="text-slate-500 uppercase text-[9px] font-bold mb-1">Self Employed</p>
                    <p className="text-slate-900 font-bold">{user.self_employed || 'N/A'}</p>
                 </div>
              </div>
           </div>

           {/* Strategic Intent */}
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-100 pb-2">Strategic Goal</h4>
              <div className="bg-[#f9f7f2] p-6 rounded-[2rem] border border-[#c5a059]/20">
                 <p className="text-[#c5a059] uppercase text-[9px] font-black tracking-widest mb-3">Client Statement: "Why the loan is needed"</p>
                 <p className="text-slate-800 text-sm leading-relaxed italic font-medium">
                    {user.loan_intent || "No strategic intent provided at genesis."}
                 </p>
              </div>
           </div>

           {/* Applications List */}
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-100 pb-2">Active Strategic Applications</h4>
              <div className="space-y-3">
                 {user.applications?.length > 0 ? user.applications.map((app) => (
                   <div key={app.id} className="group bg-gray-50 p-5 rounded-2xl border border-gray-200 hover:border-[#c5a059]/30 transition-all">
                      <div className="flex justify-between items-start mb-3">
                         <div>
                            <p className="text-slate-900 font-black text-sm uppercase italic">{app.type}</p>
                            <p className="text-[10px] text-slate-500 font-medium">#{app.id.toString().padStart(5, '0')} // {app.property || 'No Address'}</p>
                         </div>
                         <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                           app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                         }`}>
                           {app.status}
                         </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                         <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                               {app.documents?.map((d, i) => (
                                 <div key={i} className="w-6 h-6 rounded-lg bg-[#c5a059] border-2 border-white flex items-center justify-center text-[8px] font-black text-white">DOC</div>
                               ))}
                            </div>
                            <span className="text-[10px] text-slate-500 font-bold">{app.documents?.length || 0} Assets Uploaded</span>
                         </div>
                         <p className="text-[#c5a059] font-black text-sm">{app.amount}</p>
                      </div>
                   </div>
                 )) : (
                   <p className="text-slate-500 text-xs text-center py-6">No legacy applications detected.</p>
                 )}
              </div>
           </div>

           {/* Timeline/History */}
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gray-100 pb-2">Lifecycle Interactions</h4>
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 flex items-center justify-center shrink-0 mt-1">
                       <Clock size={10} className="text-[#c5a059]" />
                    </div>
                    <div>
                       <p className="text-[11px] text-slate-900 font-bold">Genesis Node Created</p>
                       <p className="text-[9px] text-slate-500 uppercase font-black">{new Date(user.created_at).toLocaleString()}</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Footer Action */}
        <div className="p-8 border-t border-gray-100 flex gap-4">
           <button className="flex-1 bg-gray-50 text-slate-600 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-gray-100 hover:text-slate-900 transition-all border border-gray-200">
              Download Full Dossier
           </button>
           <button className="flex-1 bg-[#c5a059] text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20">
              Direct Communication
           </button>
        </div>

      </div>
    </div>
  );
}
