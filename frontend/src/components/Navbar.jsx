import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, Menu, X, Linkedin, Facebook, Instagram, Sun, Moon } from 'lucide-react';
import { navigateTo } from '../App.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Logo from './Logo.jsx';
import TopBar from './TopBar.jsx';

const NAVIGATION_SCHEMA = [
  { 
    name: 'Loans', 
    dropdown: [
      { label: 'Fix And Flip Loans', href: '/loans/fix-and-flip' },
      { label: 'New Construction Loans', href: '/loans/new-construction' },
      { label: 'Cash Out Refinance Loans', href: '/loans/cash-out-refinance' },
      { label: 'Fix and Lease Loans', href: '/loans/fix-and-lease' },
      { label: 'Conventional Loans', href: '/loans/conventional' },
      { label: 'Mobile Home Loans', href: '/loans/mobile-home' },
      { label: 'Capital Markets', href: '/loans/capital-markets' },
    ]
  },
  { 
    name: 'Services', 
    dropdown: [
      { label: 'Loan Consulting', href: '/services/loan-consulting' },
      { label: 'Loan Servicing', href: '/services/loan-servicing' },
      { label: 'Referral Program', href: '/services/referral-program' },
      { label: 'Investment Opportunities', href: '/services/investment-opportunities' },
    ]
  },
  { 
    name: 'About', 
    dropdown: [
      { label: 'Our Team', href: '/about/team' },
      { label: 'Testimonials', href: '/about/testimonials' },
      { label: 'Recent Closings', href: '/about/loan-closings' },
      { label: 'Newsroom', href: '/about/news' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path) => {
    setIsMobileOpen(false);
    setOpenSection(null);
    navigateTo(path);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      {!scrolled && <TopBar />}
      <nav className={`transition-all duration-300 ${
        scrolled ? 'bg-[var(--nav-bg)] backdrop-blur-xl shadow-2xl py-3 border-b border-[var(--border-color)]' : 'bg-transparent py-5'
      }`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-10">
        
        <div className="flex items-center">
          <button onClick={() => handleNav('/')} className="relative z-[70] outline-none">
            <Logo className="h-14 lg:h-16 transition-transform hover:scale-105" />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {NAVIGATION_SCHEMA.map((item) => (
            <div key={item.name} className="relative group px-3 py-2">
              <button
                onClick={() => !item.dropdown && handleNav(item.href)}
                className={`flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] font-bold transition-all ${scrolled ? 'text-[var(--text-primary)]' : 'text-white'} hover:text-[#c5a059]`}
              >
                {item.name}
                {item.dropdown && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
                <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>

              {item.dropdown && (
                <div className="absolute -left-4 top-[100%] pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="w-64 glass-card rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)]">
                    <div className="h-1 w-full bg-gradient-to-r from-[#c5a059] via-[#e6c98a] to-[#c5a059]"></div>
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => handleNav(sub.href)}
                        className="w-full text-left px-6 py-4 text-[13px] font-medium text-[var(--text-primary)] hover:text-[#c5a059] hover:bg-[var(--bg-secondary)] border-b border-[var(--border-color)] last:border-0 transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${scrolled ? 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]' : 'text-white hover:bg-white/10'}`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className={`h-6 w-px ${scrolled ? 'bg-[var(--border-color)]' : 'bg-white/20'}`}></div>

          <button onClick={() => handleNav('/login')} className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors ${scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-white/80 hover:text-white'}`}>
            Login
          </button>
          <button 
            onClick={() => handleNav('/apply')}
            className="btn-glow bg-[#c5a059] text-white px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest shadow-lg transition-transform active:scale-95 hover:-translate-y-0.5"
          >
            Get Funded
          </button>
        </div>

        {/* Mobile Trigger */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${scrolled ? 'text-[var(--text-primary)]' : 'text-white'}`}>
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`relative z-[70] w-10 h-10 flex items-center justify-center ${scrolled || isMobileOpen ? 'text-[#c5a059]' : 'text-white'}`}
          >
            {isMobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[65] bg-[var(--bg-primary)] transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        isMobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-32 px-8 overflow-y-auto pb-10">
          <div className="flex-1 space-y-2">
            {NAVIGATION_SCHEMA.map((item, i) => (
              <div key={item.name} className="py-2" style={{ transitionDelay: `${i * 50}ms` }}>
                <button 
                  onClick={() => item.dropdown ? setOpenSection(openSection === item.name ? null : item.name) : handleNav(item.href)}
                  className="flex items-center justify-between w-full text-3xl font-serif font-bold text-[var(--text-primary)] tracking-tight"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className={`transition-transform duration-300 text-[#c5a059] ${openSection === item.name ? 'rotate-180' : ''}`} />}
                </button>
                
                {item.dropdown && (
                  <div className={`grid transition-all duration-300 ${openSection === item.name ? 'grid-rows-[1fr] mt-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-5 pl-4 border-l-2 border-[#c5a059]/20 ml-2">
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => handleNav(sub.href)}
                            className="text-left text-[var(--text-secondary)] font-medium text-sm hover:text-[#c5a059] transition-colors"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-10 mt-auto space-y-4 border-t border-[var(--border-color)]">
            <button onClick={() => handleNav('/apply')} className="w-full py-4 bg-[#c5a059] text-white font-black uppercase tracking-[0.2em] rounded-xl text-sm shadow-lg shadow-[#c5a059]/20">
              Apply Now
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleNav('/login')} className="py-4 glass-panel text-[var(--text-primary)] font-bold uppercase text-xs tracking-widest rounded-xl">
                Log In
              </button>
              <button onClick={() => handleNav('/signup')} className="py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase text-xs tracking-widest rounded-xl">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
}