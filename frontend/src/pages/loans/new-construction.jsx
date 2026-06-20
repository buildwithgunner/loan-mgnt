import React from 'react';
import { navigateTo } from '../../App.jsx';
import davidImg from '../../assets/team/david.jpg';
import michaelImg from '../../assets/team/michael.jpg';

export default function NewConstruction() {
  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative w-full h-[500px] flex items-end">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600"
          alt="New construction building globally"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 px-12 pb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
            New Construction<br />Loans globally
          </h1>
          <button
            onClick={() => navigateTo('/signup')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* ── Intro Text Block ── */}
      <section className="w-full bg-[#f9f7f2] py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-[15px] leading-[1.9]">
            Are you looking to build a single-family residence or a commercial construction project in the state of Global? Look no further than{' '}
            <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span>{' '}
            for all your new construction loan needs! We offer competitive and flexible loan options for both residential and commercial construction projects throughout Global in order to help you make your vision a reality. Our{' '}
            <span className="text-[#c5a059] font-semibold">experienced team of loan consultants</span>{' '}
            can provide you with the assistance and support you need to get the financing you need for your project.
          </p>
        </div>
      </section>

      {/* ── What to Expect from Black Wolves Funding ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
        <div
          className="absolute inset-0 opacity-[0.05] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=40&w=1600')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
              What to Expect from Black Wolves<br />Funding
            </h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Our New Construction Loan is a short-term financing option that will help you bring your vision to life. Whether you are building a single family home or a multi-family asset, our customizable loan options will cater to your specific needs. With builder-friendly draw schedules, featuring up to seven draws, you can rest assured that your construction progress will be well-funded.
            </p>
            <button
              onClick={() => navigateTo('/signup')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Now
            </button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img 
                src={davidImg} 
                alt="Loan consultant reviewing plans" 
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Terms Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#f9f7f2] border-y border-gray-100">
        <div className="relative z-10 max-w-6xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 space-y-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">Terms</h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              Our loan <strong className="text-slate-900">terms</strong> are typically 12 months, allowing you ample time to complete the construction process. During this time, you will only be required to make interest-only payments. With competitive <strong className="text-slate-900">rates</strong> and <strong className="text-slate-900">origination fees</strong>, our New Construction Loan offers a cost-effective solution for your construction financing needs.
            </p>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              At Black Wolves Acquisition LLC, we understand the importance of trust when it comes to choosing a lender. We have earned a reputation as a trusted partner globally, providing reliable and efficient financing solutions. With our streamlined application process, you can expect a fast funding turnaround, ensuring that you can start construction without delay.
            </p>
            <button
              onClick={() => navigateTo('/signup')}
              className="mt-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
            >
              Apply Now
            </button>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-[#c5a059] rounded-tr-2xl z-10" />
              <img 
                src={michaelImg} 
                alt="Loan officer handshake with clients" 
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="relative w-full py-20 overflow-hidden bg-[#fdfbf7]">
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
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=700"
                alt="Construction framing structure"
                className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
              />
            </div>
          </div>
          {/* Right Text */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">Features</h2>
            <p className="text-slate-600 text-[15px] leading-[1.75] max-w-lg">
              One of the key features of our new construction loan is that we offer funding of up to 100% of the construction cost. We also provide separate financing for the land and the construction costs.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section with Side Image ── */}
      <NCFAQSection />

      {/* ── Closing Contact Text ── */}
      <section className="w-full bg-[#f9f7f2] py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-slate-600 text-[15px] leading-[1.9]">
            If you have any queries about our New Construction Loans in Tampa, FL, feel free to call us at{' '}
            <a href="tel:15635710448" className="text-[#c5a059] font-semibold hover:underline">
              563-571-0448
            </a>{' '}
            or fill out our online funding form. We will respond within one business day. Trust Black Wolves Acquisition LLC for all your new construction loan needs globally!
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Questions? Contact Us Today
          </button>
        </div>
      </section>

      {/* ── Apply Now CTA Banner ── */}
      <section className="relative w-full h-[320px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1600"
          alt="Apply for a new construction loan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 flex items-center justify-center w-full px-6">
          <button
            onClick={() => navigateTo('/signup')}
            className="bg-white/95 hover:bg-white text-slate-900 font-extrabold text-2xl md:text-3xl px-20 py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)]"
          >
            Apply Now!
          </button>
        </div>
      </section>

    </div>
  );
}

function NCFAQSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: 'What are New Construction Loans?',
      answer: 'New construction loans are short-term financing solutions used to fund the building of a new property from the ground up. Black Wolves Acquisition LLC covers lot purchase, materials, and labor with milestone-based draw schedules.',
    },
    {
      question: 'How do new construction loans work?',
      answer: 'Once approved, funds are disbursed in draws as construction milestones are completed and inspected. You make interest-only payments during the loan term, and the full balance is typically due upon project completion or refinancing.',
    },
    {
      question: "I don't have any builder experience, can I still get a new construction loan?",
      answer: "Yes! Black Wolves Acquisition LLC works with both experienced developers and first-time builders. We evaluate your project plan, the property's after-completion value, and your investment goals rather than requiring prior builder credentials.",
    },
    {
      question: 'How do I apply for a new construction loan?',
      answer: 'Simply contact our team through the Apply Now button or visit our Contact page. One of our loan consultants will walk you through the application, required documents, and timeline for funding.',
    },
    {
      question: 'When do you close on a new construction loan?',
      answer: 'We typically close new construction loans in 7 to 14 business days from a completed application. Our streamlined process ensures you can break ground without unnecessary delays.',
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
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
              src="https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?auto=format&fit=crop&q=80&w=700"
              alt="New construction interior framing"
              className="relative z-0 w-[420px] max-w-full rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Right: Intro text + FAQ */}
        <div className="flex-1 space-y-6">
          <p className="text-slate-600 text-[15px] leading-[1.75]">
            In addition to our New Construction Loan, we offer a range of other{' '}
            <span className="text-[#c5a059] font-semibold">residential construction loan</span> and{' '}
            <span className="text-[#c5a059] font-semibold">commercial construction loan</span>{' '}
            products globally, including fix and flip loans, refinancing options, and fix and lease loans. Our commitment to providing diverse financing options allows us to cater to a wide range of real estate investment needs.
          </p>
          <p className="text-slate-600 text-[15px] leading-[1.75]">
            Now, let's address some frequently asked questions about New Construction Loans:
          </p>

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
        </div>
      </div>
    </section>
  );
}


