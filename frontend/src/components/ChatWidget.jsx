import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="relative flex items-center gap-4 rounded-2xl bg-[var(--bg-surface)] p-4 shadow-2xl border border-[var(--border-color)] min-w-[320px]">
        
        {/* Loan Processor (CEO) Image */}
        <div className="relative h-14 w-14 flex-shrink-0">
          <div className="h-full w-full rounded-full border-2 border-[#c5a059] overflow-hidden">
            <img 
              src="/ceo_anthony.jpg" 
              alt="Anthony Deceglie - Chief Executive Officer" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Message Content */}
        <div className="flex-1 pr-6">
          <p className="text-[15px] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            Welcome to Black Wolves Acquisition!
          </p>
          <p className="text-[13px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-0.5">
            Loan Processor Online
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Arrow pointer */}
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-[var(--bg-surface)] border-r border-b border-[var(--border-color)] rotate-45" />
      </div>
    </div>
  );
}
