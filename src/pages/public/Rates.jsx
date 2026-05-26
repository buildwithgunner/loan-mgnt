import { Zap, MoveRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Rates() {
  const rates = [
    { title: "Personal", terms: ["12 Months", "24 Months", "36 Months", "60 Months"], aprs: ["5.5% - 8.9%", "6.2% - 11.5%", "7.0% - 14.9%", "8.5% - 18.0%"] },
    { title: "Business (SME)", terms: ["12 Months", "36 Months", "60 Months", "120 Months"], aprs: ["4.9% - 7.5%", "5.5% - 9.0%", "6.5% - 12.0%", "7.5% - 14.5%"] },
    { title: "Real Estate (Bridge)", terms: ["6 Months", "12 Months", "18 Months", "24 Months"], aprs: ["6.2% - 8.5%", "7.0% - 9.5%", "7.5% - 10.5%", "8.0% - 12.0%"] }
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Current <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Rates.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">We believe in radical transparency. Our rates are dynamically priced based on real-time market data, ensuring you always get the fairest deal.</p>
        </div>

        <div className="space-y-8">
          {rates.map((product, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">{product.title}</h2>
                <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 text-sm">
                  Apply for this rate <MoveRight size={16} />
                </Link>
              </div>
              <div className="p-6 md:p-8 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr>
                      {product.terms.map(t => (
                        <th key={t} className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 w-1/4">{t}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {product.aprs.map((apr, i) => (
                        <td key={i} className="pt-6 font-semibold md:text-lg text-slate-200">{apr} APR</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 max-w-3xl">
          <p className="text-sm text-indigo-200 leading-relaxed font-medium">
            * Disclaimer: Rates listed above are indicative and subject to final credit approval. Your actual rate depends on credit history, income, loan amount, and term length. 
          </p>
        </div>
      </main>
    </div>
  );
}
