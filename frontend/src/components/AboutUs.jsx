import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';

export default function AboutUs() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`relative overflow-hidden bg-[#fdfbf7] py-24 sm:py-32 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      {/* Background Watermark with Parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none parallax-bg"
        style={{ backgroundImage: 'url("/about_us_bg.png")' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-900 sm:text-5xl mb-12">
          About <span className="text-shimmer">Us</span>
        </h2>
        
        <div className="space-y-8 text-lg leading-8 text-slate-600 font-medium">
          <p>
            Black Wolves Acquisition LLC offers hard money lending services to real estate investors globally and in markets worldwide. 
            We provide borrowers with personalized <span className="text-[#c5a059] font-bold">loan consultation</span> services and funding. 
            Black Wolves is direct to lender which allows us to match the borrowers' hard money loan needs with the best funding for their deal. 
            Our real estate development experience allows us to offer our borrowers a unique partnership on every loan. 
            We offer a high level of individual consulting, including review of deal analytics, rehab budgets, and deal viability.
          </p>
          <p>
            Black Wolves Acquisition LLC also offers loan servicing for real estate investors. Black Wolves has a proven track-record of successful underwriting 
            and brings an extensive real estate development background and expertise to help best guide borrowers on each unique transaction.
          </p>
        </div>

        <div className="mt-16 flex items-center justify-center">
          <button 
            onClick={() => navigateTo('/signup')}
            className="flex items-center gap-3 rounded-full bg-[#c5a059] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#b08d4a] hover:scale-105 active:scale-95 shadow-xl shadow-[#c5a059]/20 uppercase tracking-widest"
          >
            Apply Now
            <span className="text-2xl leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

