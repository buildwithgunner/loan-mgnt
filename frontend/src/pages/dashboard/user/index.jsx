import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Upload, Bell, User, Settings, PlusCircle, LogOut, Star, Users } from 'lucide-react';
import { apiClient } from '../../../api/client.js';
import Overview      from './overview.jsx';
import Applications  from './applications.jsx';
import Documents     from './documents.jsx';
import Notifications from './notifications.jsx';
import Profile       from './profile.jsx';
import Sidebar       from './sidebar.jsx';
import Topbar        from './topbar.jsx';
import LoanRequest   from './loan-request.jsx';
import Reviews       from './reviews.jsx';
import Referrals     from './referrals.jsx';

const NAV_ITEMS = [
  { id: 'overview',       label: 'Overview',          icon: LayoutDashboard },
  { id: 'loan-request',    label: 'Request Loan',      icon: PlusCircle },
  { id: 'applications',   label: 'My Applications',   icon: FileText },
  { id: 'documents',      label: 'Documents',         icon: Upload },
  { id: 'reviews',       label: 'Reviews',           icon: Star },
  { id: 'referrals',     label: 'Referrals',         icon: Users },
  { id: 'notifications',  label: 'Notifications',     icon: Bell },
  { id: 'settings',       label: 'Settings',          icon: Settings },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab]   = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient('/dashboard/summary');
      setDashboardData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const unread = dashboardData?.unread_count || 0;
  const user = dashboardData?.user || JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user') || '{}');

  const renderContent = () => {
    if (isLoading && !dashboardData) {
      return (
        <div className="h-full flex flex-col items-center justify-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin mb-4" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border-color)] shadow-xl">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
             <LogOut size={24} />
          </div>
          <h3 className="text-lg font-extrabold text-[var(--text-primary)] uppercase italic tracking-tighter">Connection Error</h3>
          <p className="text-[var(--text-muted)] text-sm max-w-xs mx-auto mb-6">{error}</p>
          <button onClick={fetchDashboardData} className="px-10 py-4 bg-[#c5a059] text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-[#c5a059]/20">
            TRY AGAIN
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':      return <Overview data={dashboardData} user={user} setActiveTab={setActiveTab} />;
      case 'loan-request':  return <LoanRequest onSuccess={fetchDashboardData} />;
      case 'applications':  return <Applications />;
      case 'documents':     return <Documents />;
      case 'notifications': return <Notifications />;
      case 'reviews':       return <Reviews user={user} />;
      case 'referrals':     return <Referrals user={user} />;
      case 'settings':      return <Profile user={user} initialTab="general" />;
      default:              return <Overview data={dashboardData} user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex font-sans text-[var(--text-primary)] transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unread={unread}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mockUser={user}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          navItems={NAV_ITEMS}
          unread={unread}
          mockUser={user}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
