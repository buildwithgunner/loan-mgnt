import { Zap, ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-transparent relative z-10 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-slate-950/60 border border-white/5 rounded-full px-6 h-16 flex items-center justify-between shadow-lg">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
              <Zap className="text-cyan-400" size={18} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">Swift<span className="text-indigo-400">Loan</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-300 text-sm font-semibold flex items-center gap-2 hover:text-white transition">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Get in <span className="bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Touch.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">Whether you need help with an application or have a partnership inquiry, our team is ready.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 flex items-start gap-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <Mail />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Email Us</h3>
                <p className="text-slate-400 text-sm mb-3">Expected response: 1-2 hours</p>
                <a href="mailto:support@swiftloan.com" className="text-cyan-400 font-semibold hover:text-cyan-300">support@swiftloan.com</a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 flex items-start gap-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Phone />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Call Us</h3>
                <p className="text-slate-400 text-sm mb-3">Mon-Fri, 9am - 8pm EST</p>
                <a href="tel:+18005550199" className="text-cyan-400 font-semibold hover:text-cyan-300">1-800-555-0199</a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[28px] p-8 flex items-start gap-4 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                <MapPin />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Headquarters</h3>
                <p className="text-slate-400 text-sm">1 Wall Street, Suite 400<br/>New York, NY 10005<br/>USA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="backdrop-blur-xl bg-slate-900/40 border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-indigo-500/10">
              <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea rows="5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
