import { Menu, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { navigateTo } from '../../../App.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';

export default function Topbar({ setSidebarOpen, activeTab, navItems, unread, mockUser, setActiveTab }) {
  const { theme, toggleTheme } = useTheme();
  const currentLabel = navItems.find(n => n.id === activeTab)?.label || 'Dashboard';

  return (
    <header className="bg-transparent px-8 py-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#c5a059] hover:text-[#b08d4a] transition-colors">
          <Menu size={28} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-12 h-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex items-center justify-center transition-all hover:border-[#c5a059]/50 shadow-sm"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-slate-600" />
          ) : (
            <Sun size={20} className="text-[#c5a059]" />
          )}
        </button>

        {/* Notification Icon */}
        <button 
          onClick={() => setActiveTab('notifications')}
          className="relative w-12 h-12 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[#c5a059] transition-all hover:border-[#c5a059]/30 shadow-sm"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#c5a059] rounded-full border-2 border-[var(--bg-surface)] animate-pulse"></span>
          )}
        </button>

        {/* Premium Logout Button */}
        <button
          onClick={() => { localStorage.clear(); navigateTo('/'); }}
          className="bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all hover:border-[#c5a059]/50 hover:text-[#c5a059] flex items-center gap-3 group shadow-sm"
        >
          Log out <LogOut size={16} className="text-[var(--text-muted)] group-hover:text-[#c5a059] transition-colors" />
        </button>
      </div>
    </header>
  );
}
