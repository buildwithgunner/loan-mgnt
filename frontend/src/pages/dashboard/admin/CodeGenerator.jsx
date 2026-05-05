import React, { useState } from 'react';
import { Key, Copy, CheckCircle, RefreshCcw, User, Mail, Shield, Zap, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#ffffff',
  color: '#0f172a',
});

const CODE_TYPES = [
  { id: 'interest', label: 'Interest Code', prefix: 'LIT-', length: 6, color: 'text-amber-500', desc: 'Used for prospective leads and new loan interests.' },
  { id: 'approval', label: 'Approval Code', prefix: 'BWA-', length: 6, color: 'text-emerald-500', desc: 'Used to authorize specific loan application stages.' },
  { id: 'tracking', label: 'Tracking Code', prefix: 'PAY-', length: 8, color: 'text-blue-500', desc: 'Used for disbursement tracking and payment verification.' },
];

export default function CodeGenerator() {
  const [selectedType, setSelectedType] = useState(CODE_TYPES[0]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '' });
  const [history, setHistory] = useState([]);

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 2 + selectedType.length).toUpperCase();
    const code = `${selectedType.prefix}${random}`;
    setGeneratedCode(code);
    
    // Add to local history
    const entry = {
      code,
      type: selectedType.label,
      client: clientInfo.name || 'Anonymous Client',
      date: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };
    setHistory([entry, ...history].slice(0, 10));

    Toast.fire({
      icon: 'success',
      title: 'Code Generated successfully'
    });
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    Toast.fire({
      icon: 'success',
      title: 'Copied to clipboard'
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] tracking-tighter uppercase italic">Omni-Code Generator</h2>
          <p className="text-slate-500 text-sm font-medium">Generate authorization, tracking, and interest codes for any client.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
           <Shield size={10} className="text-[#c5a059]" /> Secure Protocol Alpha
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Generator Card */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
               <Key size={200} className="rotate-12" />
            </div>

            <div className="relative z-10 space-y-10">
              {/* Type Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Zap size={12} className="text-[#c5a059]" /> Select Code Intelligence Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {CODE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`p-6 rounded-3xl border transition-all text-left space-y-2 group ${
                        selectedType.id === type.id
                          ? 'bg-[#c5a059]/10 border-[#c5a059] shadow-md shadow-[#c5a059]/5'
                          : 'bg-gray-50 border-gray-200 hover:border-[#c5a059]/30'
                      }`}
                    >
                      <div className={`font-black uppercase tracking-widest text-[10px] ${selectedType.id === type.id ? 'text-[#c5a059]' : 'text-slate-600'}`}>
                        {type.label}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {type.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Client Name (Optional)</label>
                   <div className="relative group">
                     <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" />
                     <input 
                       type="text"
                       placeholder="e.g. John Doe"
                       value={clientInfo.name}
                       onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                     />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Email (Optional)</label>
                   <div className="relative group">
                     <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059] transition-colors" />
                     <input 
                       type="email"
                       placeholder="client@example.com"
                       value={clientInfo.email}
                       onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                       className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                     />
                   </div>
                </div>
              </div>

              {/* Result Area */}
              <div className="pt-6">
                {generatedCode ? (
                  <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Generated Access Key</p>
                       <p className={`text-4xl font-black italic tracking-tighter ${selectedType.color}`}>
                         {generatedCode}
                       </p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => copyToClipboard(generatedCode)}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-slate-900 px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all"
                      >
                        <Copy size={16} /> Copy Code
                      </button>
                      <button 
                        onClick={generateCode}
                        className="p-3.5 bg-[#c5a059] text-white rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20"
                      >
                        <RefreshCcw size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={generateCode}
                    className="w-full py-6 bg-gradient-to-r from-[#c5a059] to-[#e6c98a] text-[#05101c] rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#c5a059]/30 flex items-center justify-center gap-4 group"
                  >
                    <Sparkles size={20} className="group-hover:rotate-12 transition-transform" /> 
                    Initialize Intelligence Generation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* History / Info Panel */}
        <div className="space-y-8">
           <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6 shadow-sm">
              <h3 className="font-black text-[#c5a059] text-[10px] uppercase tracking-widest flex items-center gap-2">
                 <RefreshCcw size={14} /> Session History
              </h3>
              
              <div className="space-y-4">
                {history.length > 0 ? history.map((item) => (
                  <div key={item.timestamp} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl group hover:border-[#c5a059]/30 transition-all">
                     <div className="flex justify-between items-start mb-2">
                        <p className="font-black text-slate-900 text-xs">{item.code}</p>
                        <button onClick={() => copyToClipboard(item.code)} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-[#c5a059]">
                           <Copy size={12} />
                        </button>
                     </div>
                     <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <span>{item.client}</span>
                        <span className="text-[#c5a059] opacity-60">{item.date}</span>
                     </div>
                  </div>
                )) : (
                  <div className="py-20 text-center space-y-3 opacity-30">
                    <Zap size={32} className="mx-auto text-slate-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">No session activity</p>
                  </div>
                )}
              </div>
           </div>

           <div className="bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-3xl p-8 text-[#05101c]">
              <h3 className="font-black text-[11px] uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Shield size={14} /> Security Protocol
              </h3>
              <p className="text-xs font-bold leading-relaxed opacity-80">
                All generated codes are encrypted using industry-standard protocols. Ensure these keys are only shared with verified clients through secure channels.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
