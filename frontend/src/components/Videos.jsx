import React from 'react';
import { Calendar, Video, Play, Share2, Clock } from 'lucide-react';

const videos = [
  {
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
    date: "March 18, 2026",
    tags: "Fix & Flip, Hard Money, New Construction, Others",
    title: "Understanding the Source of Capital in Hard Money Lending | Why It Matters for Brokers and Borrowers",
    shortTitle: "Understanding the Source of Capit..."
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?auto=format&fit=crop&q=80&w=800",
    date: "October 31, 2025",
    tags: "Liquidity in Real Estate | Why Cash Flow Matters More Than Ever",
    title: "Liquidity in Real Estate | Why Cash Flow Matters More Than Ever",
    shortTitle: "Liquidity in Real Estate | Why Cash"
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    date: "August 18, 2025",
    tags: "Navigating Tough Exits in Real Estate | Behind the Scenes with Black Wolves Acquisition LLC",
    title: "Navigating Tough Exits in Real Estate | Behind the Scenes with Black Wolves Acquisition LLC",
    shortTitle: "Navigating Tough Exits in Real Est..."
  }
];

export default function Videos() {
  return (
    <section className="bg-slate-50 py-24 px-6 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Videos/<span className="text-shimmer">Podcasts</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#c5a059]" />
            <p className="text-[#c5a059] font-medium text-sm">Watch our Videos on different topics</p>
            <div className="h-[1px] w-8 bg-[#c5a059]" />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col cursor-pointer group hover:shadow-xl transition-all duration-500 animate-fade-in opacity-0" style={{ animationDelay: `${idx * 0.15}s` }}>
              
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                <img 
                  src={vid.thumbnail} 
                  alt={vid.shortTitle} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Top overlay shadow for text */}
                <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent">
                  <div className="flex gap-3">
                    <img src="https://ui-avatars.com/api/?name=Black Wolves&background=051a2c&color=fff" alt="avatar" className="w-10 h-10 rounded-full border border-white/20" />
                    <div className="text-white">
                      <h4 className="font-bold text-[15px] leading-tight">{vid.shortTitle}</h4>
                      <p className="text-xs text-slate-300 mt-1">How To Make Money With Hard Money</p>
                    </div>
                  </div>
                </div>

                {/* Play Button Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-[#FF0000] rounded-lg flex items-center justify-center group-hover:bg-[#cc0000] transition-colors shadow-lg">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>

                {/* Bottom Control Bar */}
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center text-white">
                  <div className="flex gap-4">
                    <Share2 className="w-5 h-5 hover:text-slate-300" />
                    <Clock className="w-5 h-5 hover:text-slate-300" />
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 px-2 py-1 rounded text-sm font-medium">
                    Watch on <span className="font-bold flex items-center gap-1"><Play className="w-4 h-4 fill-white"/> YouTube</span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{vid.date}</span>
                </div>
                
                {idx === 0 ? (
                  <div className="flex items-start gap-2 text-[#c5a059] text-sm mb-4">
                    <Video className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="line-clamp-2 leading-tight">{vid.tags}</span>
                  </div>
                ) : null}

                <h3 className="font-bold text-slate-900 text-lg leading-snug mt-auto">
                  {vid.title}
                </h3>
              </div>
              
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-block font-bold text-slate-900 text-sm uppercase tracking-wider border-b-2 border-slate-900 pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors">
            See More Videos
          </a>
        </div>

      </div>
    </section>
  );
}
