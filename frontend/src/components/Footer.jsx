import React, { useState, useEffect } from 'react';
import { navigateTo } from '../App.jsx';
import { MapPin, CreditCard } from 'lucide-react';
import Logo from './Logo.jsx';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const DEFAULT_CONTACT = {
  support_phone: '5635710448',
  support_email: 'Info@blackwolvesacquistionllc.com',
  office_address: '759 7TH ST, SECAUCUS, NJ 07094'
};

const validSetting = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed && trimmed.toUpperCase() !== 'N/A' ? trimmed : fallback;
};

const locations = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Japan", "United Arab Emirates", 
  "Singapore", "Switzerland", "Worldwide"
];

export default function Footer() {
  const [settings, setSettings] = useState(DEFAULT_CONTACT);

  const supportPhone = typeof settings.support_phone === 'string' ? settings.support_phone : '';
  const formattedPhone = supportPhone.length === 10
    ? supportPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    : supportPhone || 'N/A';

  useEffect(() => {
    axios.get(`${API_URL}/settings`)
      .then(res => {
        if (res.data.settings) {
          setSettings(prev => ({
            ...prev,
            support_phone: validSetting(res.data.settings.support_phone, prev.support_phone),
            support_email: validSetting(res.data.settings.support_email, prev.support_email),
            office_address: validSetting(res.data.settings.office_address, prev.office_address),
          }));
        }
      })
      .catch(err => console.error('Error fetching footer settings:', err));
  }, []);

  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--text-secondary)] z-10 relative text-sm border-t border-[var(--border-color)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* About Us */}
          <div className="space-y-8">
            <Logo className="h-16" />
            <h3 className="text-[var(--text-primary)] text-sm font-black border-b border-[var(--border-color)] pb-3 inline-block pr-6 uppercase tracking-[0.2em]">About Us</h3>
            <div className="flex">
                <div className="glass-panel rounded-xl p-3 flex items-center gap-3 w-max">
                    <div className="h-12 w-10 bg-blue-600 rounded flex flex-col items-center justify-center pt-1 shadow-inner">
                        <svg className="w-6 h-6 text-white mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-10-5v7.5l10 5 10-5v-7.5l-10 5z"/>
                        </svg>
                        <span className="text-white font-extrabold text-[10px] uppercase leading-none text-center">BBB</span>
                    </div>
                    <div>
                      <div className="text-[var(--text-primary)] font-black leading-tight text-[10px] uppercase tracking-widest">
                          ACCREDITED<br/>BUSINESS
                      </div>
                      <div className="text-[10px] text-blue-500 font-bold mt-1">Rating: A+</div>
                    </div>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Black Wolves Acquisition LLC offers hard money lending services to real estate investors worldwide. We provide borrowers with personalized loan consultation services and funding. Black Wolves Acquisition LLC also offers loan servicing for mortgage investors.
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-black border-b border-[var(--border-color)] pb-3 inline-block pr-6 uppercase tracking-[0.2em] mb-8">Get in Touch</h3>
            <div className="space-y-8 text-sm">
              <div>
                <strong className="text-[#c5a059] block mb-3 uppercase tracking-widest text-xs font-black">Office:</strong>
                <ul className="list-disc pl-5 text-[var(--text-secondary)] space-y-1">
                  <li>{settings.office_address}</li>
                </ul>
              </div>
              <div className="space-y-4">
                <p><strong className="text-[#c5a059] font-black uppercase tracking-widest text-xs block mb-1">EMAIL:</strong> <a href={`mailto:${settings.support_email}`} className="text-[var(--text-secondary)] hover:text-[#c5a059] transition-colors">{settings.support_email}</a></p>
                <p><strong className="text-[#c5a059] font-black uppercase tracking-widest text-xs block mb-1">PHONE:</strong> <a href={supportPhone ? `tel:${supportPhone}` : '#'} className="text-[var(--text-secondary)] hover:text-[#c5a059] transition-colors font-medium">
                  {formattedPhone}
                </a></p>
              </div>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-black border-b border-[var(--border-color)] pb-3 inline-block pr-6 uppercase tracking-[0.2em] mb-8">Sitemap</h3>
            <ul className="space-y-4 text-[var(--text-secondary)] font-medium text-[13px]">
              <li><a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Home</a></li>
              <li><a href="/about/team" onClick={(e) => { e.preventDefault(); navigateTo('/about/team'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>About us</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Contact us</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Blog</a></li>
              <li><a href="/web-stories" onClick={(e) => { e.preventDefault(); navigateTo('/web-stories'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Web Stories</a></li>
              <li><a href="/signup" onClick={(e) => { e.preventDefault(); navigateTo('/signup'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Apply Now</a></li>
              <li><a href="/conventional-loan-app" onClick={(e) => { e.preventDefault(); navigateTo('/conventional-loan-app'); }} className="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>Conventional Loan App</a></li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-[var(--text-primary)] text-sm font-black border-b border-[var(--border-color)] pb-3 inline-block pr-6 uppercase tracking-[0.2em] mb-8">Pages</h3>
            <ul className="space-y-4 text-[var(--text-secondary)] font-medium text-[13px] mb-8">
              <li><a href="/login" onClick={(e) => { e.preventDefault(); navigateTo('/login'); }} className="hover:text-[#c5a059] transition-colors">Client Login</a></li>
              <li><a href="/signup" onClick={(e) => { e.preventDefault(); navigateTo('/signup'); }} className="hover:text-[#c5a059] transition-colors">Create Account</a></li>
              <li><a href="/areas-we-serve" onClick={(e) => { e.preventDefault(); navigateTo('/areas-we-serve'); }} className="hover:text-[#c5a059] transition-colors">Areas we serve</a></li>
              <li><a href="/privacy" onClick={(e) => { e.preventDefault(); navigateTo('/privacy'); }} className="hover:text-[#c5a059] transition-colors">Privacy</a></li>
              <li><a href="/terms-and-conditions" onClick={(e) => { e.preventDefault(); navigateTo('/terms-and-conditions'); }} className="hover:text-[#c5a059] transition-colors">Terms and Conditions</a></li>
            </ul>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigateTo('/contact'); }} className="inline-flex items-center gap-3 border border-[#c5a059] text-[#c5a059] px-6 py-3 rounded-full hover:bg-[#c5a059] hover:text-white transition-all font-bold tracking-widest uppercase text-[11px] group">
              <CreditCard size={16} className="group-hover:scale-110 transition-transform" />
              Pay App Fee
            </a>
          </div>

        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-[var(--bg-secondary)] py-10 border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[var(--text-primary)] mb-6 font-bold text-sm tracking-widest uppercase">Black Wolves Lends Hard Money Worldwide:</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {locations.map((loc, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#c5a059] cursor-pointer transition-colors font-medium">
                <MapPin size={14} className="text-[#c5a059]" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
          <p className="text-[var(--text-secondary)] opacity-60 text-[10px] font-bold tracking-[0.2em] uppercase">
            COPYRIGHT &copy; {new Date().getFullYear()} - blackwolvesacquisition.com
          </p>
        </div>
      </div>
    </footer>
  );
}
