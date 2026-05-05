import React from 'react';
import { navigateTo } from '../../App.jsx';

// Common Button Components
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-fit ${className}`}>
    {text}
  </button>
);

const DarkButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-fit ${className}`}>
    {text}
  </button>
);

export default function InvestmentOpportunities() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Investment Opportunities Hero"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-[1.1] font-serif">
            Investment<br/>Opportunities
          </h1>
          <GoldButton text="Get Started" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* 2. INTRO TEXT (LIGHT) */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <p className="text-slate-600 leading-relaxed text-[16px] max-w-5xl mx-auto">
            Black Wolves Acquisition LLC offers attractive investment opportunities for mortgage investors, providing a platform that ensures consistent monthly cash flow, preservation of principal investments, and asset security. As a <span className="text-[#c5a059] font-medium">trusted provider</span> globally, we offer lucrative pathways to mortgage investment, alongside comprehensive loan consultation and servicing for a truly passive investment experience.
          </p>
        </div>
      </section>

      {/* 3. DIRECT INVESTMENT IN MORTGAGES */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Direct Investment in Mortgages</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            We at Black Wolves Acquisition LLC offer a unique platform where mortgage investment is not only about providing funds. You have the opportunity to firmly plant your feet in the realm of direct mortgage ownership. This opportunity presents minimal risks to your principal investment while opening up a broad avenue for a steady stream of monthly income. We believe in enhancing your investment experiences by making them tangible and deeply personal.
          </p>
          <div className="pt-4">
            <DarkButton text="Learn More" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Direct Investment in Mortgages" />
        </div>
      </section>

      {/* 4. CONSISTENT MONTHLY CASH FLOW */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col-reverse md:flex-row items-center gap-16">
         <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Consistent Monthly Cash Flow" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Consistent Monthly Cash Flow</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            A cornerstone of a sound investment is stability, and that's what we strive for. Our carefully curated mortgage investments are structured to ensure consistent and dependable monthly cash flow. This approach reduces your financial stress by providing a stable source of additional income. Enjoy your investment journey with us, as we ensure security and growth on your behalf.
          </p>
          <div className="pt-4">
            <GoldButton text="Get Started" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* 5. PRINCIPAL PRESERVATION & TANGIBLE ASSETS (LIGHT) */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100 overflow-hidden flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Principal Preservation & Tangible Assets</h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            At Black Wolves Acquisition LLC, the financial security and stability of our clients is our top priority. Our tailor-made investment opportunities are finely tuned to ensure that your principal investment stays intact even as it works to generate incomparable yields. Moreover, through our careful selection process, you gain ownership of tangible assets at a conservative yet immensely valuable cost. This underpins your financial strength while delivering peace of mind.
          </p>
          <div className="pt-4">
            <GoldButton text="Get Started" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
        <div className="md:w-1/2 relative">
           <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
           <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Principal Preservation" />
        </div>
      </section>

      {/* 6. COMPREHENSIVE LOAN CONSULTATION & SERVICING */}
      <section className="py-20 px-6 md:px-24 bg-[#f9fafb] flex flex-col-reverse md:flex-row items-center gap-16">
         <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Loan Consultation and Servicing" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Comprehensive Loan Consultation & Servicing</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            In line with our commitment to provide a complete service suite to our investors, we offer expert <span className="text-[#c5a059]">loan consultation and servicing</span>. Our team of seasoned professionals guides you through the detailed process, providing insights, addressing concerns, and weighing options to empower your decision-making. Our primary aim is to facilitate a seamless experience, allowing you to concentrate on your wealth growth while we handle the rest. In essence, we offer more than an investment platform - we offer a committed partnership devoted to your financial success.
          </p>
        </div>
      </section>

      {/* 7. CONCLUDING TEXT BLOCK */}
      <section className="bg-white py-16 px-6 md:px-24 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-slate-600 leading-relaxed text-[16px] text-center">
            Here globally's thriving investment landscape, Black Wolves Acquisition LLC paves the way for rewarding ventures. We invite you to join the league of successful mortgage investors reaping the benefits of a well-structured, risk-adjusted, and promising market. It's time to fortify your portfolio, secure your investments, and let your money work harder for you. Take the first steps towards your wealth-building journey with Black Wolves Acquisition LLC today. <span className="text-[#c5a059] cursor-pointer hover:underline" onClick={() => navigateTo('/contact')}>Let's connect</span> and redefine what it means to invest.
          </p>
        </div>
      </section>

      {/* 8. GET STARTED FORM */}
      <section className="bg-slate-50 py-20 px-6 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center text-slate-900 mb-10">Get Started!</h2>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="First Name" className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
              <input type="text" placeholder="Last Name" className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
            </div>

            {/* Company Name */}
            <div>
              <input type="text" placeholder="Company Name" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
            </div>

            {/* Email & Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Your email" className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
              <input type="tel" placeholder="Phone number" className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
            </div>

            {/* Profession */}
            <div>
              <input type="text" placeholder="Your Profession" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
            </div>

            {/* How did you hear */}
            <div>
              <input type="text" placeholder="How did you hear about us?" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm" />
            </div>

            {/* Message */}
            <div>
              <textarea rows={5} placeholder="Message" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm resize-none"></textarea>
            </div>

            {/* Recaptcha Mock */}
            <div className="bg-[#f9f9f9] border border-gray-300 w-[280px] p-2 mt-4 flex items-center justify-between rounded-sm">
                <div className="flex items-center gap-3 pl-2">
                    <div className="w-6 h-6 border-[2px] border-gray-400 bg-white rounded-[2px]"></div>
                    <span className="text-sm text-gray-700 font-medium">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8" alt="reCAPTCHA" />
                    <span className="text-[10px] text-gray-500 mt-0.5">reCAPTCHA</span>
                </div>
            </div>

            <div className="pt-2">
              <button className="w-full bg-[#c5a059] hover:bg-[#b08d48] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Submit Details
              </button>
            </div>

          </form>
        </div>
      </section>

    </div>
  );
}

