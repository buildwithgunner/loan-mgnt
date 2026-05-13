import React, { useState } from 'react';
import { navigateTo } from '../../App.jsx';
import { FaStar, FaQuoteLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import davidImg from '../../assets/team/david.jpg';
import sarahImg from '../../assets/team/sarah.jpg';
import michaelImg from '../../assets/team/michael.jpg';

const testimonialsData = [
  {
    id: 1,
    name: "John & Amanda D.",
    location: "Tampa, FL",
    project: "Fix & Flip",
    rating: 5,
    avatar: michaelImg,
    summary: "Black Wolves Acquisition LLC moved incredibly fast to secure our funds. We were able to buy the property in cash within a week.",
    fullReview: "Black Wolves Acquisition LLC moved incredibly fast to secure our funds. We were able to buy the property in cash within a week and start our renovations immediately. Their team was communicative every step of the way, making what is usually a stressful process feel incredibly smooth and managed. We just closed our third deal with them this year, and we wouldn't look anywhere else for alternative financing."
  },
  {
    id: 2,
    name: "Samantha Reed",
    location: "Orlando, FL",
    project: "New Construction",
    rating: 5,
    avatar: sarahImg,
    summary: "Their transparency and reliable draw schedules during our new construction project gave us immense peace of mind.",
    fullReview: "Their transparency and reliable draw schedules during our new construction project gave us immense peace of mind. Ground-up construction can be highly unpredictable, but knowing that Black Wolves was fully prepared and funded for our draw requests the moment the inspector approved phase completions saved us weeks of delays. Truly a partner, not just a lender."
  },
  {
    id: 3,
    name: "Marcus T.",
    location: "Miami, FL",
    project: "Cash-Out Refinance",
    rating: 5,
    avatar: davidImg,
    summary: "I needed capital fast to jump on a new acquisition and Black Wolves made the cash-out refi process totally painless.",
    fullReview: "I needed capital fast to jump on a multi-family acquisition opportunity. Traditional banks were quoting 45-60 days which would have killed the deal. Black Wolves made the cash-out refi process totally painless and funded me in 12 days. The agility of their underwriting is unmatched in the South Global market."
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    location: "Jacksonville, FL",
    project: "Bridge Loan",
    rating: 5,
    avatar: sarahImg,
    summary: "Professional, straightforward, and no hidden fees. They delivered exactly what was quoted on the term sheet.",
    fullReview: "Professional, straightforward, and no hidden fees. They delivered exactly what was quoted on the term sheet from day one. I've been burned by bait-and-switch lenders before, but Black Wolves operates with the highest level of integrity. Their bridge loan structure was perfectly tailored to my tight timeline, and the rate was highly competitive."
  },
  {
    id: 5,
    name: "Dominic V.",
    location: "West Palm Beach, FL",
    project: "Portfolio Restructure",
    rating: 5,
    avatar: davidImg,
    summary: "The consultative approach stood out. They didn't just give me a loan; they helped optimize my entire portfolio structure.",
    fullReview: "The consultative approach at Black Wolves really stood out. They didn't just give me a loan; they analyzed my upcoming tax implications and helped optimize my entire portfolio structure to maximize my leverage safely. It’s rare to find a hard money lender that actually cares about your long-term wealth growth rather than just the immediate transaction."
  },
  {
    id: 6,
    name: "Robert M.",
    location: "Fort Lauderdale, FL",
    project: "Fix & Lease",
    rating: 5,
    avatar: michaelImg,
    summary: "From application to closing table, the level of service was 5-star. Excellent communication.",
    fullReview: "From application to closing table, the level of service was 5-star. Excellent communication regarding the appraisal, title work, and final closing docs. Even my title company remarked on how easy the Black Wolves team was to work with. The BRRRR (Buy, Rehab, Rent, Refinance, Repeat) strategy is my bread and butter, and Black Wolves is now my go-to capital partner."
  }
];

export default function Testimonials() {
  const title = "Success Stories";
  const subtitle = "Don't just take our word for it. Hear from the partners we've helped succeed.";
  const heroImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600";

  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[450px] flex items-end">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover text-center" style={{objectPosition: "center 30%"}} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="relative z-10 px-6 pb-20 w-full text-center max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#c5a059]/20 text-[#c5a059] font-semibold text-sm mb-4 border border-[#c5a059]/30 tracking-wider uppercase">
            Testimonials
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight font-serif">{title}</h1>
          <p className="text-lg md:text-2xl font-light text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Intro */}
        <div className="flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
          <div className="h-1 w-20 bg-[#c5a059] mb-8 rounded-full" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Real Results from Real Investors</h2>
          <p className="text-[17px] leading-relaxed text-slate-600 mb-4">
            Our agility, transparency, and deep understanding of the real estate market make us the preferred partner for investors globally. See how our funding solutions have empowered our clients to scale their portfolios and close deals faster.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((review) => {
            const isExpanded = expandedIds.has(review.id);
            return (
              <div 
                key={review.id} 
                className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300 border border-slate-100 flex flex-col h-full relative overflow-hidden group"
              >
                {/* Decorative Quote Icon Background */}
                <FaQuoteLeft className="absolute -top-4 -left-4 text-9xl text-slate-50 opacity-50 transform rotate-12 transition-transform duration-500 group-hover:-rotate-12" />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6 text-[#c5a059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} size={18} />
                    ))}
                  </div>

                  {/* Review Content */}
                  <div className="mb-6 flex-1">
                    <div className="text-lg font-medium text-slate-800 leading-relaxed italic relative">
                      "{isExpanded ? review.fullReview : review.summary}"
                      
                      {/* Animated Expand Button */}
                      {review.fullReview.length > review.summary.length && (
                        <button 
                          onClick={() => toggleExpand(review.id)}
                          className="mt-3 flex items-center gap-2 text-sm font-bold text-[#c5a059] hover:text-[#b08d4a] transition-colors uppercase tracking-wide cursor-pointer focus:outline-none w-full justify-center group/btn border border-transparent hover:border-[#c5a059]/20 py-2 rounded-lg bg-slate-50 hover:bg-[#c5a059]/5"
                        >
                          {isExpanded ? (
                            <>Read Less <FaChevronUp className="transform group-hover/btn:-translate-y-1 transition-transform" /></>
                          ) : (
                            <>Read Full Review <FaChevronDown className="transform group-hover/btn:translate-y-1 transition-transform" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Reviewer Details */}
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#c5a059]/20"
                        />
                         <div>
                          <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                          <p className="text-slate-500 text-sm">{review.location}</p>
                        </div>
                      </div>
                      <div className="bg-slate-900/5 px-3 py-1 rounded-full border border-slate-900/10">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{review.project}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-24 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">Become Our Next Success Story</h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
            Experience the Black Wolves Acquisition LLC difference. Fast approvals, transparent terms, and a team dedicated to getting your deal done. 
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
          >
            Apply For Initial Review
          </button>
        </div>
      </section>
    </div>
  );
}

