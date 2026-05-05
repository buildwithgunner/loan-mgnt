import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';

export default function TrackRecord() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`relative overflow-hidden bg-white py-24 sm:py-32 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      {/* Parallax Background Watermark */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none parallax-bg"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000")' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Image Box */}
          <div className="relative group">
            <div className="absolute -top-4 -right-4 h-32 w-32 bg-[#c5a059] opacity-90 rounded-bl-[40px] z-20 pointer-events-none" />
            
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" 
                alt="Proven Track Record" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-[#c5a059]/10 blur-3xl -z-10 rounded-full scale-90" />
          </div>

          {/* Right Side: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                Proven Track Record and Direct Funding Sources
              </h2>
              <div className="h-1 w-20 bg-[#c5a059]" />
            </div>

            <div className="space-y-8 text-lg leading-8 text-slate-600 font-medium">
              <p>
                With a proven track record in hard money lending and private money lending, 
                Black Wolves Acquisition LLC has successfully supported numerous real estate projects across 
                a range of sectors. Our commitment to integrity, professionalism, and customer 
                satisfaction has earned us the trust of our clients and partners.
              </p>
              <p>
                To provide you with optimal funding options, we maintain relationships with 
                <span className="text-[#c5a059] font-bold"> direct funding</span> and other capital sources. 
                This allows us to offer flexible terms and competitive interest rates tailored to your 
                unique project requirements. Our diverse funding network ensures that we can accommodate 
                a wide range of real estate investments, from fix-and-flip loans to refinance loans.
              </p>
            </div>

            <button 
              onClick={() => navigateTo('/signup')}
              className="flex items-center gap-2 rounded-full bg-[#c5a059] px-10 py-4 text-lg font-bold text-white transition-all hover:bg-[#b08d4a] hover:scale-105 active:scale-95 shadow-lg shadow-[#c5a059]/30"
            >
              APPLY NOW
              <span className="text-xl">→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
