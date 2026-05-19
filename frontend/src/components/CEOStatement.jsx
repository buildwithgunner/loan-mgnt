import React from 'react';
import useReveal from '../hooks/useReveal';
import { Quote } from 'lucide-react';

export default function CEOStatement() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`py-24 bg-[#f9f7f2] border-y border-gray-100 overflow-hidden transition-all duration-1000 ${isVisible ? 'reveal' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#c5a059] to-[#e6c98a] opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl">
              <img 
                src="/ceo_anthony.jpg" 
                alt="CEO & Founder" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 border-l-[#c5a059] border-l-4">
                 <p className="text-white font-black text-2xl tracking-tighter uppercase italic mb-1">Zach Willams</p>
                 <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em]">Chief Executive Officer</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#fdfbf7] border border-gray-200 rounded-full shadow-sm">
               <div className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Leadership Perspective</span>
            </div>

            <div className="relative">
              <Quote className="absolute -top-10 -left-10 w-20 h-20 text-[#c5a059] opacity-10" />
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
                "Our mission is to turn real estate <span className="text-[#c5a059]">ambition</span> into tangible <span className="italic">wealth</span>."
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
              <p>
                At Black Wolves Acquisition LLC, we don't just fund deals; we partner with visionaries. My goal has always been to bridge the gap between complex financial requirements and the speed required for modern real estate success.
              </p>
              <p>
                Every loan we underwrite carries our signature commitment to integrity, transparency, and expert consulting. We are direct-to-lender, which means we move at the speed of your next big opportunity.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200 flex items-center gap-10">
               <div className="text-center">
                  <p className="text-3xl font-black text-slate-900 italic tracking-tighter">$50M+</p>
                  <p className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest mt-1">Capital Deployed</p>
               </div>
               <div className="w-px h-12 bg-gray-200" />
               <div className="text-center">
                  <p className="text-3xl font-black text-slate-900 italic tracking-tighter">500+</p>
                  <p className="text-[9px] font-black text-[#c5a059] uppercase tracking-widest mt-1">Investors Funded</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
