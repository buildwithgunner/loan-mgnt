import { Zap, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Legal() {
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
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <div className="mb-12">
          <ShieldCheck className="text-indigo-400 mb-6" size={48} />
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">Legal & <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Compliance.</span></h1>
          <p className="text-lg text-slate-400 font-light">Last updated: April 2026</p>
        </div>

        <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 md:p-12 text-slate-300 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Privacy Policy</h2>
            <p className="leading-relaxed mb-4">SwiftLoan Inc. ("we", "us", or "our") respects your privacy. We collect, store, and process your personal and financial data solely to facilitate credit applications, underwrite loans, and comply with strict federal guidelines.</p>
            <p className="leading-relaxed">We utilize 256-bit encryption on all data transfers. We do not sell your personal or financial information to third-party data brokers under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Terms of Service</h2>
            <p className="leading-relaxed mb-4">By accessing or using our platform, you agree to these terms. A "soft pull" of your credit may be performed to generate initial rates without impacting your credit score. If you accept a loan offer, a "hard pull" will be performed, which may affect your credit score.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. FDIC Disclosures</h2>
            <p className="leading-relaxed mb-4">SwiftLoan operates in partnership with several FDIC-insured banking institutions to originate personal and business loans. The capital extended is subject to the terms and regulations enforced by our banking partners and federal regulators. SwiftLoan itself is a technology provider and loan servicer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Equal Housing & Lending</h2>
            <p className="leading-relaxed mb-4">We are an Equal Opportunity Lender. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, or age (provided that the applicant has the capacity to enter into a binding contract).</p>
          </section>
        </div>
      </main>
    </div>
  );
}
