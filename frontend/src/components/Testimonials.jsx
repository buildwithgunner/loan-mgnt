import React from 'react';
import { Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const reviews = [
  {
    author_name: "Meredith Barcomb",
    profile_photo_url: "M",
    avatar_color: "bg-indigo-500",
    time_description: "2 months ago",
    text: "Thank you Black Wolves! Anthony Deceglie was a pleasure to work with. I was in a very difficult situation trying to repair my credit and get...",
  },
  {
    author_name: "Annalisa Valdivia",
    profile_photo_url: "A",
    avatar_color: "bg-amber-700",
    time_description: "3 months ago",
    text: "Anthony Deceglie at Black Wolves Acquisition LLC was wonderful to work with! He was responsive, transparent, and took the time to explain...",
  },
  {
    author_name: "Jesanna Williams",
    profile_photo_url: "J",
    avatar_color: "bg-blue-600",
    time_description: "3 months ago",
    text: "I had an excellent experience with Black Wolves Acquisition LLC LLC, thanks to Anthony Deceglie. He was patient, thorough, and genuinely cared...",
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 px-6 relative border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            <span className="text-shimmer">Testimonials</span>
          </h2>
          <div className="mx-auto h-[1.5px] w-24 bg-[#c5a059]" />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* Left: Overall Rating */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start pt-4 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide mb-2">Excellent</h3>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-500 mb-3">
              Based on <span className="font-bold text-slate-800">143 reviews</span>
            </p>
            {/* Simple Google SVG stand-in */}
            <svg className="h-8" viewBox="0 0 92 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8 23.4C5.4 23.4 0 18.2 0 11.7C0 5.2 5.4 0 11.8 0C15.3 0 17.8 1.4 19.8 3.2L17.5 5.5C16.1 4.2 14.3 3.2 11.8 3.2C7.1 3.2 3.5 7 3.5 11.7C3.5 16.4 7.1 20.2 11.8 20.2C14.8 20.2 16.5 19 17.7 17.9C18.6 17 19.2 15.6 19.4 13.7H11.8V10.6H22.5C22.6 11.2 22.7 11.8 22.7 12.6C22.7 15 22 17.9 19.9 20C17.8 22.2 15.2 23.4 11.8 23.4Z" fill="#4285F4"/>
              <path d="M30.1 15.6C30.1 20.1 26.6 23.4 22.5 23.4C18.4 23.4 14.9 20.1 14.9 15.6C14.9 11 18.4 7.7 22.5 7.7C26.6 7.7 30.1 11 30.1 15.6ZM26.9 15.6C26.9 12.6 24.8 10.6 22.5 10.6C20.2 10.6 18.1 12.6 18.1 15.6C18.1 18.5 20.2 20.5 22.5 20.5C24.8 20.5 26.9 18.5 26.9 15.6Z" fill="#EA4335"/>
              <path d="M45.6 15.6C45.6 20.1 42.1 23.4 38 23.4C33.9 23.4 30.4 20.1 30.4 15.6C30.4 11 33.9 7.7 38 7.7C42.1 7.7 45.6 11 45.6 15.6ZM42.4 15.6C42.4 12.6 40.3 10.6 38 10.6C35.7 10.6 33.6 12.6 33.6 15.6C33.6 18.5 35.7 20.5 38 20.5C40.3 20.5 42.4 18.5 42.4 15.6Z" fill="#FBBC05"/>
              <path d="M60.6 8.3V22.3C60.6 26.3 57.4 28 53.6 28C50 28 47.9 25.6 47.1 23.6L50 22.4C50.5 23.6 51.7 25 53.6 25C56 25 57.5 23.5 57.5 21V20H57.4C56.6 21 55 21.9 53 21.9C49.3 21.9 45.8 18.7 45.8 14.8C45.8 10.9 49.3 7.7 53.2 7.7C55.2 7.7 56.7 8.6 57.4 9.5H57.5V8.3H60.6ZM57.8 14.8C57.8 12.3 56 10.5 53.8 10.5C51.6 10.5 49.6 12.4 49.6 14.8C49.6 17.3 51.6 19.1 53.8 19.1C56 19.1 57.8 17.3 57.8 14.8Z" fill="#4285F4"/>
              <path d="M65.4 1V23H62.2V1H65.4Z" fill="#34A853"/>
              <path d="M75 18.6L77.6 20.3C76.8 21.5 74.9 23.4 71.9 23.4C67.6 23.4 64.3 20 64.3 15.6C64.3 10.8 67.6 7.7 71.5 7.7C75.3 7.7 76.8 10.9 77.4 12.3L77.7 13.1L68 17.1C68.9 18.9 70.2 19.8 71.9 19.8C73.7 19.8 74.6 19.3 75 18.6ZM67.5 15.4L74 12.7C73.6 11.5 72.7 10.6 71.7 10.6C70 10.6 67.5 12.6 67.5 15.4Z" fill="#EA4335"/>
            </svg>
          </div>

          {/* Right: Reviews Carousel */}
          <div className="w-full md:w-3/4 relative">
            
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
              {reviews.map((review, idx) => (
                <div 
                  key={idx} 
                  className="min-w-[280px] md:min-w-[320px] bg-white border border-slate-200 rounded-xl p-6 shadow-sm snap-start interactive-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${review.avatar_color} text-white rounded-full flex items-center justify-center font-bold text-lg`}>
                        {review.profile_photo_url}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{review.author_name}</h4>
                        <p className="text-xs text-slate-400">{review.time_description}</p>
                      </div>
                    </div>
                    {/* Google generic G */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.825-.075-1.62-.21-2.385H12.24v4.515h6.45c-.285 1.47-1.11 2.715-2.37 3.555v2.94h3.84c2.25-2.07 3.585-5.13 3.585-8.625z"/>
                      <path fill="#34A853" d="M12.24 24c3.24 0 5.955-1.08 7.935-2.91l-3.84-2.94c-1.08.72-2.46 1.14-4.095 1.14-3.15 0-5.82-2.13-6.78-5.01H1.5v3.06C3.48 21.27 7.53 24 12.24 24z"/>
                      <path fill="#FBBC05" d="M5.46 14.28c-.24-.72-.375-1.485-.375-2.28s.135-1.56.375-2.28V6.66H1.5a11.968 11.968 0 0 0 0 10.68l3.96-3.06z"/>
                      <path fill="#EA4335" d="M12.24 4.71c1.755 0 3.33.6 4.575 1.785l3.42-3.42c-2.1-1.95-4.815-3.075-7.995-3.075C7.53 0 3.48 2.73 1.5 6.66l3.96 3.06c.96-2.88 3.63-5.01 6.78-5.01z"/>
                    </svg>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                      <Check className="w-3 h-3 text-white stroke-[3px]" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed mb-1 min-h-[80px]">
                    {review.text}
                  </p>
                  <button className="text-sm text-slate-400 hover:text-[#c5a059] transition-colors">
                    Read more
                  </button>
                </div>
              ))}
            </div>

            {/* Faux generic carousel buttons */}
            <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 hidden md:flex">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 hidden md:flex">
                <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
