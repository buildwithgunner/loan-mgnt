import React from 'react';
import { Instagram, Play } from 'lucide-react';
const ceoImg = '/ceo_anthony.jpg';
const danielImg = '/daniel.jpg';
const sarahImg = '/sarah_v2.jpg';
const michaelImg = '/michael.jpg';
const deanneImg = '/deanne-ellis.jpg';

const posts = [
  {
    id: 1,
    image: ceoImg,
    type: 'video',
    title: 'Strategic planning is key to navigating the real estate market'
  },
  {
    id: 2,
    image: danielImg,
    type: 'image',
    title: 'Zach coordinates and processes core loan files for BWA'
  },
  {
    id: 3,
    image: sarahImg,
    type: 'image',
    title: 'Sarah manages our daily financial operations'
  },
  {
    id: 4,
    image: michaelImg,
    type: 'video',
    title: 'Michael walks you through the FEMA 50% Rule'
  },
  {
    id: 5,
    image: deanneImg,
    type: 'image',
    title: 'Deanne Ellis helps clients navigate mortgage strategy'
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white text-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg">
            <Instagram size={32} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight"><span className="text-shimmer">blackwolvesacquisition</span></h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a 
              key={post.id} 
              href="#" 
              className="relative group block aspect-square overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-slate-200"
            >
              <img 
                src={post.image} 
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <p className="font-extrabold text-2xl max-w-[90%] drop-shadow-lg z-10 mb-4 tracking-tight leading-tight">{post.title}</p>
                {post.type === 'video' && (
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                    <Play size={28} className="ml-1" fill="currentColor" />
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
