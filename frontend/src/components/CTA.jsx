import { navigateTo } from '../App.jsx';
import useReveal from '../hooks/useReveal';

export default function CTA() {
  const [ref, isVisible] = useReveal();

  return (
    <section ref={ref} className={`relative overflow-hidden py-24 sm:py-32 transition-opacity duration-1000 ${isVisible ? 'reveal' : 'opacity-0'}`}>
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 parallax-bg"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601098-38290f6b39bf?auto=format&fit=crop&q=80&w=2000")' }}
      />
      {/* Light Overlay */}
      <div className="absolute inset-0 z-0 bg-white/90 backdrop-blur-sm" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center text-slate-900">
        <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl">
          <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-900 md:text-5xl lg:text-5xl mb-8 leading-tight">
            Get Started with <span className="text-shimmer">Black Wolves</span> Today
          </h2>
          
          <div className="space-y-6 text-lg md:text-lg leading-relaxed text-slate-600 text-center max-w-5xl mx-auto font-medium">
            <p>
              Whether you're looking for hard money loans or private capital strategies, our team is equipped with the expertise to move faster and further than the competition.
            </p>
            <p>
              <span className="text-shimmer font-bold italic uppercase tracking-widest text-sm">Experience the difference</span> 
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => navigateTo('/signup')}
              className="flex items-center gap-3 rounded-full bg-[#c5a059] px-12 py-5 text-lg font-black text-white transition-all hover:bg-[#b08d4a] hover:scale-110 active:scale-95 shadow-xl shadow-[#c5a059]/20 uppercase tracking-widest"
            >
              Get Funded Now
              <span className="text-2xl leading-none">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
