import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const DEFAULT_CONTACT = {
  support_phone: '5635710448',
  support_email: 'Info@blackwolvesacquistionllc.com'
};

const validSetting = (value, fallback) => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed && trimmed.toUpperCase() !== 'N/A' ? trimmed : fallback;
};

export default function TopBar() {
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
          }));
        }
      })
      .catch(err => console.error('Error fetching public settings:', err));
  }, []);

  return (
    <div className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-2.5 px-6 lg:px-10 border-b border-[var(--border-color)] hidden lg:block transition-colors duration-300">
      <div className="mx-auto max-w-[1440px] flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.25em]">
        <div className="flex items-center gap-8">
          <a href={supportPhone ? `tel:${supportPhone}` : '#'} className="flex items-center gap-2 hover:text-[#c5a059] transition-colors">
            <Phone size={12} className="text-[#c5a059]" />
            {formattedPhone}
          </a>
          <a href={`mailto:${settings.support_email}`} className="flex items-center gap-2 hover:text-[#c5a059] transition-colors lowercase tracking-wider">
            <Mail size={12} className="text-[#c5a059]" />
            {settings.support_email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={12} className="text-[#c5a059]" />
            Global Funding
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-[var(--border-color)] pr-6 mr-2">
            <a href="https://www.facebook.com/profile.php?id=61589778456588&mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center">
              <Facebook size={14} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
            </a>
            <a href="https://www.instagram.com/blackwolvesllc_?igsh=MWVpenZieXYzamZoZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="flex items-center">
              <Instagram size={14} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
            </a>
          </div>
          <span className="text-[#c5a059] animate-pulse font-black tracking-[0.3em]">AVAILABLE 24/7 FOR FUNDING</span>
        </div>
      </div>
    </div>
  );
}
