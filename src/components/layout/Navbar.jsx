import { FaBell, FaSearch, FaBars } from "react-icons/fa";

export default function Navbar({ onMenuClick, isSidebarOpen }) {
  return (
    <div
      className={`h-16 fixed top-0 right-0 z-10 flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${isSidebarOpen ? "lg:w-[calc(100%-16rem)]" : "w-full"}`}
      style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-4">
        {/* Menu Toggle for mobile/tablet */}
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-400 hover:text-white lg:hidden"
        >
          <FaBars size={20} />
        </button>

        {/* Search - Hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-3 rounded-xl px-4 py-2 w-48 md:w-72" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <FaSearch className="text-slate-500 text-sm flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder-slate-600 outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <div className="relative">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/[0.05] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <FaBell className="text-slate-400 text-sm" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-lg shadow-indigo-500/40">3</span>
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-semibold leading-none">Admin</p>
            <p className="text-slate-500 text-xs mt-0.5">SwiftLoan</p>
          </div>
        </div>
      </div>
    </div>
  );
}