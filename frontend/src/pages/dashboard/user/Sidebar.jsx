import React from 'react';
import { LayoutDashboard, FileText, Upload, Bell, User, Settings, LogOut, X, PlusCircle, Star, Users } from 'lucide-react';
import { navigateTo } from '../../../App.jsx';
import Logo from '../../../components/Logo.jsx';

export default function Sidebar({ activeTab, setActiveTab, unread, sidebarOpen, setSidebarOpen, mockUser }) {
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'BW';
  };

  const NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'loan-request', label: 'Request Loan', icon: PlusCircle },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-color)] flex flex-col
      transform transition-transform duration-300
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:flex shadow-xl
    `}>
      {/* Brand */}
      <div className="flex flex-col items-center pt-10 pb-8 px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }}>
          <Logo className="h-20" />
        </a>
      </div>

      {/* User info */}
      <div className="flex items-center gap-4 px-8 py-6 mb-4">
        <div className="w-14 h-14 rounded-full bg-[#c5a059] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#c5a059]/20">
          {mockUser?.avatar ? (
            <img src={mockUser.avatar} alt="User" className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(mockUser?.name)
          )}
        </div>
        <div>
          <p className="text-[var(--text-primary)] font-black text-[15px] leading-tight tracking-tight">{mockUser?.name}</p>
          <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Member</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-slate-600 lg:hidden">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all group ${activeTab === item.id
                ? 'bg-[#c5a059]/10 text-[#c5a059] border-l-4 border-[#c5a059]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[#c5a059]/5'
              }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-[#c5a059]' : 'group-hover:text-slate-900'} />
            {item.label}
            {item.id === 'notifications' && unread > 0 && (
              <span className="ml-auto bg-[#c5a059] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Lower Menu */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={() => { localStorage.clear(); navigateTo('/'); }}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
}
