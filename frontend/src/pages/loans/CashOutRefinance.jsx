import React from 'react';
import { navigateTo } from '../../App.jsx';
import davidImg from '../../assets/team/david.jpg';
import sarahImg from '../../assets/team/sarah.jpg';
import michaelImg from '../../assets/team/michael.jpg';

export default function CashOutRefinance() {
  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative w-full h-[500px] flex items-end">
        <img 
          src={michaelImg} 
          alt="Cash-out refinance loan signing" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 px-12 pb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
            Black Wolves Acquisition LLC: Your<br />Trusted Partner for<br />Cash-Out Refinance<br />Loans globally.
          </h1>
          <button
            onClick={() => navigateTo('/contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Apply Easily!
          </button>
        </div>
      </section>

      {/* ── Intro Text Block ── */}
      <section className="w-full bg-[#f9f7f2] py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-[15px] leading-[1.9]">
            At{' '}
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span>
            , we understand that homeownership is an important milestone in your life. Whether you're looking to reduce your monthly mortgage payments, tap into your home's equity for a major purchase, or consolidate high-interest debt, our cash-out refinance loans provide the financial flexibility you need. At our core, we are dedicated to responsibility. We understand that the refinance process can be daunting, which is why we are here to offer our approach. Our goal is to guide you every step of the way, ensuring that your needs are not only met but exceeded.
          </p>
        </div>
      </section>

      {/* ── Why Choose a Cash-Out Refinance Loan? ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
        <div
          className="absolute inset-0 opacity-[0.05] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Why Choose a Cash-Out<br />Refinance Loan?
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              A cash-out refinance loan allows you to leverage the equity you've built in your home and convert it into usable funds. By refinancing your existing mortgage, you can access a portion of your home's value and receive a lump sum payout. This provides you with the opportunity to pursue various financial goals, such as home improvements, educational expenses, or even starting a business. With our competitive interest rates and flexible terms, Black Wolves Acquisition LLC ensures that your cash-out refinance loan is tailored to your specific needs.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily!
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=700"
                alt="Hands counting cash payout from refinance"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Loan FAQs Section ── */}
      <QuickFAQSection />

      {/* ── A Responsible Approach to Refinance Loans ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#f9f7f2] border-y border-gray-100">
        <div
          className="absolute inset-0 opacity-[0.05] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              A Responsible Approach to<br />Refinance Loans
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Responsibility is at the core of everything we do at Black Wolves Acquisition LLC. We prioritize responsible lending practices to ensure that our clients make informed decisions about their refinance loans. Our team of knowledgeable loan officers will provide you with transparent information, explaining the terms and conditions of your loan in a clear and concise manner. We believe in empowering you to make the right financial choices for yourself and your future.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#051a2c] hover:bg-[#0d2f47] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Learn More
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img 
                src={sarahImg} 
                alt="Couple meeting with loan officer" 
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Refinance Mortgage Made Easy ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
        <div
          className="absolute inset-0 opacity-[0.06] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#c5a059] leading-snug">
              Refinance Mortgage Made Easy
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              At Black Wolves Acquisition LLC, we take pride in simplifying the refinance mortgage process for our valued clients. Our{' '}
              <span className="text-[#c5a059] font-semibold underline underline-offset-2">team of experienced loan officers</span>{' '}
              will walk you through each step, ensuring a smooth and hassle-free experience. From gathering necessary documents to evaluating your eligibility, we handle the paperwork while you focus on your financial goals. With our advanced technology and personalized service, we strive to make your refinance journey as seamless as possible.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily!
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img 
                src={davidImg} 
                alt="Loan officer assisting client with refinance signing" 
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Black Wolves Acquisition LLC in Clearwater and Jacksonville ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#f9f7f2] border-y border-gray-100">
        <div
          className="absolute inset-0 opacity-[0.05] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img
                src="https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?auto=format&fit=crop&q=80&w=700"
                alt="Clearwater Global aerial beachfront view"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
          {/* Right Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              Black Wolves Acquisition LLC in Clearwater and<br />Jacksonville
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Black Wolves Acquisition LLC operates in major cities globally, including{' '}
              <span className="text-[#c5a059] font-semibold">Clearwater</span> and{' '}
              <span className="text-[#c5a059] font-semibold">Jacksonville</span>. Our dedicated presence in these vibrant communities allows us to understand the unique needs of homeowners in these areas. Whether you're looking to refinance your beachfront property in Clearwater or seeking to tap into the growing real estate market in{' '}
              <span className="text-[#c5a059] font-semibold">Jacksonville</span>, Black Wolves Acquisition LLC is your trusted partner. Our local expertise, combined with our nationwide reach, enables us to provide tailored solutions that fit your specific circumstances.
            </p>
            <button
              onClick={() => navigateTo('/contact')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-slate-700 font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Easily!
            </button>
          </div>
        </div>
      </section>

      {/* ── Partner with Black Wolves Acquisition LLC Today ── */}
      <section className="w-full bg-[#fdfbf7] py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Partner with Black Wolves Acquisition LLC Today</h2>
          <p className="text-slate-600 text-[15px] leading-[1.9]">
            When it comes to refinancing loans globally,{' '}
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span>{' '}
            is your reliable partner. With our personalized approach, we offer you the financial freedom you deserve. Whether you're seeking to lower your monthly payments, consolidate debt, or unlock your home's equity, our cash-out refinance loans can help you achieve your goals.{' '}
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#c5a059] underline underline-offset-2 hover:text-white transition-colors font-semibold"
            >
              Contact us today
            </button>{' '}
            to explore how we can help you achieve your financial goals.
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ── Contact Us CTA Banner ── */}
      <section className="relative w-full h-[320px] flex items-center justify-center overflow-hidden">
        <img 
          src={michaelImg} 
          alt="Contact Black Wolves Acquisition LLC for cash-out refinance" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 flex items-center justify-center w-full px-6">
          <button
            onClick={() => navigateTo('/contact')}
            className="bg-white/95 hover:bg-white text-slate-900 font-extrabold text-2xl md:text-3xl px-20 py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]"
          >
            Contact Us
          </button>
        </div>
      </section>

    </div>
  );
}

function QuickFAQSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: 'What happens when you refinance a home loan?',
      answer: 'When you refinance a home loan, you replace your existing mortgage with a new one — often with different terms, interest rates, or loan amounts. In a cash-out refinance, the new loan is larger than your existing balance, and you receive the difference as a lump sum of cash you can use for any purpose.',
    },
    {
      question: 'How to get Cash out refinance in Tampa, FL?',
      answer: 'Getting a cash-out refinance in Tampa, FL with Black Wolves Acquisition LLC is simple. Contact our team, provide details about your property and current mortgage, and we\'ll evaluate your equity and tailor a loan that fits your goals. We typically close in as little as 7 days with no income verification required.',
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
      <div
        className="absolute inset-0 opacity-[0.05] bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-start gap-12">
        {/* Left Image */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <div className="relative">
            <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=700"
              alt="Global home for cash-out refinance"
              className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Right: Quick FAQs */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Quick Loan FAQs:</h2>

          {/* Loan Stats */}
          <ul className="space-y-2 text-[14px] text-slate-700">
            <li>
              <span className="font-bold text-slate-900">• LTV:</span>{' '}
              <span className="text-[#c5a059] font-semibold">Funding up to 70% of asset value</span>
            </li>
            <li>
              <span className="font-bold text-slate-900">• Term:</span>{' '}
              <span className="text-[#c5a059] font-semibold">8 Months</span>
              <span className="text-slate-600">-24 Months</span>
            </li>
            <li>
              <span className="font-bold text-slate-900">• Rate:</span>{' '}
              <span className="text-slate-600">10-13% Interest-Only Payments</span>
            </li>
            <li>
              <span className="font-bold text-slate-900">• Consultation Fee:</span>{' '}
              <span className="text-slate-600">2-4%</span>
            </li>
          </ul>

          {/* FAQ Accordion */}
          <div className="divide-y divide-slate-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center gap-3 text-left group"
                >
                  <span className="text-[#c5a059] font-bold text-base leading-none mt-0.5">&#9658;</span>
                  <span
                    className={`text-[14px] font-medium transition-colors ${
                      openIndex === idx ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                  >
                    {faq.question}
                  </span>
                </button>
                {openIndex === idx && (
                  <p className="mt-3 ml-6 text-slate-600 text-[13px] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigateTo('/contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Contact Us for More Information
          </button>
        </div>
      </div>
    </section>
  );
}

