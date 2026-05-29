import React, { useState, useEffect } from 'react';
import { getAdminSettings, updateAdminSettings } from '../../../api/admin';
import { Save, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';

const DEFAULT_TEAM_MEMBERS = [
  {
    id: 1,
    name: "Anthony Deceglie",
    role: "Chief Executive Officer",
    image: "/ceo_anthony.jpg",
    bio: "Anthony brings over 25 years of exceptional leadership and strategic vision to Black Wolves Acquisition LLC. As CEO, he has pioneered innovative lending solutions that have revolutionized the hard money market, ensuring our clients receive the most agile and reliable capital for their real estate ventures.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 2,
    name: "Zach Willams",
    role: "Loan Processor",
    image: "/daniel.jpg",
    bio: "Zach coordinates and processes our core loan files with absolute precision. With deep experience in real estate transactions, he ensures that every client application moves swiftly through underwriting to a successful closing.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Chief Account Officer",
    image: "/sarah_v2.jpg",
    bio: "Sarah orchestrates our daily financial operations with precision and agility. Her background in large-scale portfolio management gives her a firsthand understanding of the complex accounting needs of our high-volume investors.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Loan Officer",
    image: "/michael.jpg",
    bio: "With an exceptional structural and quantitative approach to risk, Michael leads our loan processing efforts. His dedication ensures funding is fast but secure, allowing our clients to capitalize on time-sensitive opportunities.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 5,
    name: "Deanne Ellis",
    role: "Mortgage Consultant",
    image: "/deanne-ellis.jpg",
    bio: "Deanne advises clients on mortgage strategy, qualification readiness, and deal structuring across a wide range of real estate scenarios. She is focused on clear communication and helping borrowers move confidently from application through closing.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
];

const parseTeamMembers = (value) => {
  if (!value) return DEFAULT_TEAM_MEMBERS;

  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_TEAM_MEMBERS;
  } catch (error) {
    console.error('Unable to parse team members setting:', error);
    return DEFAULT_TEAM_MEMBERS;
  }
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site_name: '',
    support_phone: '',
    support_email: '',
    office_address: '',
  });
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAdminSettings();
        setSettings(prev => ({ ...prev, ...data.settings }));
        setTeamMembers(parseTeamMembers(data.settings?.team_members));
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await updateAdminSettings({
        ...settings,
        team_members: JSON.stringify(teamMembers),
      });
      setStatus({ type: 'success', message: 'Settings synchronized successfully.' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to synchronize settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleTeamChange = (index, key, value) => {
    setTeamMembers(teamMembers.map((member, memberIndex) => (
      memberIndex === index ? { ...member, [key]: value } : member
    )));
  };

  const handleAddTeamMember = () => {
    const nextId = Math.max(0, ...teamMembers.map(member => Number(member.id) || 0)) + 1;
    setTeamMembers([
      ...teamMembers,
      {
        id: nextId,
        name: '',
        role: '',
        image: '',
        bio: '',
        linkedin: '#',
        twitter: '#',
        email: '#',
      }
    ]);
  };

  const handleRemoveTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, memberIndex) => memberIndex !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a059]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">Command Center Settings</h2>
          <p className="text-slate-500 text-sm font-medium">Manage platform-wide configurations and contact protocol.</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Save size={120} />
        </div>

        {status && (
           <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 ${
             status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border border-red-500/20 text-red-500'
           }`}>
             {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
             <p className="text-xs font-black uppercase tracking-widest">{status.message}</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Site Name', key: 'site_name', type: 'text' },
            { label: 'Support Phone', key: 'support_phone', type: 'tel' },
            { label: 'Support Email', key: 'support_email', type: 'email' },
            { label: 'Office Address', key: 'office_address', type: 'text' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">{f.label}</label>
              <input
                type={f.type}
                value={settings[f.key] || ''}
                onChange={(e) => handleInputChange(f.key, e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all font-bold shadow-sm"
              />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
           <button 
             onClick={handleSave}
             disabled={saving}
             className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-black px-12 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-[#c5a059]/20 flex items-center gap-3 disabled:opacity-50"
           >
             {saving ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
             ) : <Save size={16} />}
             {saving ? 'SYNCHRONIZING...' : 'SAVE CONFIGURATION'}
           </button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Team Members</h3>
            <p className="text-slate-500 text-sm font-medium">Update the people shown on the public Team page.</p>
          </div>
          <button
            onClick={handleAddTeamMember}
            className="bg-slate-900 hover:bg-[#c5a059] text-white font-black px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>

        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <div key={member.id || index} className="border border-gray-100 rounded-2xl p-6 space-y-5 bg-gray-50/60">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={member.image || '/advisor_avatar.png'}
                    alt={member.name || 'Team member'}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-white"
                  />
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 truncate">{member.name || 'New team member'}</p>
                    <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-widest truncate">{member.role || 'Role not set'}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTeamMember(index)}
                  className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  aria-label="Remove team member"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Name', key: 'name', type: 'text' },
                  { label: 'Role', key: 'role', type: 'text' },
                  { label: 'Image Path or URL', key: 'image', type: 'text' },
                  { label: 'Email Link', key: 'email', type: 'text' },
                  { label: 'LinkedIn Link', key: 'linkedin', type: 'text' },
                  { label: 'Twitter Link', key: 'twitter', type: 'text' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={member[field.key] || ''}
                      onChange={(e) => handleTeamChange(index, field.key, e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all font-bold shadow-sm"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Bio</label>
                  <textarea
                    value={member.bio || ''}
                    onChange={(e) => handleTeamChange(index, 'bio', e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all font-medium shadow-sm resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-black px-12 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-[#c5a059]/20 flex items-center gap-3 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : <Save size={16} />}
            {saving ? 'SYNCHRONIZING...' : 'SAVE TEAM'}
          </button>
        </div>
      </div>
    </div>
  );
}
