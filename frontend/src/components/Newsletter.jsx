import { Send } from 'lucide-react';
import useReveal from '../hooks/useReveal';

export default function Newsletter() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`bg-[#fcfcfc] py-24 px-6 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Stay Informed
          </h2>
          <div className="mx-auto h-[2px] w-20 bg-[#c5a059]" />
          <p className="text-slate-500 mt-6 text-lg font-medium">Join our network for weekly market insights and funding alerts.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col md:flex-row min-h-[550px] border border-gray-100">
          
          {/* Left: Image with text overlay */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="House at twilight" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c5a059] mb-2">Market Intelligence</p>
              <h4 className="text-2xl font-serif font-bold">Wolves' Weekly</h4>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">
              Subscribe Now
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 focus:border-[#c5a059] focus:bg-white transition-all text-sm font-medium"
                />
                <input 
                  type="text" 
                  placeholder="Last" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 focus:border-[#c5a059] focus:bg-white transition-all text-sm font-medium"
                />
              </div>

              <input 
                type="email" 
                placeholder="Business Email" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]/30 focus:border-[#c5a059] focus:bg-white transition-all text-sm font-medium"
              />

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#c5a059] focus:ring-[#c5a059]" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">I'm not a robot</span>
                </div>
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-6 h-6 grayscale opacity-50" alt="reCAPTCHA" />
              </div>

              <button 
                type="submit" 
                className="w-full mt-4 flex items-center justify-center gap-3 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-black uppercase text-xs tracking-[0.2em] py-5 rounded-xl transition-all shadow-xl shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                Join The Pack
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
