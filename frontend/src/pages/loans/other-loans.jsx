import React from 'react';
import { navigateTo } from '../../App.jsx';

// Reusable loan page template
function LoanPage({ title, subtitle, image, bullets }) {
  return (
    <div className="w-full bg-white min-h-screen">
      <section className="relative w-full h-[500px] flex items-end">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 px-12 pb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">{title}</h1>
          <p className="text-lg font-bold text-white mb-8">{subtitle}</p>
          <button onClick={() => navigateTo('/contact')} className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105">
            Apply Easily!
          </button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8 text-slate-700">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
              <div className="h-[3px] w-16 bg-[#c5a059] mb-6 rounded" />
              <p className="text-[16px] leading-relaxed">Black Wolves Acquisition LLC provides flexible hard money {title.toLowerCase()} in markets worldwide. We offer fast approvals, competitive rates, and personalized service for real estate investors.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Loan Highlights</h3>
              <ul className="space-y-3">
                {bullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-[#c5a059] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white rounded-xl p-8 sticky top-28 shadow-xl">
              <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Talk to one of our experienced loan officers today and get pre-qualified in minutes.</p>
              <button onClick={() => navigateTo('/signup')} className="w-full bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold py-3 rounded-full transition-all mb-4">Apply Now</button>
              <div className="border-t border-white/10 pt-4 text-sm text-slate-300 space-y-2">
                <p>📞 +1 563-571-0448</p>
                <p>✉️ info@blackwolvesacquisition.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}






export function FixAndLease() {
  return <LoanPage
    title="Fix and Lease Loans"
    subtitle="Renovate, Rent & Build Wealth with Black Wolves Acquisition LLC"
    image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600"
    bullets={['Renovation financing + hold period','DSCR rental loan rollover available','Flexible exit strategies','Single family to multifamily','Bridge to permanent financing','Available statewide globally']}
  />;
}

export function ConventionalLoans() {
  return <LoanPage
    title="Conventional Loans"
    subtitle="Protect Your Assets with Non-Recourse Financing"
    image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
    bullets={['No personal liability','Ideal for IRA investments','Entity-owned properties','Competitive LTV ratios','Available for commercial & residential','Transparent underwriting']}
  />;
}



