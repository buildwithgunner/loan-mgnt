import React from 'react';
import { navigateTo } from '../../App.jsx';

const newsArticles = [
  {
    id: 1,
    publisher: "Benzinga",
    text: "Black Wolves Acquisition LLC Announces ",
    highlight: "New Construction Loan Product!",
    textEnd: " As one of the few hard money lenders globally, it is now offering construction financing.",
    image: "https://images.unsplash.com/photo-1541888009698-fcfe79c85775?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 2,
    publisher: "PR Newswire",
    text: "Black Wolves is now offering ",
    highlight: "short-term construction loans",
    textEnd: " for the construction of single-family homes and multi-family homes. Black Wolves offers a streamlined process and competitive rates.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 3,
    publisher: "Morningstar",
    text: "Black Wolves Acquisition LLC offers ",
    highlight: "new construction loan product",
    textEnd: " for Global real estate investors building residential homes.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 4,
    publisher: "Seeking Alpha",
    text: "Interest-only ",
    highlight: "new construction loans",
    textEnd: " for real estate investors building residential housing globally.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 5,
    publisher: "Austin Daily Herald",
    text: "A ",
    highlight: "new construction loan product",
    textEnd: " from Black Wolves Acquisition LLC offers 100% financing for investors building residential housing.",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 6,
    publisher: "Washington Daily News",
    text: "Black Wolves offers ",
    highlight: "new construction loan",
    textEnd: " with streamlined application processes and fast funding for real estate investors.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 7,
    publisher: "Tallassee Tribune",
    text: "",
    highlight: "New loan product",
    textEnd: " fills gaps in commercial banking options for new construction loans.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 8,
    publisher: "Gulf & Main",
    text: "Black Wolves's ",
    highlight: "new customizable loan option",
    textEnd: " helps real estate investors during the construction phase.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 9,
    publisher: "RSW Living",
    text: "Interest only ",
    highlight: "construction loan",
    textEnd: " are now available from Black Wolves Acquisition LLC.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 10,
    publisher: "Cape Coral Living",
    text: "Black Wolves's ",
    highlight: "new loan product",
    textEnd: " allows real estate investors to use land as collateral in short term construction loans.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

export default function AsSeenInNews() {
  const heroImage = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="w-full bg-[#fcfdfd] min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center">
        <img 
          src={heroImage} 
          alt="Professionals high fiving" 
          className="absolute inset-0 w-full h-full object-cover" 
          style={{objectPosition: "center 30%"}} 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 px-8 w-full max-w-7xl mx-auto flex flex-col items-start justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-2 font-serif">
              Press
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              As Seen in the News
            </h2>
            <p className="text-lg md:text-[17px] text-gray-200 leading-relaxed mb-8 font-light">
              <span className="text-[#c5a059] font-semibold">Black Wolves Acquisition LLC</span> has been noticed for its innovative practices in financing. Learn about what these sources are saying below. Real estate investors interested in financing can apply today!
            </p>
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-[#c5a059] hover:bg-[#c67c2d] text-white px-8 py-3 rounded-full font-bold text-lg transition-transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center min-w-[200px]"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 justify-center">
          {newsArticles.map((article) => (
            <div 
              key={article.id} 
              className={`relative bg-white overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl h-[420px] flex flex-col justify-center items-center text-center p-8 group border border-gray-100 rounded-2xl
                ${article.id === 10 ? 'md:col-span-2 lg:col-span-1 lg:max-w-md mx-auto w-full lg:col-start-2' : ''}
              `}
            >
              {/* Background Image */}
              <img 
                src={article.image} 
                alt={article.publisher}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center w-full">
                <h3 className="text-[#c5a059] text-4xl mb-4 font-serif text-shadow-sm font-semibold tracking-wide">
                  {article.publisher}
                </h3>
                <p className="text-white text-[15px] leading-relaxed mb-8 max-w-[90%] font-light">
                  {article.text}
                  <span className="text-[#c5a059] font-semibold">{article.highlight}</span>
                  {article.textEnd}
                </p>
                <a 
                  href={article.link}
                  className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-8 py-3 rounded-full text-[14px] font-bold transition-all shadow-md mt-auto tracking-wide block w-fit"
                >
                  Read The Article
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Get Started / CTA Section */}
      <section className="w-full bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center py-24 px-6 border-y border-gray-100">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 mb-8 tracking-wide">
            Get Started With Black Wolves Today
          </h2>
          
          <div className="space-y-6 text-slate-600 text-[15px] leading-relaxed font-light px-4 md:px-12">
            <p>
              If you are in need of hard money lending for a real estate investment anywhere in the world, look no further than Black Wolves Acquisition LLC. <span className="text-[#c5a059] font-semibold">Our team</span> specializes in providing financing options for individuals and businesses looking to invest in the real estate market.
            </p>
            <p>
              With our extensive experience and knowledge in the industry, Black Wolves Acquisition LLC understands the unique challenges and opportunities that come with real estate investments. That's why we offer customized financing solutions for your specific needs and goals.
            </p>
            <p>
              If you're ready to take the next step in your real estate investment journey, <span className="text-[#c5a059] font-semibold transition-colors hover:text-slate-900 cursor-pointer" onClick={() => navigateTo('contact')}>contact Black Wolves Acquisition LLC</span> today to inquire about our financing options. Let us help you make your investment goals a reality.
            </p>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-[#c5a059] hover:bg-[#b08d4a] text-white px-10 py-3.5 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

