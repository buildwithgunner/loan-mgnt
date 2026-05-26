import { Zap, MoveRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const products = [
    { title: "Business Scale", desc: "Unlock substantial capital lines designed specifically for operational growth, acquisitions, and scaling into new markets without diluting your equity.", rate: "From 4.9% APR", amount: "$10K - $1M", color: "from-cyan-400 to-teal-500" },
    { title: "Real Estate Capital", desc: "Fast capital for fix-and-flip, new builds, bridge financing, or commercial property acquisition. Close deals before your competitors can even make an offer.", rate: "From 6.2% APR", amount: "$50K - $5M+", color: "from-emerald-400 to-lime-500" },
    { title: "Personal Funds", desc: "Flexible, unsecured funding for personal projects, home repairs, or debt consolidation. Approved in minutes with transparent, fixed terms.", rate: "From 5.5% APR", amount: "$1K - $50K", color: "from-indigo-400 to-purple-500" },
    { title: "Digital Micro", desc: "Emergency, small-scale funding delivered instantly. Zero paperwork, 100% digital, designed to cover immediate short-term capital gaps.", rate: "From 2.9% APR", amount: "$100 - $2K", color: "from-pink-400 to-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-transparent relative z-10 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-slate-950/60 border border-white/5 rounded-full px-6 h-16 flex items-center justify-between shadow-lg">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
              <Zap className="text-cyan-400" size={18} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">Swift<span className="text-indigo-400">Loan</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-300 text-sm font-semibold flex items-center gap-2 hover:text-white transition">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Capital <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Solutions.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">Explore our diverse range of financial products, designed specifically for speed, transparency, and minimal friction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <div key={i} className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 md:p-10 shadow-2xl shadow-indigo-500/5 group hover:border-white/10 transition-colors">
              <div className="flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6`}>
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{p.title}</h3>
                <p className="text-slate-400 text-lg mb-8 font-light flex-1 leading-relaxed">{p.desc}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-2xl bg-black/20 border border-white/5">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Limits</p>
                    <p className="text-white font-semibold">{p.amount}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Rates</p>
                    <p className={`font-semibold bg-gradient-to-br ${p.color} bg-clip-text text-transparent`}>{p.rate}</p>
                  </div>
                </div>

                <Link to="/register" className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all">
                  Check Eligibility <MoveRight size={18} className="text-indigo-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
