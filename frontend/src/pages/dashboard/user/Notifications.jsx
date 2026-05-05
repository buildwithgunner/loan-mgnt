import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, MailOpen, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { apiClient } from '../../../api/client.js';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiClient('/dashboard/notifications');
      setNotifications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient(`/dashboard/notifications/${id}/read`, { method: 'POST' });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const activeNotifications = notifications.filter(n => !n.read_at);
  const readNotifications = notifications.filter(n => n.read_at);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={20} />;
      case 'error':   return <XCircle className="text-red-500" size={20} />;
      default:        return <Info className="text-blue-500" size={20} />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Notifications</h2>
          <p className="text-slate-600 text-sm font-medium">Updates on your loan status and account activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#c5a059] px-4 py-2 transition-all">
            <MailOpen size={16} /> Mark all as read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pl-1">Recent Updates</h3>
        {activeNotifications.length > 0 ? activeNotifications.map(notification => (
          <div key={notification.id} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition-all hover:border-[#c5a059]/50 hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="mt-1">{getTypeIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 leading-snug">{notification.message}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{new Date(notification.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                  title="Mark as Read"
                >
                  <Check size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#c5a059] mt-2 shadow-lg shadow-[#c5a059]/40" />
            </div>
          </div>
        )) : (
          <div className="py-12 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm text-center">
            <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest text-[10px]">No new updates.</p>
          </div>
        )}
      </div>

      {readNotifications.length > 0 && (
        <div className="space-y-4 opacity-70">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pl-1">Past Notifications</h3>
          {readNotifications.map(notification => (
            <div key={notification.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-4">
                <Check className="text-slate-400" size={18} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600">{notification.message}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{new Date(notification.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
