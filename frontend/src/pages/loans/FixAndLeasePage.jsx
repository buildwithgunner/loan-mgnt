import React from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import davidImg from '../../assets/team/david.jpg';
import sarahImg from '../../assets/team/sarah.jpg';

// Common Button Component for consistency
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const FixAndLeasePage = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-900">
      
      {/* --- HERO SECTION (Screenshot 190433) --- */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Property Background"
          />
          <div className="absolute inset-0 bg-[#051a2c]/75"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1]">
            Fix and Lease Loans globally – Apply Now Online
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-10 text-gray-200">
            Real Estate Investment Potential with Black Wolves Acquisition LLC
          </p>
          <div className="flex flex-wrap gap-4">
            <GoldButton text="Apply Easily!" onClick={() => navigateTo('/contact')} />
          </div>
        </div>
      </section>

      {/* --- INTRO STRIP (Screenshot 190450 Top) --- */}
      <div className="bg-[#051a2c] py-12 px-6 md:px-24">
        <p className="max-w-6xl mx-auto text-gray-300 leading-relaxed text-[15px]">
          When it comes to real estate investment, finding the right financing solution can make all the difference. 
          Fix-and-lease loans offer real estate investors globally, including Tampa, Clearwater, Lakeland, and beyond, 
          the opportunity to improve properties and increase their value without the lengthy commitments of traditional 
          long-term financing. With quick funding, flexible terms, and the ability to repay through stabilized rental income, 
          refinance, or other transactions, <span className="text-[#c5a059]">Black Wolves Acquisition LLC</span> empowers investors to 
          maximize their investments with ease and confidence.
        </p>
      </div>

      {/* --- LTV SECTION (Screenshot 190450 Bottom) --- */}
      <section className="py-20 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Financial Flexibility with High LTV Funding</h2>
          <p className="text-gray-600 leading-relaxed">
            At Black Wolves Acquisition LLC, we understand the importance of securing the necessary funds to achieve your investment goals. 
            With our fix-and-lease loans, we offer funding for up to 70% of the purchase price, allowing you to acquire 
            properties with minimal out-of-pocket expenses. This high loan-to-value (LTV) ratio provides you with the 
            financial flexibility to invest in properties that have significant potential for value appreciation.
          </p>
          <button onClick={() => navigateTo('/contact')} className="bg-[#051a2c] text-white px-10 py-2.5 rounded-full font-bold hover:bg-[#0a253d] transition">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src={davidImg} className="rounded-[40px] shadow-2xl relative z-10" alt="Handshake" />
        </div>
      </section>

      {/* --- RENOVATION SECTION (Screenshot 190805) --- */}
      <section className="py-20 px-6 md:px-24 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Renovation" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Boost Your Property Renovations with Funding</h2>
          <p className="text-gray-600 leading-relaxed">
            Renovations are a vital part of increasing a property's value and attracting quality tenants. Black Wolves Acquisition LLC 
            recognizes this need and offers funding up to 50% of the renovation costs. Whether you plan to make minor 
            cosmetic upgrades or undertake major overhauls, our fix-and-lease loans give you the resources needed to 
            transform a property into a desirable rental space.
          </p>
          <GoldButton text="Apply Now!" onClick={() => navigateTo('/signup')} />
        </div>
      </section>

      {/* --- FLEXIBLE TERMS (Screenshot 190819) --- */}
      <section className="bg-[#f9f7f2] py-24 px-6 md:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Flexible Loan Terms for Tailored Solutions</h2>
            <p className="text-gray-700 leading-relaxed">
              Real estate investment strategies can vary greatly, which is why Black Wolves Acquisition LLC provides flexible loan 
              terms ranging from 8 months to 24 months. This allows you to customize the duration of the loan 
              to align with your investment goals.
            </p>
            <button onClick={() => navigateTo('/contact')} className="bg-[#c5a059] text-white px-10 py-3 rounded-full font-bold hover:bg-[#b08d48] transition">
              Discuss Your Options
            </button>
          </div>
          <div className="md:w-1/2">
             <img src={sarahImg} className="rounded-[40px] shadow-2xl" alt="Consultation" />
          </div>
        </div>
      </section>

      {/* --- RATES SECTION (Screenshot 190842) --- */}
      <section className="py-20 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Profitable Investment" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Competitive Rates for Profitable Investments</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            Black Wolves Acquisition LLC understands that profitability is a key consideration for real estate investors. That's why 
            we offer competitive interest rates ranging from <span className="font-bold">10% to 13%</span> on our 
            fix-and-lease loans. By offering interest-only payments, we provide you with the opportunity to 
            allocate your funds effectively during the renovation and leasing process.
          </p>
        </div>
      </section>

      {/* --- CONSULTATION FEES (Screenshot 190854) --- */}
      <section className="py-20 px-6 md:px-24 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Transparent Consultation Fees for a Seamless Borrowing Experience</h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            We believe in transparency and simplicity throughout the borrowing process. We charge consultation fees 
            ranging from <span className="font-bold">2% to 4%</span>, ensuring that you have a clear understanding 
            of the costs involved. Our commitment to transparent pricing ensures you can make informed decisions.
          </p>
          <GoldButton text="Apply Now!" onClick={() => navigateTo('/signup')} />
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Transparent Fees" />
        </div>
      </section>

      {/* --- FINAL CTA (Screenshot 190904 & 190915) --- */}
      <section className="bg-[#f9f7f2] py-24 px-6 md:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#051a2c] mb-8">
            Customize Your Real Estate Investment Journey with Black Wolves Acquisition LLC
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            With Black Wolves Acquisition LLC's fix-and-lease loans, real estate investors globally can unlock the potential of 
            their investments with tailored financing solutions. Our high LTV funding, flexible loan terms, 
            competitive interest rates, and transparent consultation fees enable you to transform properties. 
            <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline ml-1">Contact us today</span> to explore how we can help you.
          </p>
          
          {/* Screenshot 190915 Style Button */}
          <div onClick={() => navigateTo('/contact')} className="bg-[#e5e7eb] py-8 px-4 rounded-lg inline-block w-full max-w-4xl shadow-inner cursor-pointer hover:opacity-90 transition">
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#051a2c]">
              Easily Apply Now!
            </h3>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FixAndLeasePage;

