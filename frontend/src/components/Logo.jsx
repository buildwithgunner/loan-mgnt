import React from 'react';
import logoImg from '../assets/logo.jpg';

export default function Logo({ className = "h-16 w-auto", showText = false }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/assets/logo.jpg" 
        alt="Black Wolves Acquisition LLC" 
        className="h-full rounded-full aspect-square border-2 border-[#c5a059]/30 object-cover drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]" 
      />
    </div>
  );
}
