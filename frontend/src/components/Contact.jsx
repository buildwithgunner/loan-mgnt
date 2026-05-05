import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
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
            
            <form className="space-y-6">
              
              {/* Name Block */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Name <span className="text-red-700 font-black">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">First</p>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">Last</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Email <span className="text-red-700 font-black">*</span></label>
                <input type="email" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Phone</label>
                <input type="tel" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
              </div>

              {/* Full Address Block */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Full Address <span className="text-red-700 font-black">*</span></label>
                <div className="space-y-4">
                  <div>
                    <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">Street Address</p>
                  </div>
                  <div>
                    <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                    <p className="text-[13px] font-medium text-slate-500 mt-1">Address Line 2</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">City</p>
                    </div>
                    <div>
                      <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">State / Province / Region</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
                      <p className="text-[13px] font-medium text-slate-500 mt-1">ZIP / Postal Code</p>
                    </div>
                    <div>
                      <select className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px] h-[38px]">
                        <option value=""></option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                      <p className="text-[13px] font-medium text-slate-500 mt-1">Country</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="pt-2">
                <label className="block text-[15px] font-bold mb-2">Subject <span className="text-red-700 font-black">*</span></label>
                <input type="text" className="w-full border border-slate-400 p-2 text-slate-800 bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px]" />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[15px] font-bold mb-2">Message <span className="text-red-700 font-black">*</span></label>
                <textarea rows={10} className="w-full border border-slate-400 p-2 text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-[0.5px] focus:ring-[#c5a059] transition-all rounded-[3px] resize-y"></textarea>
                <p className="text-[11px] text-slate-500 mt-1">0 of 5000 max characters</p>
              </div>

              {/* Consent 1 */}
              <div className="flex items-start gap-4 pt-4">
                <input type="checkbox" className="mt-1 w-[13px] h-[13px] border-slate-400 rounded-sm text-[#051a2c] focus:ring-[#051a2c] flex-shrink-0 cursor-pointer" />
                <p className="text-[13px] text-slate-600 leading-[1.6]">
                  I consent to receive transactional messages related to my account, orders, or services I have requested from Black Wolves Acquisition LLC. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency varies. Message & data rates may apply. Text HELP for assistance. You can reply STOP to unsubscribe at any time.
                </p>
              </div>

              {/* Consent 2 */}
              <div className="pt-2">
                <p className="font-bold text-[15px] mb-2 leading-tight">Marketing Consent Checkbox</p>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-[13px] h-[13px] border-slate-400 rounded-sm text-[#051a2c] focus:ring-[#051a2c] cursor-pointer" />
                  <p className="text-[14px] text-slate-700">I Consent to Receive Occasional Marketing Communication from Black Wolves Acquisition LLC.</p>
                </div>
              </div>

              {/* reCAPTCHA Mockup */}
              <div className="w-[304px] border border-[#d3d3d3] bg-[#f9f9f9] rounded-[3px] shadow-[0px_0px_4px_1px_rgba(0,0,0,0.08)] flex items-center justify-between px-3 py-3 xl:py-4 mt-6">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-[28px] h-[28px] rounded-[2px] border-2 border-[#c1c1c1] bg-white cursor-pointer" />
                  <label className="text-[14px] text-slate-800 font-medium">I'm not a robot</label>
                </div>
                <div className="flex flex-col items-center justify-center opacity-70">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8 object-contain" />
                  <div className="text-[10px] text-zinc-500 leading-tight mt-1">reCAPTCHA</div>
                  <div className="text-[8px] text-zinc-500">Privacy - Terms</div>
                </div>
              </div>

              {/* Terms Link */}
              <div className="text-[14.5px] text-slate-600 my-6">
                Please visit our <a href="#" className="text-[#c5a059] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#c5a059] hover:underline">Terms of Service</a>
              </div>

              {/* Submit Button */}
              <button type="submit" className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg shadow-[#c5a059]/20 hover:scale-105 active:scale-95 w-fit mt-4">
                Submit
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

