import React from 'react';
import { navigateTo } from '../../App.jsx';
import michaelImg from '../../assets/team/michael.jpg';
import sarahImg from '../../assets/team/sarah.jpg';

// Common Button Component for consistency
const GoldButton = ({ text, className = "", onClick }) => (
  <button onClick={onClick} className={`bg-[#c5a059] hover:bg-[#b08d48] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${className}`}>
    {text}
  </button>
);

const CapitalMarketsLoans = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Capital Markets"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1]">
            Black Wolves:<br/>Capital Markets
          </h1>
          <GoldButton text="Contact Us" onClick={() => navigateTo('/contact')} />
        </div>
      </section>

      {/* --- INTRO STRIP --- */}
      <div className="bg-slate-900 py-16 px-6 md:px-24">
        <p className="max-w-6xl mx-auto text-gray-300 leading-relaxed text-[17px] text-center">
          Welcome to <span className="text-[#c5a059] font-bold">Black Wolves</span>, your trusted partner in the world of capital markets. We specialize in providing tailored financing solutions to meet the unique needs of businesses and individuals. With our extensive experience and expertise, we are serving clients globally and select markets across the country. Let us help you navigate the complex landscape of capital market funding and financing, ensuring your financial goals are achieved with precision.
        </p>
      </div>

      {/* --- CAPITAL MARKETS FUNDING --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Capital Markets Funding</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            At <span className="text-[#c5a059] font-bold">Black Wolves</span>, we recognize the pivotal role that capital markets play in driving economic growth and facilitating financial transactions. Whether you're a business owner looking to expand operations or an individual seeking financing for personal ventures, our capital market funding solutions can help you achieve your goals.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">
            Our team of experts understands the intricacies of the capital market landscape. We work closely with our clients to assess their specific funding requirements and develop customized strategies. By leveraging our extensive network of investors and financial institutions, we connect you with capital market funding opportunities that align with your business objectives or personal aspirations.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c5a059] rounded-tr-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Capital Markets Funding" />
        </div>
      </section>

      {/* --- WHY CHOOSE BLACK WOLVES --- */}
      <section className="bg-slate-900 py-24 px-6 md:px-24 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Why Choose Black Wolves</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              When it comes to capital markets, choosing the right partner is crucial. <span className="text-[#c5a059] font-bold">Black Wolves</span> sets itself apart with our commitment to delivering exceptional service and tailored solutions. Here's why you should choose us:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#c5a059] block text-xl mb-1">Expertise:</strong>
                  <span className="text-gray-400 text-lg">Our team brings extensive knowledge and experience in the capital market arena. We stay updated with the latest market trends and regulatory changes to provide you with informed guidance.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#c5a059] block text-xl mb-1">Personalized Approach:</strong>
                  <span className="text-gray-400 text-lg">We understand that each client has unique needs and objectives. Our personalized approach ensures that our solutions are tailored to your specific requirements, providing you with the best opportunities for success.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#c5a059] block text-xl mb-1">Extensive Network:</strong>
                  <span className="text-gray-400 text-lg">Through our wide network of investors and financial institutions, we connect you with the right funding sources. Our strong relationships enable us to access a diverse range of capital market funding options.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-[#c5a059] mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#c5a059] block text-xl mb-1">Market Focus:</strong>
                  <span className="text-gray-400 text-lg">With a primary focus on Global and select markets across the country, we have in-depth knowledge of the local market dynamics. We leverage this regional expertise to provide insights and opportunities specific to your target locations.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-bl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
             <img src="https://images.unsplash.com/photo-1454165833267-034f968b50b2?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Consultation" />
          </div>
        </div>
      </section>

      {/* --- CAPITAL MARKET FINANCING --- */}
      <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Capital Market Financing</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Securing appropriate financing is crucial for businesses aiming to thrive in the competitive market. At <span className="text-[#c5a059] font-bold">Black Wolves</span>, we offer a range of capital market financing options tailored to your unique needs. Whether you require debt financing, equity financing, or a combination of both, our team is here to guide you through the process and provide the support you need.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            We understand that every business or individual has different financial goals and risk tolerance levels. Our flexible capital market financing solutions are designed to adapt to your specific circumstances. We carefully assess your financial situation, evaluate market conditions, and provide strategic recommendations to optimize your financing structure. Our goal is to help you access the capital you need while minimizing risks and maximizing returns.
          </p>
          <GoldButton text="Contact Us" onClick={() => navigateTo('/contact')} />
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#c5a059] rounded-tl-[40px]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" className="rounded-[40px] shadow-2xl relative z-10" alt="Financing" />
        </div>
      </section>

      {/* --- FINAL CONTACT CTA --- */}
      <section className="bg-slate-900 py-24 px-6 md:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">Contact Us</h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            If you're ready to explore the possibilities of capital market funding and financing, <span className="text-[#c5a059] font-bold">Black Wolves</span> is here to assist you. Our adaptable and responsible team is dedicated to understanding your unique needs and delivering creative solutions that align with your goals. <span onClick={() => navigateTo('/contact')} className="text-[#c5a059] cursor-pointer hover:underline font-bold">Contact us today</span> to begin your journey toward financial success.
          </p>
          <GoldButton text="Get in Touch" onClick={() => navigateTo('/contact')} className="text-xl px-12 py-4" />
        </div>
      </section>

    </div>
  );
};

export default CapitalMarketsLoans;

