import { Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Insights() {
  const articles = [
    { tag: "Methodology", title: "Why AI Credit Scoring is Fairer Than FICO", date: "April 22" },
    { tag: "Scale", title: "Leveraging Bridge Capital to Win Real Estate Bids", date: "April 18" },
    { tag: "Company", title: "SwiftLoan Reaches $2B Total Asset Deployment", date: "April 10" },
    { tag: "Personal Finance", title: "Debt Consolidation Strategies for High Interest Environments", date: "April 02" },
    { tag: "Case Study", title: "How Atlas Trading Scaled 3x in 12 Months", date: "March 28" },
    { tag: "Market View", title: "Commercial Real Estate Forecast Q3", date: "March 15" },
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
        <div className="mb-16 md:flex md:items-end justify-between gap-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Capital <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Insights.</span></h1>
            <p className="text-xl text-slate-400 max-w-2xl font-light">Thoughts, perspectives, and market analysis from the underwriting floor.</p>
          </div>
          <div className="hidden md:block">
            <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">Subscribe to Newsletter</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div key={i} className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">{a.tag}</span>
                <span className="text-xs text-slate-500">{a.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-white leading-tight mb-8 group-hover:text-indigo-300 transition-colors flex-1">{a.title}</h3>
              <div className="flex items-center text-slate-400 text-sm font-medium gap-2 group-hover:text-cyan-400 transition-colors">
                Read Article <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
