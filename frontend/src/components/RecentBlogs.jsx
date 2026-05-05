import React from 'react';
import davidImg from '../assets/team/david.jpg';

const blogs = [
  {
    image: davidImg,
    title: "When to Use Hard Money",
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    title: "Hard Money for Agents and Mortgage Brokers",
  },
  {
    image: "https://images.unsplash.com/photo-1579621970588-a3f5ce599fac?auto=format&fit=crop&q=80&w=600",
    title: "Hard Money for Capital Stacking",
  },
  {
    image: "https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80&w=600",
    title: "Hard Money for Fix and Lease",
  }
];

export default function RecentBlogs() {
  return (
    <section className="bg-white py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Recent Blogs
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#c5a059]" />
            <p className="text-[#c5a059] font-medium text-sm">News/Updates</p>
            <div className="h-[1px] w-8 bg-[#c5a059]" />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col cursor-pointer group hover:shadow-xl transition-all duration-300 overflow-hidden">
              
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-900 border-b-4 border-slate-900">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Gold Pill Overlay */}
                <div className="absolute top-4 right-4 bg-[#c5a059] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                  BLOG
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="font-serif font-bold text-slate-900 group-hover:text-[#c5a059] transition-colors text-xl leading-tight mb-6">
                  {blog.title}
                </h3>
                
                <a href="#" className="mt-auto text-[#c5a059] text-xs font-bold tracking-widest uppercase flex items-center hover:text-[#051a2c] transition-colors">
                  READ MORE <span className="ml-1 text-base leading-none">»</span>
                </a>
              </div>
              
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-16">
          <a href="#" className="inline-block font-bold text-slate-900 text-sm uppercase tracking-wider border-b-2 border-slate-900 pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors">
            See More Posts
          </a>
        </div>

      </div>
    </section>
  );
}
