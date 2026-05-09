import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/leads/submit`, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        purpose: `Subject: ${formData.subject}\nMessage: ${formData.message}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`
      });

      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'Your inquiry has been received. Our team will contact you shortly.',
        confirmButtonColor: '#c5a059'
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error sending your message. Please try again later.',
        confirmButtonColor: '#c5a059'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div id="contact" className="w-full bg-white relative z-10 border-t border-slate-200">
      
      {/* Top Banner */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1600" 
          alt="Contact us background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
        <h1 className="relative z-10 text-white text-5xl font-bold drop-shadow-md tracking-tight font-serif">Contact us</h1>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] leading-tight text-slate-900 font-bold mb-4 tracking-tight font-serif">Do you have questions?</h2>
          <div className="h-[2px] w-20 bg-[#c5a059] mx-auto rounded" />
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Info Cards */}
          <div className="flex flex-col gap-6 w-full lg:w-[35%]">
            
            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
              <Phone className="w-10 h-10 text-slate-900 mb-4" strokeWidth={2.5} />
              <h3 className="text-xl font-semibold text-[#c5a059] mb-3 tracking-wide uppercase">Phone</h3>
              <a href="tel:+15635710448" className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">+1 563-571-0448</a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
              <Mail className="w-10 h-10 text-slate-900 mb-4" strokeWidth={2.5} />
              <h3 className="text-xl font-semibold text-[#c5a059] mb-3 tracking-wide uppercase">Email</h3>
              <a href="mailto:info@blackwolvesacquisition.com" className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">info@blackwolvesacquisition.com</a>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100 p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
              <MapPin className="w-10 h-10 text-slate-900 mb-4" strokeWidth={2.5} />
              <h3 className="text-xl font-semibold text-[#c5a059] mb-3 tracking-wide uppercase">Secaucus NJ</h3>
              <p className="text-slate-500 text-[13px] font-medium leading-relaxed max-w-[220px]">
                759 7TH ST, SECAUCUS, NJ 07094
              </p>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-[65%] text-slate-800">
            <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Contact Us</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Block */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Name <span className="text-red-700 font-black">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <input 
                      type="text" required
                      className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                      value={formData.firstName}
                      onChange={(e) => handleChange(e, 'firstName')}
                    />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">First</p>
                  </div>
                  <div>
                    <input 
                      type="text" required
                      className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                      value={formData.lastName}
                      onChange={(e) => handleChange(e, 'lastName')}
                    />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">Last</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Email <span className="text-red-700 font-black">*</span></label>
                <input 
                  type="email" required
                  className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                  value={formData.email}
                  onChange={(e) => handleChange(e, 'email')}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Phone</label>
                <input 
                  type="tel"
                  className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                  value={formData.phone}
                  onChange={(e) => handleChange(e, 'phone')}
                />
              </div>

              {/* Full Address Block */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Full Address <span className="text-red-700 font-black">*</span></label>
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" required
                      className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                      value={formData.address}
                      onChange={(e) => handleChange(e, 'address')}
                    />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">Street Address</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <input 
                        type="text" required
                        className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                        value={formData.city}
                        onChange={(e) => handleChange(e, 'city')}
                      />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">City</p>
                    </div>
                    <div>
                      <input 
                        type="text" required
                        className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                        value={formData.state}
                        onChange={(e) => handleChange(e, 'state')}
                      />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">State / Province / Region</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <input 
                        type="text" required
                        className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                        value={formData.zip}
                        onChange={(e) => handleChange(e, 'zip')}
                      />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">ZIP / Postal Code</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="pt-2">
                <label className="block text-[15px] font-bold mb-2">Subject <span className="text-red-700 font-black">*</span></label>
                <input 
                  type="text" required
                  className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" 
                  value={formData.subject}
                  onChange={(e) => handleChange(e, 'subject')}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Message <span className="text-red-700 font-black">*</span></label>
                <textarea 
                  rows={10} required
                  className="w-full border border-slate-400 p-2 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px] resize-y"
                  value={formData.message}
                  onChange={(e) => handleChange(e, 'message')}
                ></textarea>
                <p className="text-[11px] text-slate-500 mt-1">{formData.message.length} of 5000 max characters</p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#c5a059]/20 hover:scale-105 active:scale-95 w-fit mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>

            </form>
          </div>
          
        </div>
      </section>

      {/* Embedded Map Area */}
      <div className="w-full h-[450px] relative z-0">
        <iframe 
          title="Black Wolves Acquisition LLC Location"
          src="https://maps.google.com/maps?q=759%207TH%20ST,%20SECAUCUS,%20NJ%2007094&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        />
      </div>

    </div>
  );
}


