import React, { useState } from 'react';
import { MapPin, ChevronRight, Phone, Mail } from 'lucide-react';
import { navigateTo } from '../App.jsx';

const cities = [
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
    desc: "Hard money loans for fix-and-flip, new construction, and refinancing across New York.",
  },
  {
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    desc: "Fast funding for real estate investors in the greater London market.",
  },
  {
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    desc: "Flexible hard money solutions for Dubai residential and commercial projects.",
  },
  {
    name: 'Sydney',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800',
    desc: "Expert lending for luxury fix-and-flip and investment properties in Sydney.",
  },
  {
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    desc: "Competitive rates and fast closings for Tokyo real estate investors.",
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602881469-6758410f1431?auto=format&fit=crop&q=80&w=800',
    desc: "Hard money financing for Paris's thriving real estate investment scene.",
  },
  {
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1504385150465-d4c06b2b714f?auto=format&fit=crop&q=80&w=800',
    desc: "Black Wolves Acquisition LLC proudly serves LA investors with top-tier hard money.",
  },
  {
    name: 'Toronto',
    image: 'https://images.unsplash.com/photo-1507992781348-310259076fe0?auto=format&fit=crop&q=80&w=800',
    desc: "We fund fix-and-flip and new construction across Toronto.",
  },
  {
    name: 'Miami',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&q=80&w=800',
    desc: "High-speed lending for Miami's competitive luxury and investment property market.",
  },
  {
    name: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
    desc: "Tailored hard money financing for Singapore's premium real estate.",
  },
  {
    name: 'Berlin',
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?auto=format&fit=crop&q=80&w=800',
    desc: "Supporting Berlin investors with fast, flexible hard money loan solutions.",
  },
  {
    name: 'Hong Kong',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800',
    desc: "Investment financing — from fix-and-flip to luxury developments.",
  },
];


const gridItems = [
  { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=700', label: 'Hard Money for Capital Stacking', dark: true },
  { src: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=700', label: null },
  { src: null, label: 'Hard Money for Refinancing', solid: '#c5a059' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1541888086925-ebca81b67ea3?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1558231454-e054f3ff5768?auto=format&fit=crop&q=80&w=700', label: null },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=700', label: 'SALES STRATEGY', dark: true },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=700', label: 'Smart Exit Plans with Hard Money', dark: true },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=700', label: null },
];

export default function AreasWeServe() {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <div className="w-full bg-white min-h-screen font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[360px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1575989082285-22c0a92c4cc7?auto=format&fit=crop&q=80&w=1600"
          alt="Global skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="relative z-10 px-12 pb-14 max-w-3xl">
          <p className="text-[#c5a059] font-semibold uppercase tracking-widest text-sm mb-3">Black Wolves Acquisition LLC</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Areas We Serve
          </h1>
          <div className="flex flex-wrap gap-3">
            {['New York', 'London', 'Dubai', 'Sydney', 'Tokyo', 'Paris', 'Los Angeles'].map((loc) => (
              <div key={loc} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium">
                <MapPin size={13} className="text-[#c5a059]" />
                {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro Text ── */}
      <section className="bg-slate-50 py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-[15px] leading-[1.9] max-w-3xl mx-auto">
            Black Wolves Acquisition LLC provides <span className="text-[#c5a059] font-semibold">hard money loans</span> to real estate investors worldwide.
            We fund fix-and-flip projects, new construction, cash-out refinancing, and more — with fast approvals and flexible terms tailored to each market.
          </p>
        </div>
      </section>

      {/* ── City Cards Grid ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">Markets We Fund</h2>
          <div className="h-1 w-16 bg-[#c5a059] mx-auto rounded mb-14" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCity(i)}
                onMouseLeave={() => setHoveredCity(null)}
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent transition-opacity duration-300" />

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-[#c5a059]" />
                    <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  </div>
                  <p
                    className={`text-slate-300 text-[13px] leading-relaxed transition-all duration-300 ${
                      hoveredCity === i ? 'opacity-100 max-h-24 mt-1' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    {city.desc}
                  </p>
                  <button
                    onClick={() => navigateTo('/signup')}
                    className={`mt-3 flex items-center gap-1 text-[#c5a059] text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      hoveredCity === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    Apply Now <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram-style Photo Grid ── */}
      <section className="py-14 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">Our Loan Products</h2>
          <div className="h-1 w-16 bg-[#c5a059] mx-auto rounded mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {gridItems.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                style={{ background: item.solid ? item.solid : '#1a1a1a' }}
              >
                {item.src && (
                  <img
                    src={item.src}
                    alt={item.label || 'Black Wolves Acquisition LLC'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
                  />
                )}

                {item.label && (
                  <div className={`absolute inset-0 flex items-center justify-center p-4 ${item.dark ? 'bg-black/45' : ''}`}>
                    <p className="text-white font-extrabold text-center text-base md:text-lg leading-tight drop-shadow-lg">
                      {item.label}
                    </p>
                  </div>
                )}

                {/* Black Wolves watermark */}
                <div className="absolute bottom-2 right-2 opacity-60 text-white text-[10px] font-bold tracking-wider drop-shadow">
                  Black Wolves
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Now CTA Banner ── */}
      <section className="relative w-full py-24 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1600"
          alt="Apply for loan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[#c5a059] font-semibold uppercase tracking-widest text-sm mb-3">Start Today</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Ready to Fund Your Next Deal?
          </h2>
          <button
            onClick={() => navigateTo('/signup')}
            className="inline-flex items-center gap-3 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold text-lg px-12 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-black/30"
          >
            Apply Now <ChevronRight size={20} />
          </button>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
            <a href="tel:5635710448" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={15} /> 563-571-0448
            </a>
            <a href="mailto:info@blackwolvesacquisition.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={15} /> info@blackwolvesacquisition.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
