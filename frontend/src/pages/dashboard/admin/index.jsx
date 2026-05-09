import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, FileText, Edit2, BarChart2, MessageSquare, Settings, UserPlus, Key
} from 'lucide-react';
import { navigateTo } from '../../../App.jsx';
import Overview from './Overview.jsx';
import UserManagement from './UserManagement.jsx';
import ApplicationsAdmin from './ApplicationsAdmin.jsx';
import BlogAdmin from './BlogAdmin.jsx';
import Leads from './Leads.jsx';
import CodeGenerator from './CodeGenerator.jsx';
import Analytics from './Analytics.jsx';
import AdminSettings from './AdminSettings.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',          icon: LayoutDashboard },
  { id: 'users',        label: 'User Management',   icon: Users },
  { id: 'applications', label: 'Applications',      icon: FileText },
  { id: 'disapproved',  label: 'Rejected Loans',    icon: FileText },
  { id: 'leads',        label: 'Interested Loans',  icon: UserPlus },
  { id: 'codes',        label: 'Code Generator',    icon: Key },
  { id: 'blog',         label: 'Blog & Posts',      icon: Edit2 },
  { id: 'analytics',    label: 'Analytics',         icon: BarChart2 },
  { id: 'messages',     label: 'Messages',          icon: MessageSquare },
  { id: 'settings',     label: 'Settings',          icon: Settings },
];

export default function AdminDashboard() {
  const getInitialTab = () => {
    const path = window.location.pathname;
    if (path.startsWith('/admin/')) {
      return path.replace('/admin/', '');
    }
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!token || !user || user.role !== 'admin') {
      navigateTo('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin/')) {
        const tab = path.replace('/admin/', '') || 'overview';
        setActiveTab(tab);
      }
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  if (!isAuthorized) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':     return <Overview setActiveTab={setActiveTab} />;
      case 'users':        return <UserManagement />;
      case 'applications': return <ApplicationsAdmin />;
      case 'funding':      return <ApplicationsAdmin filterProp="funding" />;
      case 'disapproved':  return <ApplicationsAdmin filterProp="rejected" />;
      case 'leads':        return <Leads />;
      case 'codes':        return <CodeGenerator />;
      case 'blog':         return <BlogAdmin />;
      case 'analytics':    return <Analytics />;
      case 'settings':     return <AdminSettings />;
      case 'messages':     return (
        <div className="text-center py-24 text-white">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Messages coming soon</p>
        </div>
      );
      default: return <Overview />;
    }
  };

  return (
    <div className="h-screen bg-[var(--bg-primary)] flex font-sans text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          navItems={NAV_ITEMS}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
