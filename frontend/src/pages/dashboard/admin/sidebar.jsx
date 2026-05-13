import React from 'react';
import { LayoutDashboard, Users, FileText, Edit2, BarChart2, MessageSquare, Settings, LogOut, X, Shield, ArrowRight, XCircle, ShieldCheck, Key, UserPlus } from 'lucide-react';
import { navigateTo } from '../../../App.jsx';
import Logo from '../../../components/Logo.jsx';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user') || '{"name": "Admin", "email": "admin@blackwolves.com"}');
  const sections = [
    {
      title: 'LOAN MANAGEMENT',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'applications', label: 'All Applications', icon: FileText },
        { id: 'funding', label: 'Funding Phase', icon: ShieldCheck },
        { id: 'disapproved', label: 'Rejected Loans', icon: XCircle },
        { id: 'leads', label: 'Interested Loans', icon: UserPlus },
        { id: 'codes', label: 'Code Generator', icon: Key },
      ]
    },
    {
      title: 'USER MANAGEMENT',
      items: [
        { id: 'users', label: 'All Users', icon: Users },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'settings', label: 'Admin Settings', icon: Settings },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigateTo('/admin/login');
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 glass-panel border-r border-white/5 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static shadow-sm bg-[var(--bg-surface)]`}>
      {/* Brand */}
      <div className="flex flex-col items-center pt-8 pb-10 px-6 border-b border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#c5a059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="relative z-10 transition-transform hover:scale-105">
          <Logo className="h-20" />
        </a>
        <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
           <Shield size={10} className="text-[#c5a059]" /> System Overseer
        </div>
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[#c5a059] lg:hidden">
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto scrollbar-hide">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => { 
                    const url = item.id === 'overview' ? '/admin' : `/admin/${item.id}`;
                    navigateTo(url);
                    setActiveTab(item.id); 
                    setSidebarOpen(false); 
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#c5a059]/10 text-[#c5a059] border-l-4 border-[#c5a059]'
                      : 'text-[var(--text-muted)] hover:text-[#c5a059] hover:bg-[#c5a059]/5'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all font-bold"
        >
          <LogOut size={17} /> Sign Out Securely
        </button>
        <button
          onClick={() => navigateTo('/')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs"
        >
          <ArrowRight size={14} /> Back to Public Site
        </button>
      </div>
    </aside>
  );
}
