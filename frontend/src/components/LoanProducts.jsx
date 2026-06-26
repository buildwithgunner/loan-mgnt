import React from 'react';
import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';

const products = [
  {
    title: 'Fix and flip',
    href: '/loans/fix-and-flip',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <circle cx="12" cy="7" r="5" />
        <path d="M10 5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
        <path d="M14 8.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
        <path d="M10 8.5l4-3" />
        <path d="M4 16h2c1 0 2 .5 3 1l2 1.5c1 .5 3 .5 4 0l3-1.5" />
        <path d="M4 16v3c0 1 1 2 2 2h6c1.5 0 3-1 4-2l2-1.5" />
      </svg>
    ),
  },
  {
    title: 'New construction',
    href: '/loans/new-construction',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <path d="M7 2h8l5 5v12a2 2 0 0 1-2 2h-2" />
        <path d="M7 2v10" />
        <path d="M15 2v5h5" />
        <path d="M10 7h2" />
        <path d="M10 10h3" />
        <path d="M13 14v5" />
        <path d="M12 16c0-1 2-1 2 0s-2 1-2 2 2 1 2 0" />
        <path fill="#fff" d="M11 22v-6l-5-4-5 4v6h10z" />
        <path d="M11 22v-6l-5-4-5 4v6h10z" />
        <path d="M4 22v-3h2v3" />
      </svg>
    ),
  },
  {
    title: 'Refinance',
    href: '/loans/cash-out-refinance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <path d="M3 21h18" />
        <path d="M5 21v-6h3v6" />
        <path d="M10.5 21v-10h3v10" />
        <path d="M16 21v-14h3v14" />
        <path d="M3 13l5-5 3 2 5-6" />
        <polyline points="12 4 16 4 16 8" />
        <circle cx="18" cy="5" r="4" fill="#fff" stroke="currentColor" />
        <path d="M18 3v4" />
        <path d="M17 5c0-.6 1-.6 1 0s-1 .5-1 1 1 .6 1 0" />
      </svg>
    ),
  },
  {
    title: 'Fix and lease',
    href: '/loans/fix-and-lease',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <circle cx="6" cy="5" r="3" />
        <path d="M9 5h10v2h-2V5h-2v3h-2V5" />
        <path fill="#fff" d="M3 14l9-7 9 7v8H3v-8z" /> 
        <path d="M3 14l9-7 9 7" />
        <path d="M5 14v8h14v-8" />
        <path d="M10 22v-5h4v5" />
        <rect x="7" y="16" width="2" height="2" />
        <rect x="15" y="16" width="2" height="2" />
      </svg>
    ),
  },
  {
    title: 'Conventional',
    href: '/loans/conventional',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <path d="M12 2l-3 2H5v2h14V4h-4l-3-2z" />
        <path d="M6 6c0 1.5 2 2 6 2s6-.5 6-2" />
        <path d="M7 14l5-4 5 4v6H7v-6z" />
        <path d="M10 20v-3h4v3" />
        <path d="M6 22c0-1.5 2-2 6-2s6 .5 6 2" />
        <path d="M5 22v-2h14v2" />
      </svg>
    ),
  },
  {
    title: 'Mobile home',
    href: '/loans/mobile-home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <path d="M2 11V9l2-2h16l2 2v2" />
        <path d="M3 11h18c.6 0 1 .4 1 1v5H2v-5c0-.6.4-1 1-1z" />
        <circle cx="16" cy="18" r="2" fill="#fff" />
        <circle cx="8" cy="18" r="2" fill="#fff" />
        <path d="M11 11v6H8v-6z" />
        <rect x="4" y="12" width="2" height="2" />
        <rect x="18" y="12" width="2" height="2" />
        <path d="M22 15h2" />
      </svg>
    ),
  },
  {
    title: 'Personal loans',
    href: '/loans/personal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Other loans',
    href: '/loans/other',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-3 text-slate-900">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  }
];

export default function LoanProducts() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`bg-[#fdfbf7] py-24 px-6 md:px-12 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            <span className="text-shimmer">Loan</span> Products
          </h2>
          <div className="mx-auto h-[1.5px] w-28 bg-[#c5a059]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div 
              key={index} 
              onClick={() => product.href && navigateTo(product.href)}
              className="group relative bg-white flex flex-col items-center justify-center p-6 md:p-8 aspect-square shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 cursor-pointer interactive-hover animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top Right Navy Accent */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 bg-slate-900 group-hover:bg-[#c5a059] transition-colors duration-300" 
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />
              
              <div className="text-slate-900 mb-6 group-hover:scale-110 group-hover:text-[#c5a059] transition-all duration-300">
                {product.icon}
              </div>
              
              <h3 className="text-slate-900 font-bold text-center text-[13px] md:text-[15px] leading-tight px-1 uppercase tracking-wider group-hover:text-[#c5a059] transition-colors duration-300">
                {product.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
