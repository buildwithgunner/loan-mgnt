import React, { useState, useEffect } from 'react';
import { Phone, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { navigateTo } from '../App.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const DEFAULT_PHONE = '563-571-0448';

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const phoneHref = `tel:${phone.replace(/\D/g, '')}`;

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic phone number
    axios.get(`${API_URL}/settings`)
      .then(res => {
        if (typeof res.data.settings?.support_phone === 'string' && res.data.settings.support_phone.trim()) {
          setPhone(res.data.settings.support_phone);
        }
      })
      .catch(err => console.error('Error fetching settings for Hero:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Video with Parallax Effect */}
      <div 
        className="absolute -top-[10%] left-0 z-0 h-[120%] w-full"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <video 
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          poster="/hero_bg.png"
          className="h-full w-full object-cover pointer-events-none"
          src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-neighborhood-at-sunset-10022-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/50 to-[var(--bg-primary)] backdrop-blur-[2px] transition-colors duration-500" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-[var(--text-primary)] px-6 max-w-5xl pt-10">
        <h1 
          className="text-5xl sm:text-7xl lg:text-[6rem] leading-tight font-serif font-black tracking-tight mb-6 drop-shadow-2xl animate-fade-in opacity-0"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-shimmer">Black Wolves</span><br />
          Acquisition LLC
        </h1>
        <p 
          className="text-lg sm:text-xl lg:text-2xl font-medium tracking-wide mb-14 drop-shadow-md animate-fade-in opacity-0 text-[var(--text-secondary)]"
          style={{ animationDelay: '0.4s' }}
        >
          Hard Money Lending For Real Estate Investors
        </p>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in opacity-0"
          style={{ animationDelay: '0.7s' }}
        >
          <button 
            onClick={() => navigateTo('/signup')}
            className="btn-glow flex items-center gap-2 rounded-full bg-[#c5a059] px-10 py-4 text-[15px] uppercase tracking-widest font-black text-white transition-all hover:scale-105 active:scale-95 shadow-xl group"
          >
            Apply Now
            <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href={phoneHref}
            className="flex items-center gap-3 rounded-full border border-[var(--border-color)] glass-panel px-10 py-4 text-[15px] uppercase tracking-widest font-black text-[var(--text-primary)] transition-all hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-105 active:scale-95 shadow-xl group"
          >
            <Phone className="h-5 w-5 transform group-hover:-rotate-12 transition-transform" />
            {phone.replace(/\D/g, '').length === 10 ? phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : DEFAULT_PHONE}
          </a>
        </div>
      </div>

    </section>
  );
}
