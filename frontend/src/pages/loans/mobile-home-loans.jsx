import React from 'react';
import { navigateTo } from '../../App.jsx';
import michaelImg from '../../assets/team/michael.jpg';

// Common Button Component for consistency
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const MobileHomeLoans = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Mobile Home Loans"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
            Manufactured Mobile Home<br/>Investment Services
          </h1>
          <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* --- INTRO STRIP --- */}
      <div className="bg-slate-900 py-16 px-6 md:px-24">
        <p className="max-w-6xl mx-auto text-gray-300 leading-relaxed text-[17px] text-center">
          <span className="text-[#c5a059] font-bold">Black Wolves</span> is proud to offer specialized investment services for those looking to capitalize on the lucrative opportunities in the manufactured mobile home market. With our expertise and comprehensive funding solutions, we can help you navigate this unique sector and maximize your returns. Investors must own the land where the mobile home will be located to receive consideration for a manufactured mobile home loan from <span className="text-[#c5a059]">Black Wolves</span>. <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline font-bold">Contact us today</span> to schedule a consultation.
        </p>
      </div>

      {/* --- WHY MANUFACTURED MOBILE HOME INVESTING --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Why Manufactured Mobile Home Investing?</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Investing in manufactured mobile homes presents a compelling opportunity for seasoned investors as well as those new to real estate. Here are a few reasons why:
          </p>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Affordability:</strong>
                <span className="text-slate-600 text-lg">Compared to traditional homes, manufactured mobile homes are more affordable, making them an attractive option for first-time homebuyers and those looking for affordable housing solutions. This presents a vast market with consistent demand and a steady stream of potential tenants or buyers.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Cash Flow Potential:</strong>
                <span className="text-slate-600 text-lg">Manufactured mobile homes can generate impressive cash flow, thanks to their lower acquisition costs, minimal maintenance requirements, and relatively high rental demand. This allows investors to enjoy regular income streams, potentially leading to financial stability in the long run.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Diverse Investment Options:</strong>
                <span className="text-slate-600 text-lg">The manufactured mobile home market offers a range of investment strategies to suit different risk appetites and financial goals. From individual unit flips to portfolio hold strategies, we provide the flexibility needed to succeed.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Mobile Home Investment" />
        </div>
      </section>

      {/* --- TOP BAR CTA --- */}
      <div className="bg-[#c5a059] py-8 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4 text-white font-bold uppercase tracking-wider text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span>💎 No Credit Check</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💎 Fast Closing</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💎 No financials or experience required</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💎 Trusted Lender in FL</span>
          </div>
        </div>
      </div>

      {/* --- WHY CHOOSE BLACK WOLVES --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Why Choose Black Wolves?</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            <span className="text-[#c5a059] font-bold">Black Wolves</span> has established itself as a trusted resource in the real estate investment industry, and our specialized services in manufactured mobile home investing set us apart. Here's why investors choose us:
          </p>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Experience:</strong>
                <span className="text-slate-600 text-lg">With years of experience in real estate lending and a deep understanding of the manufactured mobile home market, we have the expertise needed to help you succeed.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Personalized Approach:</strong>
                <span className="text-slate-600 text-lg">We recognize that every investor is unique, and we take the time to understand your goals and tailor our services accordingly. Our personalized approach ensures that your investment strategy aligns with your financial objectives.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
              <div>
                <strong className="text-slate-900 block text-xl mb-1">Streamlined Process:</strong>
                <span className="text-slate-600 text-lg">Our streamlined loan origination process, accompanied by our efficient communication and transparency, ensures a smooth experience from application to funding. We minimize paperwork and unnecessary delays, getting you the financing you need.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src={michaelImg} className="rounded-[40px] shadow-2xl relative z-10" alt="Why Choose Us" />
        </div>
      </section>

      {/* --- OUR SPECIALIZED SERVICES --- */}
      <section className="bg-[#f9f7f2] py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-br-[40px]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
             <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Specialized Services" />
          </div>
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Our Specialized Services</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              At <span className="text-[#c5a059] font-bold">Black Wolves</span>, we understand the unique challenges and opportunities that come with investing in manufactured mobile homes. Our experienced team is here to guide you through every step of the investment process, providing you with the necessary tools and funding to achieve your investment goals.
            </p>
            <ul className="space-y-6 text-[15px] text-slate-600 leading-relaxed">
              <li><strong className="text-slate-900 block text-lg">Funding Solutions:</strong> As a direct lender, <span className="text-[#c5a059] font-bold">Black Wolves</span> has the flexibility to match your financing needs with the best funding options available. Whether you're acquiring a single mobile home or looking to fund a larger portfolio, we have the resources to assist you.</li>
              <li><strong className="text-slate-900 block text-lg">Deal Analysis:</strong> Our team of experts conducts in-depth deal analysis to assess the viability and potential profitability of your investment opportunities. We provide you with structured insights and guidance to make informed decisions and mitigate risks.</li>
              <li><strong className="text-slate-900 block text-lg">Loan Consulting Services:</strong> We offer individual consulting services to help you navigate the manufactured mobile home market effectively. From market trends and growth projections to regulatory considerations, our consultants are here to provide you with valuable industry knowledge.</li>
              <li><strong className="text-slate-900 block text-lg">Rehab Budget Reviews:</strong> If you're considering purchasing a fixer-upper manufactured mobile home, our team can review your rehab budget to ensure that it aligns with your financial goals. We help you optimize your budget to maximize your return on investment.</li>
              <li><strong className="text-slate-900 block text-lg">Loan Servicing:</strong> Once you've secured your financing with <span className="text-[#c5a059] font-bold">Black Wolves</span>, we go beyond simply funding your investment. We offer loan servicing for mortgage investors, ensuring that your payments are collected, recorded, and managed efficiently.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 md:px-24 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Start Your Manufactured Mobile Home Investment Journey With Black Wolves
          </h3>
          <p className="text-slate-600 text-xl leading-relaxed">
            If you're ready to explore the potential of manufactured mobile home investing, <span className="text-[#c5a059] font-bold">Black Wolves</span> is here to support you every step of the way. <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline font-bold">Contact us today</span> to discuss your investment goals and to learn how we can help you succeed in the manufactured mobile home market.
          </p>
          <div className="flex justify-center">
            <GoldButton text="Contact Us Today!" onClick={() => navigateTo('/contact')} className="text-xl px-12 py-4" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default MobileHomeLoans;
