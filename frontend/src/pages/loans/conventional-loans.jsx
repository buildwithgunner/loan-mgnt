import React from 'react';
import { navigateTo } from '../../App.jsx';
import davidImg from '../../assets/team/david.jpg';
import sarahImg from '../../assets/team/sarah.jpg';
import michaelImg from '../../assets/team/michael.jpg';

// Common Button Component for consistency
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const ConventionalLoans = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Conventional Loans"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
            Conventional Loans globally
          </h1>
          <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* --- INTRO STRIP --- */}
      <div className="bg-slate-900 py-16 px-6 md:px-24">
        <p className="max-w-6xl mx-auto text-gray-300 leading-relaxed text-[17px] text-center">
          At <span className="text-[#c5a059] font-bold">Black Wolves</span>, we understand the unique needs of real estate investors globally. That's why we offer a comprehensive range of hard money lending services tailored to your investment goals. One of our key offerings is <span className="text-[#c5a059]">conventional loans</span>, a financing option that provides flexibility and peace of mind.
        </p>
      </div>

      {/* --- WHAT ARE CONVENTIONAL LOANS --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">What Are Conventional Loans?</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Conventional loans are a type of loan secured by real estate collateral. Unlike government-backed loans, conventional loans are provided by private lenders like Black Wolves and follow the guidelines set by major financial institutions. For real estate investors, these loans offer a reliable path to property ownership with competitive terms and a focus on the asset's value and the borrower's creditworthiness.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            This financing option allows you to maintain control over your personal finances while leveraging the property to achieve your investment objectives. Our team ensures that you understand every aspect of your conventional loan, providing a transparent and efficient process from application to closing.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Conventional Loans Explained" />
        </div>
      </section>

      {/* --- ADVANTAGES --- */}
      <section className="bg-[#f9f7f2] py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Advantages of Conventional Loans</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              At <span className="text-[#c5a059] font-bold">Black Wolves</span>, we are proud to offer conventional loans as part of our comprehensive range of financing solutions for real estate investors. We understand the unique needs of our clients, and conventional loans provide several key advantages for savvy investors like you.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">Flexibility in Investment Opportunities:</strong>
                  <span className="text-slate-600 text-lg">Investing in real estate often requires being agile and opportunistic. Conventional loans offer you the flexibility to explore a broader range of investment opportunities. Whether you're looking to flip properties, invest in rental properties, or undertake new construction projects, our loans enable you to seize high-potential ventures.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">Streamlined Approval Process:</strong>
                  <span className="text-slate-600 text-lg">We understand that time is of the essence in the competitive real estate market. With <span className="text-[#c5a059] font-bold">Black Wolves</span>, you'll benefit from our streamlined approval process. Our experienced team moves swiftly to evaluate your investment potential, ensuring that you receive timely approvals and funding.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 block text-xl mb-1">Expert Guidance:</strong>
                  <span className="text-slate-600 text-lg"><span className="text-[#c5a059] font-bold">Black Wolves</span> is more than just a real estate lending service — we are your partner in success. Our team of knowledgeable professionals specializes in real estate financing and is here to guide you every step of the way. We will provide you with transparent communication, answer any questions you may have, and ensure that you fully understand the terms and conditions of your loan.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
             <img src={michaelImg} className="rounded-[40px] shadow-2xl relative z-10" alt="Advantages" />
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE BLACK WOLVES --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-bl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
          <img src={sarahImg} className="rounded-[40px] shadow-2xl relative z-10" alt="Why Choose Us" />
        </div>
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Why Choose Black Wolves for Conventional Loans globally?</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            We specialize in real estate financing, making us experts in understanding the unique needs and challenges of real estate investors. Our in-depth knowledge allows us to provide tailored solutions that align with your investment goals and objectives. Here are some other reasons why you should partner with our team:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Trusted Lender in Tampa',
              'Flexible Financing Options',
              'Transparency and Personalized Service',
              'Competitive Rates',
              'Fast Funding',
              'Expert Market Knowledge'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#c5a059]" />
                <span className="text-slate-700 font-semibold">{item}</span>
              </div>
            ))}
          </div>
          <GoldButton text="Apply Now!" onClick={() => navigateTo('/signup')} className="mt-6" />
        </div>
      </section>

      {/* --- TERMS SECTION --- */}
      <section className="bg-slate-900 py-24 px-6 md:px-24 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Conventional Loan Terms</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Loan-to-Value (LTV):</strong>
                  <span className="text-gray-300 text-lg">We offer funding of up to 75% of the asset value, allowing you to leverage the equity in your investment property to secure the financing you need.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Term:</strong>
                  <span className="text-gray-300 text-lg">Our conventional loans have flexible terms ranging from 12 to 36 months. This provides you with the necessary time to execute your investment strategy and maximize returns.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Interest Rate:</strong>
                  <span className="text-gray-300 text-lg">Our interest rates are competitive, ensuring that you have a cost-effective financing solution that aligns with your investment goals.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-white block text-xl mb-1">Origination Fee:</strong>
                  <span className="text-gray-300 text-lg">We charge a standard origination fee to cover the costs associated with processing and funding your conventional loan.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
             <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl" alt="Loan Terms" />
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 md:px-24 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Easily Apply Now!
          </h2>
          <p className="text-slate-600 text-xl leading-relaxed">
            Ready to take the next step in your real estate investment journey? Contact <span className="text-[#c5a059] font-bold">Black Wolves</span> today to learn more about our conventional loan options and start your application.
          </p>
          <div className="flex justify-center gap-6">
            <GoldButton text="Apply Now" onClick={() => navigateTo('/signup')} className="text-xl px-12 py-4" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ConventionalLoans;

