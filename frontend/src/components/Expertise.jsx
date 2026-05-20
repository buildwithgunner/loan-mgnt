import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';

export default function Expertise() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`relative overflow-hidden bg-[#fdfbf7] py-24 sm:py-32 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      {/* Background Watermark with Parallax */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none parallax-bg"
        style={{ backgroundImage: 'url("/about_us_bg.png")' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Creative Image Box */}
          <div className="relative group">
            {/* Gold accent shape */}
            <div className="absolute -top-4 -right-4 h-32 w-32 bg-[#c5a059] opacity-90 rounded-bl-[40px] z-20 pointer-events-none" />
            
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/expertise_house.png" 
                alt="Real Estate Development" 
                loading="lazy"
                className="w-full h-auto object-cover animate-float"
              />
            </div>
            
            {/* Subtle shadow glow */}
            <div className="absolute inset-0 bg-[#c5a059]/10 blur-3xl -z-10 rounded-full scale-90" />
          </div>

          {/* Right Side: Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                Extensive Background in Real Estate Development
              </h2>
              <div className="h-1 w-20 bg-[#c5a059]" />
            </div>

            <div className="space-y-8 text-lg leading-8 text-slate-600 font-medium">
              <p>
                What sets Black Wolves Acquisition LLC apart is our extensive background in real estate development. 
                Our team comprises industry experts who possess in-depth knowledge and insights into 
                the intricacies of the real estate market. This expertise enables us to assess the 
                potential of your project accurately and make informed lending decisions.
              </p>
              <p>
                Whether you are looking to purchase a <span className="text-[#c5a059] font-bold">fix-and-flip property</span> or a 
                <span className="text-[#c5a059] font-bold"> fix-and-lease property</span>, build a new <span className="text-[#c5a059] font-bold">single-family or multi-family asset</span>, 
                or <span className="text-[#c5a059] font-bold">refinance</span> your existing property, our team's expertise ensures that you 
                receive professional guidance throughout the lending process. We evaluate each project 
                individually, considering factors such as location, market trends, and property value, 
                to offer you the best financing options available.
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
