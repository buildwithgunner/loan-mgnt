import React, { useState, useEffect } from 'react';
import { getAdminSettings, updateAdminSettings } from '../../../api/admin';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site_name: '',
    support_phone: '',
    support_email: '',
    office_address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAdminSettings();
        setSettings(prev => ({ ...prev, ...data.settings }));
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
      await updateAdminSettings(settings);
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
    </div>
  );
}
