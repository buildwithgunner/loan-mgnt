import { NavLink, useNavigate } from "react-router-dom";
import { FaBolt, FaTachometerAlt, FaUsers, FaMoneyBill, FaChartBar, FaCog, FaSignOutAlt, FaFileSignature, FaCalendarCheck, FaUserShield, FaBell, FaFileAlt, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, setOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const base = "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]";
  const active = "bg-indigo-500/20 text-indigo-300 border-r-2 border-indigo-500";

  const items = [
    { to: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin/users", icon: <FaUsers />, label: "Borrowers" },
    { to: "/admin/applications", icon: <FaFileSignature />, label: "Applications" },
    { to: "/admin/loans", icon: <FaMoneyBill />, label: "Active Loans" },
    { to: "/admin/repayments", icon: <FaCalendarCheck />, label: "Repayments" },
    { to: "/admin/guarantors", icon: <FaUserShield />, label: "Guarantors" },
    { to: "/admin/reports", icon: <FaChartBar />, label: "Reports" },
    { to: "/admin/notifications", icon: <FaBell />, label: "Notifications" },
    { to: "/admin/documents", icon: <FaFileAlt />, label: "Documents" },
    { to: "/admin/settings", icon: <FaCog />, label: "Settings" },
    { to: "/admin/security", icon: <FaUserShield />, label: "Security" },
  ];

  const signOut = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div 
      className={`h-screen w-64 fixed left-0 top-0 z-[20] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} 
      style={{ background: "rgba(3,7,18,0.95)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <FaBolt className="text-white text-sm" />
          </div>
          <div>
            <span className="text-lg font-black text-white">Swift<span className="gradient-text">Loan</span></span>
            <p className="text-[10px] text-slate-600 -mt-0.5 font-medium">Admin Portal</p>
          </div>
        </div>
        <button className="lg:hidden text-slate-400 p-2" onClick={() => setOpen(false)}>
          <FaTimes size={18} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map(({ to, icon, label }) => (
          <NavLink 
            key={to} to={to} end={to === "/admin"} 
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            onClick={() => window.innerWidth < 1024 && setOpen(false)}
          >
            <span className="text-base">{icon}</span>{label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/[0.06]">
        <button onClick={signOut} className={`${base} w-full text-red-500/60 hover:text-red-400 hover:bg-red-500/[0.05]`}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
}
