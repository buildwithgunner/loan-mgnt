import { Bell, LayoutDashboard, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import davidImg from '../../../assets/team/david.jpg';

export default function Topbar({ setSidebarOpen, activeTab, navItems }) {
  const { theme, toggleTheme } = useTheme();
  const currentLabel = navItems.find(n => n.id === activeTab)?.label || 'Admin Panel';

  return (
    <header className="glass-panel border-b border-white/5 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
          <LayoutDashboard size={24} />
        </button>
        <div className="flex flex-col">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Black Wolves Acquisition LLC</p>
          <h1 className="text-[15px] font-black text-[#c5a059] uppercase italic">{currentLabel}</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all hover:bg-[#c5a059]/10 group"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon size={18} className="text-slate-600 group-hover:text-[#c5a059]" />
          ) : (
            <Sun size={18} className="text-[#c5a059]" />
          )}
        </button>
        <button className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all hover:bg-white/10 group">
          <Bell size={18} className="text-slate-500 group-hover:text-[#c5a059]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
           <span className="text-xs font-black text-slate-300 uppercase hidden sm:block">Director</span>
           <img 
             src={davidImg} 
             alt="Admin" 
             className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#c5a059]/30"
           />
        </div>
      </div>
    </header>
  );
}
