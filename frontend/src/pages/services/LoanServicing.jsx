import React from 'react';
import { navigateTo } from '../../App.jsx';

// Common Button Components
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-fit ${className}`}>
    {text}
  </button>
);

export default function LoanServicing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Loan Servicing Hero"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-[1.1]">
            Loan Servicing
          </h1>
          <GoldButton text="Contact Us" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto space-y-6">
          <p className="text-slate-600 leading-relaxed text-[15px]">
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span> offers premier loan servicing for all internally originated loans. In a rapidly evolving market, our goal is to offer a service that simplifies and streamlines the loan servicing process, while ensuring optimal outcomes for the Black Wolves Acquisition LLC clients we proudly serve.
          </p>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            Our offerings go beyond standard loan servicing solutions to bring comprehensive, tailor-made services that perfectly align with your unique investment goals. Coupled with our robust and advanced technology, we guarantee precision, superlative service, and absolute data security. Moreover, we are seasoned in effectively maneuvering regulatory compliance, providing our valued clients an extra layer of protection and peace of mind.
          </p>
        </div>
      </section>

      {/* 3. COMPREHENSIVE LOAN SERVICING */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Comprehensive Loan Servicing</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Our integrated loan servicing offers solutions that fit your unique requirements. We pay attention to regulatory standards and your specific servicing needs, promoting successful investment strategies and secure revenue flow. Our services include:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600 text-[15px]">
            <li>Monthly Interest Collections and Investor Disbursements</li>
            <li>Borrower Invoicing</li>
            <li>1098 and 1099 Disbursements</li>
            <li>Property Tax and Insurance Management</li>
            <li>Default Management</li>
            <li>Property Inspections</li>
            <li>Loan Maturity and Payoff Management</li>
            <li>Borrower Due Diligence and Financial Underwriting</li>
            <li>Debt and Equity Exit Strategies</li>
            <li>Troubled Asset and Default Management</li>
          </ul>
        </div>
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Comprehensive Loan Servicing" />
        </div>
      </section>

      {/* 4. ASSET MANAGEMENT INTEGRITY (LIGHT) */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100 overflow-hidden flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Asset Management Integrity</h2>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            For potential problem areas, we provide Default Management, monitoring, and managing loans to handle defaults effectively. We also monitor the physical aspects with Property Inspections to ensure the investment's asset protection. Once loans reach maturity, we manage the Loan Maturity and Payoff process for efficient indebtedness resolution.
          </p>
          <div className="pt-4">
            <GoldButton text="Contact Us" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
        <div className="md:w-1/2 relative">
           <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
           <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Asset Management Integrity" />
        </div>
      </section>

      {/* 5. TRANSPARENT AND FAIR FEES */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
           <img src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Transparent and Fair Fees" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Transparent and Fair Fees</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            We understand the complexity and importance of tax compliance, so our team expertly handles 1098 and 1099 Disbursements. Compliance isn't just a buzzword for us; it's the foundation of our services, offering you peace of mind and saving you precious time.
          </p>
          <div className="pt-4">
            <GoldButton text="Contact Us" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* 6. ADVANCED SERVICING SOLUTIONS */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col-reverse md:flex-row items-center gap-16 border-y border-gray-100">
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
           <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
           <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Advanced Servicing Solutions" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Advanced Servicing Solutions</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            We understand the necessity of thorough Borrower Due Diligence and Financial Underwriting and offer these as part of our comprehensive services. We work with you to develop the best Debt and Equity Strategies that align with your investment goals. Troubled Asset and Default Management services are available, ensuring your investments are always protected.
          </p>
        </div>
      </section>

    {/* 7. CONTACT FORM SECTION */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-start text- left">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 w-full">Contact Us</h2>
          
          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Name Fields */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Name <span className="text-red-500">*</span></label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                  <span className="text-xs text-gray-500 mt-1 block">First</span>
                </div>
                <div className="flex-1">
                  <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                  <span className="text-xs text-gray-500 mt-1 block">Last</span>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Email <span className="text-red-500">*</span></label>
              <input type="email" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Phone</label>
              <input type="tel" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>

            {/* Full Address */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Full Address <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                <div>
                  <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                  <span className="text-xs text-gray-500 mt-1 block">Street Address</span>
                </div>
                <div>
                  <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                  <span className="text-xs text-gray-500 mt-1 block">Address Line 2</span>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                    <span className="text-xs text-gray-500 mt-1 block">City</span>
                  </div>
                  <div className="flex-1">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                    <span className="text-xs text-gray-500 mt-1 block">State / Province / Region</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
                    <span className="text-xs text-gray-500 mt-1 block">ZIP / Postal Code</span>
                  </div>
                  <div className="flex-1">
                     <select className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white">
                        <option></option>
                     </select>
                    <span className="text-xs text-gray-500 mt-1 block">Country</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Subject <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-slate-900" />
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">Message <span className="text-red-500">*</span></label>
              <textarea rows={8} className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#051a2c]"></textarea>
              <span className="text-xs text-gray-500 block">0 of 5000 max characters</span>
            </div>

            {/* Consents & Checkboxes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" id="consent_1" />
                <label className="text-sm text-gray-700" htmlFor="consent_1">
                  I consent to receive transactional messages related to my account, orders, or services I have requested from Black Wolves Acquisition LLC. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency varies. Message & data rates may apply. Text HELP for assistance. You can reply STOP to unsubscribe at any time.
                </label>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 mb-2">Marketing Consent Checkbox</p>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" id="consent_2" />
                  <label className="text-sm text-gray-700" htmlFor="consent_2">
                     Consent to Receive Occasional Marketing Communication from Black Wolves Acquisition LLC.
                  </label>
                </div>
              </div>
            </div>

            {/* Recaptcha Mock */}
            <div className="bg-[#f9f9f9] border border-gray-300 w-[300px] p-3 rounded flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-gray-400 bg-white rounded-sm"></div>
                    <span className="text-sm text-gray-700">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8" alt="reCAPTCHA" />
                    <span className="text-[10px] text-gray-500 mt-1">reCAPTCHA</span>
                </div>
            </div>
          </form>

          {/* Footer Text */}
          <div className="w-full mt-6 text-sm text-gray-700">
             Please visit our <span className="text-[#c5a059] cursor-pointer hover:underline">Privacy Policy</span> and <span className="text-[#c5a059] cursor-pointer hover:underline">Terms of Service</span>
          </div>

        </div>
      </section>

    </div>
  );
}
