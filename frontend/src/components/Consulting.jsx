import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';


export default function Consulting() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`relative overflow-hidden bg-white py-24 sm:py-32 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      {/* Parallax Background Watermark */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none parallax-bg"
        style={{ backgroundImage: 'url("/about_us_bg.png")' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                Individual Consulting for <span className="text-shimmer">Tailored Solutions</span>
              </h2>
              <div className="h-1 w-20 bg-[#c5a059]" />
            </div>

            <div className="space-y-8 text-lg leading-8 text-slate-600 font-medium">
              <p>
                We understand that real estate investments can be complex, and finding the right 
                financing solution can be challenging. That's why at Black Wolves Acquisition LLC, we provide 
                individual consulting services to help you navigate the lending landscape. Our 
                <span className="text-[#c5a059] font-bold"> experienced consultants</span> work closely 
                with you, offering personalized guidance and expertise to ensure you make informed decisions.
              </p>
              <p>
                From assessing the feasibility of your project to identifying the most suitable funding 
                sources, our consultants are dedicated to finding the best financing solution for your 
                specific needs. We take the time to understand your goals and offer strategic insights, 
                helping you maximize your investment potential and minimize risks.
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

          {/* Right Side: Image Box */}
          <div className="relative group order-1 lg:order-2">
            <div className="absolute -top-4 -left-4 h-32 w-32 bg-[#c5a059] opacity-90 rounded-br-[40px] z-20 pointer-events-none" />
            
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/consultant.jpg" 
                alt="Individual Consulting" 
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute inset-0 bg-[#c5a059]/10 blur-3xl -z-10 rounded-full scale-90" />
          </div>

        </div>
      </div>
    </section>
  );
}
