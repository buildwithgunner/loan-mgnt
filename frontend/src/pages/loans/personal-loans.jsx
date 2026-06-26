import React from 'react';
import { navigateTo } from '../../App.jsx';

// Common Button Component for consistency
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const PersonalLoans = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Personal Loans"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
            Personal Loans &<br/>Tailored Credit Solutions
          </h1>
          <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* --- INTRO STRIP --- */}
      <div className="bg-slate-900 py-16 px-6 md:px-24">
        <p className="max-w-6xl mx-auto text-gray-300 leading-relaxed text-[17px] text-center">
          At <span className="text-[#c5a059] font-bold">Black Wolves Acquisition LLC</span>, we provide flexible, quick, and reliable personal loan solutions designed to help you meet your financial commitments, fund major life transitions, or consolidate higher-interest debts with complete security and peace of mind.
        </p>
      </div>

      {/* --- WHAT ARE PERSONAL LOANS --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">What Are Personal Loans?</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Personal loans are versatile, fixed-rate financing options that can be used for a wide range of personal expenses. Unlike property-specific financing, personal loans do not require commercial or real estate collateral, focusing instead on financial capability, creditworthiness, and personal cash flow.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            Whether you are funding home improvements, handling unexpected medical expenses, investing in personal ventures, or bridging gaps during life transitions, Black Wolves Acquisition LLC delivers tailored terms that work for your unique cash flow needs.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Personal Loans Explained" />
        </div>
      </section>

      {/* --- ADVANTAGES --- */}
      <section className="bg-[#f9f7f2] py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Advantages of Personal Loans</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Choosing a personal loan through Black Wolves Acquisition LLC gives you access to flexible capital structures without the long approval timelines of conventional banks.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">No Asset Collateral Required:</strong>
                  <span className="text-slate-600 text-lg">Secure the capital you need without having to pledge your primary home, vehicles, or investment properties as security.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">Fixed Monthly Payments:</strong>
                  <span className="text-slate-600 text-lg">Enjoy stable, predictable monthly payments with a fixed interest rate and set repayment term, helping you budget with confidence.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">Rapid Disbursement:</strong>
                  <span className="text-slate-600 text-lg">Our streamlined review process ensures that your personal loan is approved and funded quickly, helping you manage time-sensitive needs.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
             <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Advantages" />
          </div>
        </div>
      </section>

      {/* --- TERMS SECTION --- */}
      <section className="bg-slate-900 py-24 px-6 md:px-24 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Flexible Loan Terms</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Loan Sizes:</strong>
                  <span className="text-gray-300 text-lg">We offer personal financing ranging from $10,000 up to $150,000, tailored to fit your cash flow requirements.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Repayment Terms:</strong>
                  <span className="text-gray-300 text-lg">Choose from flexible repayment durations starting from 12 months up to 60 months with no pre-payment penalties.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Competitive Rates:</strong>
                  <span className="text-gray-300 text-lg">Benefit from competitive interest rates based on credit history and debt-to-income metrics.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
             <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl" alt="Loan Terms" />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 md:px-24 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Apply online for a Personal Loan today
          </h2>
          <p className="text-slate-600 text-xl leading-relaxed">
            Ready to secure the flexible funding you need? Contact our loan specialists or create your account to submit an application.
          </p>
          <div className="flex justify-center gap-6">
            <GoldButton text="Apply Now" onClick={() => navigateTo('/signup')} className="text-xl px-12 py-4" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PersonalLoans;
