import React from 'react';
import { navigateTo } from '../../App.jsx';
import davidImg from '../../assets/team/david.jpg';
import michaelImg from '../../assets/team/michael.jpg';

export default function FixAndFlip() {
  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative w-full h-[500px] flex items-end">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1600"
          alt="Fix and Flip property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 px-12 pb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Fix And Flip Loans<br />globally
          </h1>
          <p className="text-lg md:text-xl font-bold text-white mb-8">
            Achieve Success in Real Estate<br />Investment with Black Wolves Acquisition LLC
          </p>
          <button
            onClick={() => navigateTo('/signup')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Apply Easily!
          </button>
        </div>
      </section>

      {/* ── Main Content + Sidebar ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 text-slate-600">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What Are Fix and Flip Loans?</h2>
              <div className="h-[3px] w-16 bg-[#c5a059] mb-6 rounded" />
              <p className="text-[16px] leading-relaxed mb-4">
                Fix and flip loans are short-term financing solutions specifically designed for real estate investors who purchase distressed properties, renovate them, and sell them for a profit. Black Wolves Acquisition LLC provides fast, flexible hard money loans to help you seize opportunities in the Global market.
              </p>
              <p className="text-[16px] leading-relaxed">
                Unlike traditional bank loans, our fix and flip loans offer quick approval and funding so you can move fast on competitive deals. We understand the real estate investment business and structure our loans to match the needs of experienced and first-time investors alike.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Black Wolves Acquisition LLC?</h3>
              <ul className="space-y-3">
                {[
                  'Fast approvals — funding in as little as 7 days',
                  'No income verification required',
                  'Up to 90% loan-to-cost financing',
                  'Interest-only loan options',
                  'Flexible terms from 6 to 24 months',
                  'Loans from $75,000 to $3,000,000',
                  'Available across all major Global markets',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-[#c5a059] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── Fast Funding Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Fast Funding for Rapid Success
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              At Black Wolves Acquisition LLC, we understand the need for speed in the world of real estate investment. Our fix and flip loans offer you the opportunity to close on your property as a "Cash" offer in as little as three days. This can give you a competitive edge, enabling you to seize lucrative opportunities while others are still caught up in lengthy financing processes.
            </p>
            <button
              onClick={() => navigateTo('/signup')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily!
            </button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img 
                src={davidImg} 
                alt="Fast funding professional consult" 
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Construction Cost Financing Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#f9f7f2] border-y border-gray-100">
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Boost Your Renovations with<br />Construction Cost Financing
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Renovations are an integral part of the fix-and-flip process. Black Wolves Acquisition LLC recognizes this and offers up to 50% financing for construction costs. This means that you not only have access to funds for purchasing the property but also for enhancing its value through necessary upgrades and repairs. Our construction cost financing ensures that you have the resources needed to transform a diamond in the rough into a lucrative investment opportunity.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=700"
                alt="Construction renovation"
                className="w-[480px] max-w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Breathing Life Into Your Vision / High LTV Funding Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=700"
                alt="Global home high LTV"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
          {/* Right Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Breathing Life Into Your Vision<br />with High LTV Funding
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              To help make your venture financially feasible, Black Wolves Acquisition LLC provides funding for up to 70% of the purchase price. We acknowledge that the availability of capital is crucial for purchasing undervalued properties and transforming them into profitable assets. With our high LTV financing, you can confidently invest in properties that have the potential for substantial returns.
            </p>
            <button
              onClick={() => navigateTo('/signup')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Now!
            </button>
          </div>
        </div>
      </section>

      {/* ── Transparent Consultation Fees Section ── */}
      <section className="relative w-full py-16 overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.04] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=700"
                alt="Transparent consultation fees property"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
          {/* Right Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Transparent Consultation Fees for<br />Hassle-free Transactions
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Black Wolves Acquisition LLC believes in transparency and strives to provide a seamless borrowing experience. We charge consultation fees ranging from 2% to 4%, so you know exactly what to expect during the loan process. Our commitment to clear communication and fair pricing ensures that you can make informed decisions while minimizing unexpected costs.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── Competitive Rates Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#f9f7f2] border-y border-gray-100">
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Competitive Rates to Enhance<br />Your Profitability
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              We understand that profitability is the ultimate goal for real estate investors. That's why Black Wolves Acquisition LLC offers competitive rates, with interest-only payments ranging from 10% to 12%. This allows you to allocate funds efficiently, focusing on the project at hand while minimizing the financial burden of high monthly payments. Our affordable rates ensure that your potential returns are maximized, contributing to your overall success in the fix-and-flip market.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=700"
                alt="Competitive rates and profitability"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection />

      {/* ── Closing Text + CTA Banner ── */}
      <ClosingCTA />

    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: 'What is Fix and Flip Loan?',
      answer: 'A fix and flip loan is a short-term financing solution used by real estate investors to purchase and renovate a property quickly, then sell it for a profit. Black Wolves Acquisition LLC offers hard money fix and flip loans with fast approvals and flexible terms tailored for Global investors.',
    },
    {
      question: 'How to get Fix and Flip Loan in Tampa, Global?',
      answer: 'Getting a fix and flip loan in Tampa, Global with Black Wolves Acquisition LLC is simple. Contact us, submit your property details and investment plan, and we\'ll get you approved and funded — often in as little as 7 days. No income verification is required.',
    },
    {
      question: 'Who needs a fix-and-flip loan?',
      answer: 'Fix and flip loans are ideal for real estate investors who want to purchase distressed or undervalued properties, renovate them, and sell at a profit. Both experienced investors and first-time flippers can benefit from our fast, flexible financing.',
    },
    {
      question: 'What is the interest rate for Fix and Flip loan in Tampa, Global?',
      answer: 'Black Wolves Acquisition LLC offers competitive interest-only rates ranging from 10% to 12% for fix and flip loans in Tampa, Global. This keeps your monthly payments manageable while you complete your renovation project.',
    },
    {
      question: 'I am a beginner, can I also get a fix and flip loan?',
      answer: 'Yes! Black Wolves Acquisition LLC welcomes both seasoned and first-time fix and flip investors. We will walk you through the process, help you understand the loan terms, and structure a deal that works for your experience level and investment goals.',
    },
    {
      question: 'How to find fix and flip properties?',
      answer: 'You can find fix and flip properties through foreclosure listings, MLS (Multiple Listing Service), real estate auctions, wholesalers, and direct mail campaigns targeting distressed homeowners. Partnering with a local Global real estate agent who specializes in investment properties is also a great strategy.',
    },
  ];

  return (
    <section className="w-full bg-[#fdfbf7] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-12">
          FAQs for Fix &amp; Flip Loans
        </h2>
        <div className="divide-y divide-slate-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center gap-3 text-left group"
              >
                <span className="text-[#c5a059] font-bold text-lg leading-none mt-0.5">&#9658;</span>
                <span
                  className={`text-[15px] font-medium transition-colors ${
                    openIndex === idx ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                  }`}
                >
                  {faq.question}
                </span>
              </button>
              {openIndex === idx && (
                <p className="mt-3 ml-7 text-slate-600 text-[14px] leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <>
      {/* ── Closing Summary Text ── */}
      <section className="w-full bg-[#f9f7f2] py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-[15px] leading-[1.9]">
            Real estate investment, particularly in the fix and flip market, offers incredible potential for wealth accumulation. With Black Wolves Acquisition LLC's fix and flip loans globally, including Tampa, Clearwater, Lakeland, and beyond, you can capitalize on market opportunities quickly and effectively. Our fast funding, high LTV, flexible terms, competitive rates, and transparent consultation fees make us your trusted partner in achieving success in the real estate investment world. Let{' '}
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span> be your gateway to profitable investing —{' '}
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#c5a059] underline underline-offset-2 hover:text-white transition-colors font-semibold"
            >
              contact us today
            </button>{' '}
            to explore how we can help turn your visions into reality.
          </p>
        </div>
      </section>

      {/* ── Easily Apply Now CTA Banner ── */}
      <section className="relative w-full h-[340px] flex items-center justify-center overflow-hidden">
        <img 
          src={michaelImg} 
          alt="Apply for a fix and flip loan" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 flex items-center justify-center w-full px-6">
          <button
            onClick={() => navigateTo('/signup')}
            className="bg-white/95 hover:bg-white text-slate-900 font-extrabold text-2xl md:text-3xl px-16 py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]"
          >
            Easily Apply Now!
          </button>
        </div>
      </section>
    </>
  );
}

