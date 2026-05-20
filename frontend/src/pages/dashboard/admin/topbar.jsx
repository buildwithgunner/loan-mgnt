import { useState, useEffect } from 'react';
import { Bell, LayoutDashboard, Shield, Sun, Moon, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { getAdminNotifications } from '../../../api/admin';
import davidImg from '../../../assets/team/david.jpg';

export default function Topbar({ setSidebarOpen, activeTab, navItems }) {
  const { theme, toggleTheme } = useTheme();
  const currentLabel = navItems.find(n => n.id === activeTab)?.label || 'Admin Panel';
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getAdminNotifications();
      setNotifications(data.notifications || []);
    } catch (e) {
      console.error('Failed to fetch admin notifications', e);
    }
  };

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
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all hover:bg-white/10 group"
          >
            <Bell size={18} className="text-slate-500 group-hover:text-[#c5a059]" />
            {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-3 w-80 rounded-2xl border shadow-xl z-50 overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-[#0a1520] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="p-4 border-b border-[#c5a059]/20 flex justify-between items-center bg-[#c5a059]/5">
                 <h3 className="text-xs font-black uppercase tracking-widest text-[#c5a059]">System Alerts</h3>
                 <span className="text-[10px] font-bold px-2 py-1 bg-[#c5a059]/20 text-[#c5a059] rounded-lg">{notifications.length} NEW</span>
              </div>
              <div className="max-h-96 overflow-y-auto divide-y divide-[#c5a059]/10">
                {notifications.length > 0 ? notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-white/5 transition-colors group cursor-pointer flex gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {n.is_app ? <FileText size={16} className="text-emerald-500" /> : <Shield size={16} className="text-blue-500" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{n.message}</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-wider">{new Date(n.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-slate-500 text-xs font-medium italic">
                    No recent system intelligence.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
