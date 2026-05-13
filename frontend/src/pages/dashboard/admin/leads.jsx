import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, Mail, Phone, Calendar, CheckCircle, Copy, Plus } from 'lucide-react';
import { getAdminLeads, createAdminLead } from '../../../api/admin';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#ffffff',
  color: '#0f172a',
  customClass: {
    popup: 'rounded-3xl border border-gray-100 shadow-xl bg-white',
    confirmButton: 'bg-[#c5a059] text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg',
    cancelButton: 'bg-gray-100 text-slate-600 font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', loan_type: 'Fix and Flip', purpose: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await getAdminLeads();
      setLeads(res.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleCreateLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createAdminLead(newLead);
      Toast.fire({
        title: 'LEAD GENERATED',
        text: 'System has assigned a unique interest code to this prospect.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      setShowAddModal(false);
      setNewLead({ name: '', email: '', phone: '', loan_type: 'Fix and Flip', purpose: '' });
      fetchLeads();
    } catch (err) {
      Toast.fire({
        title: 'PROTOCOL ERROR',
        text: 'Failed to initialize lead record.',
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Toast.fire({
      title: 'COPIED',
      text: 'Interest code stored in clipboard.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.interest_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] tracking-tighter uppercase italic">Interested Loans</h2>
          <p className="text-slate-500 text-sm font-medium">Interest code generation and lead tracking — Black Wolves Acquisition LLC</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-[#c5a059] text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/10"
        >
          <UserPlus size={16} /> GENERATE NEW CODE
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search leads by name or code..."
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 text-center">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a059] mx-auto mb-4"></div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compiling Database...</p>
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-secondary)] text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Interest Code</th>
                  <th className="px-8 py-5">Prospect</th>
                  <th className="px-8 py-5">Loan Category</th>
                  <th className="px-8 py-5">Purpose/Intent</th>
                  <th className="px-8 py-5">Contact Details</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-emerald-400 font-black text-[15px] tracking-tighter">{lead.interest_code}</span>
                        <button 
                          onClick={() => copyToClipboard(lead.interest_code)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900 uppercase text-[13px]">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Status: {lead.status}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-gray-200">
                        {lead.loan_type || 'N/A'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] text-slate-600 italic line-clamp-2 max-w-[200px]">
                        {lead.purpose || 'No message provided.'}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Mail size={12} className="text-[#c5a059]" /> {lead.email || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Phone size={12} className="text-[#c5a059]" /> {lead.phone || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="text-[10px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors">MARK CONTACTED</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No matching prospects found in database.</p>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 overflow-y-auto">
          <div className="bg-[var(--bg-surface)] rounded-[2rem] w-full max-w-lg border border-[var(--border-color)] shadow-2xl overflow-hidden animate-in zoom-in duration-300 my-8">
            <div className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] px-8 py-6 flex justify-between items-center text-[#05101c]">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Initialize Prospect</h3>
              <button onClick={() => setShowAddModal(false)} className="hover:rotate-90 transition-transform">
                <Plus size={28} className="rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest ml-1">Client Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                  placeholder="e.g. David Harrison"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Email Protocol</label>
                  <input 
                    type="email"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[#c5a059] transition-all text-sm shadow-sm"
                    placeholder="client@vault.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Phone Link</label>
                  <input 
                    type="text"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[#c5a059] transition-all text-sm shadow-sm"
                    placeholder="+1 (555) 000-0000"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Desired Capital Strategy</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                  value={newLead.loan_type}
                  onChange={(e) => setNewLead({...newLead, loan_type: e.target.value})}
                >
                  <option className="bg-white">Fix and Flip</option>
                  <option className="bg-white">New Construction</option>
                  <option className="bg-white">Cash-Out Refinance</option>
                  <option className="bg-white">Fix and Lease</option>
                  <option className="bg-white">Conventional Loan</option>
                  <option className="bg-white">Mobile Home</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Strategy / Intent</label>
                <textarea 
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[#c5a059] transition-all text-sm shadow-sm min-h-[80px]"
                  placeholder="e.g. Needs $500k for commercial acquisition..."
                  value={newLead.purpose}
                  onChange={(e) => setNewLead({...newLead, purpose: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a059] text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? 'GENERATING PROTOCOL...' : 'EXECUTE GENERATION'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
