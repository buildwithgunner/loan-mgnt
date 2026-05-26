import { Zap, MoveRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Workflow() {
  const steps = [
    { num: "01", title: "Digital Intake", desc: "Submit your basic information securely online in under 3 minutes. No heavy documentation required upfront.", icon: "📝" },
    { num: "02", title: "AI Assessment", desc: "Our proprietary risk models evaluate your profile across thousands of data points instantly. You'll see precise terms and rates within seconds, not days.", icon: "🤖" },
    { num: "03", title: "Verification", desc: "If you approve the terms, cleanly sync your financial accounts or safely upload identity documents for a frictionless digital verification layer.", icon: "🛡️" },
    { num: "04", title: "Instant Funding", desc: "Once verified, we execute capital disbursement directly to your designated bank account. Often lands same-day.", icon: "💸" }
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
      <main className="flex-1 max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">How We <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Fund.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Legacy banking is broken. We rebuilt capital deployment from the ground up using modern AI and open banking infrastructure.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[39px] md:left-1/2 md:-ml-px top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500/50 via-cyan-500/50 to-transparent" />
          
          <div className="space-y-12 relative">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Visual Marker */}
                <div className="absolute left-4 md:left-1/2 md:-ml-10 w-20 h-20 rounded-3xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(99,102,241,0.2)] z-10 shrink-0">
                  {step.icon}
                </div>

                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}>
                  <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
                    <p className="text-indigo-400 font-black text-sm tracking-widest mb-2">STEP {step.num}</p>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/register" className="inline-flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-extrabold px-10 py-5 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.3)] transition hover:scale-105">
            Start Your Intake Now <MoveRight size={20} />
          </Link>
        </div>
      </main>
    </div>
  );
}
