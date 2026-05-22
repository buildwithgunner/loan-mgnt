import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, FileText, RefreshCw, Shield, User, Mail } from 'lucide-react';
import { getAdminNotifications } from '../../../api/admin';

const typeIcon = (notification) => {
  if (notification.is_app || notification.type === 'application') return FileText;
  if (notification.is_user || notification.type === 'user' || notification.type === 'activation') return User;
  if (notification.type === 'lead') return Mail;
  return Shield;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getAdminNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Failed to fetch admin notifications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] tracking-tighter uppercase italic">Notifications</h2>
          <p className="text-[var(--text-muted)] text-sm font-medium">System alerts from users, loan requests, documents, leads, and account activity.</p>
        </div>
        <button
          onClick={fetchNotifications}
          className="flex items-center justify-center gap-2 border border-[#c5a059]/30 hover:bg-[#c5a059]/10 text-[#c5a059] px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h3 className="font-black text-[#c5a059] text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Bell size={14} /> System Alerts
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {notifications.length} total
          </span>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-[#c5a059]/20 border-t-[#c5a059] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loading alerts...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-24 text-center">
            <Bell size={42} className="mx-auto mb-4 text-slate-500" />
            <p className="text-sm font-semibold text-slate-400">No notifications found.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map((notification) => {
              const Icon = typeIcon(notification);
              return (
                <div key={notification.id} className="p-6 flex items-start gap-4 hover:bg-[#c5a059]/5 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">{notification.message}</p>
                      {notification.read_at && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/20 rounded-full px-2 py-1">
                        {notification.type || 'info'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
