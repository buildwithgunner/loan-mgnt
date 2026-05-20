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

// Formatted Check Icon for list items
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c5a059] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default function ReferralProgram() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Referral Program Hero"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl pt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-[1.1] font-serif">
            Referral Program
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-8">Earn With Black Wolves Acquisition LLC</h2>
          <GoldButton text="Contact Us Today" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <section className="bg-slate-50 py-20 px-6 md:px-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <p className="text-slate-600 leading-relaxed text-[16px] max-w-5xl mx-auto">
            Embarking on successful real estate ventures often requires a reliable partner, and <span className="text-[#c5a059]">Black Wolves Acquisition LLC</span> is your strategic ally for hard money lending services. Our straightforward referral program empowers real estate investors. Whether you're a seasoned investor, real estate agent, or mortgage investor, our program is designed to collaborate and reward you financially. Participating in our referral program can earn you generous rewards for every successful deal.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-20 px-6 md:px-24 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">How the Referral Program Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-[15px] leading-relaxed">
            Navigating the complexities of real estate lending just got more rewarding with Black Wolves Acquisition LLC's referral program. Participating in our referral program is easy! Here's how it works:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-[3px] border-[#c5a059] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Sign Up</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simply <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline">fill out our signup form</span>, and you'll be on your way to becoming a valued member of our trusted network of real estate professionals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-[3px] border-[#c5a059] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Spread the Word</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Start by sharing your positive experience with Black Wolves Acquisition LLC and our real estate lending services. Let your contacts know about our expertise, personalized service, and funding solutions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-[3px] border-[#c5a059] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Connect With Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                When you come across a borrower who is seeking financing solutions, introduce them to Black Wolves Acquisition LLC.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-[3px] border-[#c5a059] flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. Earn Rewards</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                For every successful closed deal that you refer, you'll receive a cash reward. There are no limits to how many referrals you can make or how much you can earn. The more borrowers you connect with Black Wolves Acquisition LLC, the more rewards you'll receive.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Black Wolves ADVANTAGE SECTION */}
      <section className="py-20 px-6 md:px-24 bg-slate-50 border-y border-gray-100 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">The Black Wolves Advantage in Hard Money Lending</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Black Wolves Acquisition LLC is a <span className="text-[#c5a059] font-medium">proven leader globally's real estate lending market</span>. Our extensive experience has solidified our reputation as a trusted partner for investors seeking reliable financing solutions globally and in markets worldwide. Our closing track record is exceptional, demonstrating our proficiency in navigating real estate transactions but also our unwavering commitment to ensuring deals are executed seamlessly. When you refer clients to Black Wolves, you're endorsing a name synonymous with excellence and reliability in the competitive world of real estate lending.
          </p>
          <div className="pt-4">
            <DarkButton text="Contact Us Today" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
        <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="The Black Wolves Advantage" />
        </div>
      </section>

      {/* 5. WHY Black Wolves STANDS OUT */}
      <section className="py-20 px-6 md:px-24 bg-white flex flex-col-reverse md:flex-row items-center gap-16">
         <div className="md:w-1/2 relative max-w-xl mx-auto lg:max-w-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10 w-full" alt="Why Black Wolves Stands Out" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">Here's why Black Wolves Acquisition LLC stands out:</h2>
          
          <ul className="space-y-4 text-[15px] pt-4">
            <li className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-slate-900">Proven Leader globally:</strong> Our extensive presence and success in the Global market make us the go-to choice for investors looking to capitalize on the region's real estate opportunities.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-slate-900">Closing Track Record:</strong> With a proven track record of successful closings, Black Wolves Acquisition LLC instills confidence in investors, ensuring that deals are not just initiated but successfully concluded.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-slate-900">No Credit Check, No Appraisals:</strong> We prioritize efficiency by eliminating unnecessary hurdles. By forgoing credit checks and appraisals, we expedite the lending process, allowing you to seize opportunities promptly.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon />
              <p className="text-gray-600 leading-relaxed">
                <strong className="text-slate-900">Direct-to-Lender, Internal Underwriting, Fast Funding:</strong> Our direct-to-lender approach, coupled with internal underwriting, ensures transparency and rapid funding, enabling you to act decisively in a competitive market.
              </p>
            </li>
          </ul>

          <div className="pt-6">
            <GoldButton text="Contact Us Today" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* 6. CONCLUDING TEXT & BANNER */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-[15px] leading-relaxed">
            In <span className="text-[#c5a059] font-medium">real estate financing</span>, Black Wolves Acquisition LLC is more than a financial partner; we're the catalyst for your success. Our referral program is not just about earning cash rewards; it's a testament to our commitment to collaborate on hard money lending opportunities. Black Wolves Acquisition LLC is your trusted ally for your real estate funding needs.
          </p>
        </div>
      </section>

      <section className="relative w-full h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover grayscale opacity-60" 
            alt="Sign Up Background"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 w-full max-w-4xl px-6 text-center">
          <button onClick={() => navigateTo('/contact')} className="bg-white hover:bg-gray-100 text-slate-900 w-full py-5 text-3xl font-serif font-bold rounded shadow-xl transition-all hover:scale-[1.02]">
            Sign Up Today
          </button>
        </div>
      </section>

    </div>
  );
}

