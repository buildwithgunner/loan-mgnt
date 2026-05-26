import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoveRight, Zap, Target, HandCoins, Building, KeyRound, Quote, Lock, BotMessageSquare, Menu, X } from "lucide-react";

const loanProducts = [
  { icon: <Target />, title: "Scaling Business", rate: "4.9% APR", desc: "Unlock capital to fuel growth and expansion." },
  { icon: <HandCoins />, title: "Personal Loans", rate: "5.5% APR", desc: "Flexible funding for personal projects and consolidation." },
  { icon: <Building />, title: "Real Estate Venture", rate: "6.2% APR", desc: "Fast capital for flips, new builds, or acquisition." },
  { icon: <KeyRound />, title: "Swift Equity Release", rate: "3.9% APR", desc: "Access capital from your property assets." },
];

function GlassCard({ children, className = "" }) {
  return <div className={`backdrop-blur-xl bg-slate-900/35 border border-white/10 rounded-[28px] p-8 shadow-2xl ${className}`}>{children}</div>;
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden relative">
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80')",
          transform: `translateY(${scrollY * 0.18}px) scale(1.06)`,
        }}
      />
      <div className="fixed inset-0 -z-20 bg-slate-950/60" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.18),transparent_35%)]" />

      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-slate-950/55 border border-white/10 rounded-full px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center"><Zap className="text-cyan-400" size={18} /></div>
            <span className="text-xl font-black text-white tracking-tighter">Swift<span className="text-indigo-400">Loan</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {['Products','Rates','Workflow','Insights'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">{item}</Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-slate-300 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/10">Sign In</Link>
            <Link to="/register" className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg shadow-indigo-500/25">Apply Now</Link>
          </div>

          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 backdrop-blur-2xl bg-slate-900/90 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
            {['Products','Rates','Workflow','Insights'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-lg font-semibold text-slate-200 border-b border-white/5 pb-2" onClick={() => setIsMenuOpen(false)}>{item}</Link>
            ))}
            <div className="flex flex-col gap-4 mt-2">
              <Link to="/login" className="text-center text-slate-300 text-lg font-semibold py-3 rounded-2xl bg-white/5" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 py-4 rounded-2xl text-white text-lg font-bold shadow-lg shadow-indigo-500/25" onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
            </div>
          </div>
        )}
      </nav>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-10 text-[13px] font-bold text-cyan-200 uppercase tracking-widest border border-cyan-500/20 bg-slate-900/40 backdrop-blur-xl animate-pulse">
            <BotMessageSquare className="text-cyan-400" size={16} />
            <span>AI-Driven Capital Approvals</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[102px] font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-8" style={{ transform: `translateY(${scrollY * 0.06}px)` }}>
            Digital Capital.<br />
            <span className="bg-gradient-to-br from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Instant Clarity.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-14 font-light leading-relaxed">
            Smart funding solutions for real estate investors and entrepreneurs. Get approved in minutes, funded in hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link to="/register" className="group flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-extrabold px-10 py-5 rounded-full transition hover:scale-105">
              Check Your Rate <MoveRight className="text-white group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link to="/workflow" className="flex items-center gap-3 border border-white/20 hover:bg-white/10 text-white text-lg font-bold px-10 py-5 rounded-full transition">
              <Zap className="text-cyan-400" /> How We Fund
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 -mt-20">
        <GlassCard className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['50,000+','Trusted Borrowers'],['2.4B+','Capital Disbursed'],['98%','Approval Rate'],['47 min','Avg. Funding Time']].map(([v,l]) => (
            <div key={l} className="p-4"><div className="text-3xl font-extrabold text-white">{v}</div><div className="text-sm text-slate-400 mt-1">{l}</div></div>
          ))}
        </GlassCard>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Capital for Scale.</h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">Scalable funding across business, personal, and property goals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((p, i) => (
              <GlassCard key={p.title} className="hover:-translate-y-2 transition-transform duration-300" style={{ transform: `translateY(${Math.max(0, scrollY - i * 120) * 0.015}px)` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-indigo-500 to-cyan-500">{p.icon}</div>
                <h3 className="text-white font-extrabold text-2xl mb-1 tracking-tight">{p.title}</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{p.desc}</p>
                <div className="text-lg font-extrabold tracking-tight text-cyan-300">Rates {p.rate}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <GlassCard className="p-2">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=100&w=1200" className="rounded-3xl w-full" alt="Team meeting" />
          </GlassCard>
        </div>
        <div className="md:w-1/2 space-y-8">
          <Quote className="text-indigo-300 opacity-40" size={60} />
          <p className="text-3xl md:text-4xl text-white font-light leading-tight">"Approved in 15 minutes, funded same day. Clean process, zero friction."</p>
          <div className="flex items-center gap-4 pt-4 border-t border-white/20">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl">S</div>
            <div><p className="text-white text-xl font-bold">Sarah M.</p><p className="text-slate-300 text-sm">Real Estate Investor</p></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-3">Meet Our Team</h2>
            <p className="text-slate-300">Expert support for every stage of your mortgage journey.</p>
          </div>
          <div className="max-w-md mx-auto">
            <GlassCard className="p-4 text-center">
              <img
                src="/team/deanne-ellis.jpeg"
                alt="Deanne Ellis - Mortgage Consultant"
                className="w-full aspect-square object-cover rounded-3xl mb-5"
              />
              <h3 className="text-2xl font-extrabold text-white">Deanne Ellis</h3>
              <p className="text-cyan-300 font-semibold mt-1">Mortgage Consultant</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6 text-center">
        <GlassCard className="max-w-4xl mx-auto rounded-[40px] p-12 md:p-16 border border-indigo-400/30">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">Ready for Capital?</h2>
          <p className="text-xl text-slate-200 max-w-xl mx-auto mb-10">Check your rate today. It is free and has no impact on your credit score.</p>
          <Link to="/register" className="inline-flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-extrabold px-12 py-5 rounded-full hover:scale-105 transition">Get Started <MoveRight /></Link>
        </GlassCard>
      </section>

      <footer className="relative z-10 border-t border-white/15 backdrop-blur-xl bg-slate-950/30 py-12 px-6 text-center">
        <div className="text-slate-300 text-sm">© 2026 SwiftLoan Inc. Fully Licensed Lender.</div>
        <div className="mt-2 flex justify-center gap-2 items-center text-xs text-slate-400"><Lock size={14} className="text-emerald-500" /><span>256-Bit Encrypted · SOC II Compliant</span></div>
      </footer>
    </div>
  );
}
