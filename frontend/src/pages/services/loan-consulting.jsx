import React from 'react';
import { navigateTo } from '../../App.jsx';

// Common Button Components
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const DarkButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

export default function LoanConsulting() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Loan Consulting Hero"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl pt-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.1]">
            Loan Consulting
          </h1>
          <div className="flex flex-wrap gap-4">
            <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* 2. INTRO & GRID SECTION */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-600 leading-relaxed text-[15px] mb-12 max-w-5xl">
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span> offers hard money lending services to real estate investors globally and select cities across the country. We provide borrowers with personalized loan consultation services and funding. Black Wolves is direct to lender which allows us to match borrowers' hard money loan needs with the best funding for their deal. Our real estate development experience allows us to offer our borrowers a unique partnership on every loan. We offer a high level of individual consulting, including review of deal analytics, rehab budgets, and deal viability. <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline">Contact us today</span> to schedule a consultation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "24 Hour Term Sheets",
              "Personalized Consultations",
              "Easy Applications",
              "Diversified Experience",
              "Direct to Lender",
              "No Appraisal",
              "Flexible Loan Products",
              "No Credit Check"
            ].map((feature, idx) => (
              <div key={idx} className="bg-white text-slate-900 border border-gray-200 flex items-center justify-center p-6 text-center font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PERSONALIZED CONSULTATIONS SECTION */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Personalized Consultations" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-sans font-bold leading-tight text-slate-900">Personalized Consultations</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            We believe in the power of personalized service. When you choose Black Wolves Acquisition LLC, you get more than just a loan; you get a dedicated team that is committed to your success. Our experienced professionals take the time to listen and understand your real estate investment goals. By gaining insights into your project, we can provide you with expert advice and lending options that are tailored to your specific needs.
          </p>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Our team of experts will review your deal analytics, rehab budgets, and deal viability, offering you valuable insights to make informed decisions. We provide transparent information on the loan terms, interest rates, and repayment options, ensuring that you have a clear understanding of the financial commitment. Our goal is to empower you with the knowledge you need to make the best choices for your real estate investment.
          </p>
          <div className="pt-4">
            <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* 4. 24-HOUR TERM SHEETS SECTION */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">24-Hour Term Sheets</h2>
            <p className="text-slate-600 leading-relaxed text-[15px]">
              We understand that time is of the essence in real estate investment. That's why we provide 24-hour term sheets. Once you have submitted your loan application, our team will work diligently to provide you with a comprehensive term sheet within 24 hours. This fast turnaround ensures that you can make timely and informed decisions about your investment project.
            </p>
            <div className="pt-4">
              <GoldButton text="Contact Us Today!" className="w-fit" onClick={() => navigateTo('/contact')} />
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
             <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="24-Hour Term Sheets" />
          </div>
        </div>
      </section>

      {/* 5. SMOOTH AND EFFICIENT LOAN PROCESS SECTION */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Smooth and Efficient Loan Process</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            With Black Wolves Acquisition LLC, you can expect a smooth and efficient loan consultation process. We guide you through each step, from application to funding, ensuring transparency and open communication along the way. Our streamlined approach minimizes paperwork and unnecessary delays, getting you the financing you need when you need it.
          </p>
          <div className="pt-4">
            <DarkButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Smooth Loan Process" />
        </div>
      </section>

    </div>
  );
}

