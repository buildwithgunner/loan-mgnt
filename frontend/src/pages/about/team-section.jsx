import React from 'react';
import { navigateTo } from '../../App.jsx';
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    id: 1,
    name: "Anthony Deceglie",
    role: "Chief Executive Officer",
    image: "/ceo_anthony.jpg",
    bio: "Anthony brings over 25 years of exceptional leadership and strategic vision to Black Wolves Acquisition LLC. As CEO, he has pioneered innovative lending solutions that have revolutionized the hard money market, ensuring our clients receive the most agile and reliable capital for their real estate ventures.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 2,
    name: "Zach Willams",
    role: "Loan Processor",
    image: "/daniel.jpg",
    bio: "Zach coordinates and processes our core loan files with absolute precision. With deep experience in real estate transactions, he ensures that every client application moves swiftly through underwriting to a successful closing.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Chief Account Officer",
    image: "/sarah_v2.jpg",
    bio: "Sarah orchestrates our daily financial operations with precision and agility. Her background in large-scale portfolio management gives her a firsthand understanding of the complex accounting needs of our high-volume investors.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Loan Officer",
    image: "/michael.jpg",
    bio: "With an exceptional structural and quantitative approach to risk, Michael leads our loan processing efforts. His dedication ensures funding is fast but secure, allowing our clients to capitalize on time-sensitive opportunities.",
    linkedin: "#",
    twitter: "#",
    email: "#",
  }
];

export default function TeamSection() {
  const title = "Meet Our Team";
  const subtitle = "The experts driving your real estate success at Black Wolves Acquisition LLC.";
  const heroImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[450px] flex items-end">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover text-center" style={{objectPosition: "center 30%"}} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="relative z-10 px-6 pb-20 w-full text-center max-w-5xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#c5a059]/20 text-[#c5a059] font-semibold text-sm mb-4 border border-[#c5a059]/30 tracking-wider uppercase">
            Leadership
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight font-serif">{title}</h1>
          <p className="text-lg md:text-2xl font-light text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Intro */}
        <div className="flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
          <div className="h-1 w-20 bg-[#c5a059] mb-8 rounded-full" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Built by Investors, For Investors</h2>
          <p className="text-[17px] leading-relaxed text-slate-600 mb-4">
            Black Wolves Acquisition LLC is powered by a team of experienced real estate professionals, financial analysts, and lending experts. With decades of combined experience in the market, we have the specialized knowledge required to fund and foster successful real estate investments.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Social Links overlay on hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <a href={member.linkedin} className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:bg-[#c5a059] hover:text-white transition-colors">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href={member.twitter} className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:bg-[#c5a059] hover:text-white transition-colors">
                    <FaTwitter size={16} />
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{member.name}</h3>
                  <p className="text-[#c5a059] font-bold tracking-wide text-[10px] uppercase">{member.role}</p>
                </div>
                <div className="h-px w-10 bg-slate-200 mb-5" />
                <p className="text-slate-600 leading-relaxed text-[13px] flex-1">
                  {member.bio}
                </p>
                
                {/* Connect button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a href={member.email} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-[#c5a059] transition-colors">
                    <FaEnvelope /> Contact {member.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-slate-50 py-24 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif">Ready to work with the best?</h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
            Partner with our experienced team to get the financing your next real estate project deserves. We're ready to review your deal today.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
          >
            Get In Touch Now
          </button>
        </div>
      </section>
    </div>
  );
}

