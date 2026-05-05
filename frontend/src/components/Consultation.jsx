import React from 'react';
import { navigateTo } from '../App.jsx';

export default function Consultation() {
  return (
    <section className="relative overflow-hidden bg-[#fdfbf7] py-24 sm:py-32">
      {/* Background Watermark with Parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none parallax-bg"
        style={{ backgroundImage: 'url("/consultation_bg.png")' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <h2 className="text-4xl font-serif font-bold tracking-tight text-[#05101c] sm:text-5xl text-center mb-20 max-w-4xl mx-auto">
          Personalized Loan Consultation Services and Funding
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-10">
            <div className="space-y-6 text-lg leading-8 text-slate-700 font-medium">
              <p>
                At Black Wolves Acquisition LLC, we understand that every real estate project is unique, and cookie-cutter 
                solutions don't always fit the bill. That's why we offer personalized <span className="text-[#c5a059] font-bold">loan consultation</span> 
                services tailored to your specific needs. Our team of experienced professionals takes the 
                time to understand your project requirements, financial situation, and goals, allowing us 
                to provide customized lending solutions that align with your objectives.
              </p>
              <p>
                With Black Wolves Acquisition LLC, you can expect a smooth and efficient <span className="text-[#c5a059] font-bold">loan consultation</span> process. 
                We guide you through each step, from application to funding, ensuring transparency and open 
                communication along the way. Our streamlined approach minimizes paperwork and unnecessary 
                delays, getting you the financing you need when you need it.
              </p>
            </div>

            <button 
              onClick={() => navigateTo('/signup')}
              className="flex items-center gap-2 rounded-full bg-[#c5a059] px-10 py-4 text-lg font-bold text-white transition-all hover:bg-[#b08d4a] hover:scale-105 active:scale-95 shadow-lg shadow-[#c5a059]/30"
            >
              APPLY NOW
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Right Side: Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-[#c5a059]/10 rounded-3xl flex items-center justify-center p-8 overflow-hidden">
               {/* Decorative gold shape */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-[#c5a059] -rotate-45 opacity-20 blur-2xl rounded-full" />
               
               <img 
                 src="/money_house.png" 
                 alt="Personalized Funding" 
                 className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
