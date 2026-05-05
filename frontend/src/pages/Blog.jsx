import React, { useState } from 'react';
import { ChevronRight, Search, Tag, Calendar, User } from 'lucide-react';
import { navigateTo } from '../App.jsx';

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=700',
    title: 'When to Use Hard Money',
    date: 'February 13, 2026',
    category: 'Hard Money',
    excerpt: "In today's environment, disciplined capital, real estate experience, and responsive underwriting matter. Hard money is not permanent debt. It is not speculative capital. It is a bridge to opportunity for investors who move fast and think clearly.",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=700',
    title: 'Hard Money for Agents and Mortgage Brokers',
    date: 'February 13, 2026',
    category: 'Brokers',
    excerpt: "In today's environment, disciplined capital, clear communication, and responsive underwriting matter. Real estate transactions depend on alignment between investors, brokers, agents, and lenders.",
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=700',
    title: 'Hard Money for Capital Stacking',
    date: 'February 13, 2026',
    category: 'Strategy',
    excerpt: "In today's environment, disciplined capital, capital insight, and responsive underwriting matter. Growth in real estate does not occur through a single source of financing.",
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=700',
    title: 'Hard Money Loan — Why Choose Black Wolves Acquisition LLC?',
    date: 'February 13, 2026',
    category: 'Hard Money',
    excerpt: "Hard money lending is about speed, clarity, and execution. At Black Wolves Acquisition LLC, we underwrite the deal — not the borrower. We fund based on the value of the asset, not on personal income or credit history.",
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=700',
    title: 'Fix and Flip Loans in Tampa, FL',
    date: 'January 20, 2026',
    category: 'Fix & Flip',
    excerpt: "global real estate investment market continues to attract experienced flippers and first-time investors alike. Black Wolves Acquisition LLC provides the capital you need to move fast on distressed properties across Tampa.",
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=700',
    title: 'New Construction Loan — From Lot to Livable',
    date: 'January 15, 2026',
    category: 'Construction',
    excerpt: "Building from the ground up requires a lender who understands draw schedules, contractor timelines, and milestone-based disbursements. Black Wolves Acquisition LLC has funded new construction projects across all of Global.",
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&q=80&w=700',
    title: "What is a Debt Service Coverage Ratio (DSCR) Loan?",
    date: 'January 10, 2026',
    category: 'Education',
    excerpt: "A DSCR loan qualifies borrowers based on property cash flow rather than personal income. This makes it an ideal tool for real estate investors who are self-employed or own multiple properties.",
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=700',
    title: "Understanding Bridge Loans vs Hard Money Loans",
    date: 'December 28, 2025',
    category: 'Education',
    excerpt: "Many investors use the terms interchangeably, but bridge loans and hard money loans serve different functions. We break down the key differences so you can choose the right product for your deal.",
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=700',
    title: 'Top 5 Global Markets for Fix and Flip in 2026',
    date: 'December 15, 2025',
    category: 'Market Insights',
    excerpt: "Tampa, Orlando, Jacksonville, Miami, and Sarasota are leading the charge globally's fix-and-flip market. Here's what investors need to know about each market heading into 2026.",
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=700',
    title: 'Cash-Out Refinance: Unlock Your Equity',
    date: 'December 5, 2025',
    category: 'Refinancing',
    excerpt: "If you own a property with significant equity, a cash-out refinance can provide capital for your next investment without selling your asset. Black Wolves Acquisition LLC helps investors leverage existing holdings.",
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=700',
    title: "Fix and Lease: Build a Rental Portfolio with Hard Money",
    date: 'November 22, 2025',
    category: 'Fix & Lease',
    excerpt: "Not every investor wants to flip. Fix and lease loans let you renovate a distressed property and hold it as a long-term rental. Black Wolves Acquisition LLC provides the bridge capital to get your rental ready.",
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=700',
    title: 'Hard Money Loan Requirements — What You Actually Need',
    date: 'November 10, 2025',
    category: 'Education',
    excerpt: "Forget the paperwork mountain. Hard money loan qualifications focus on the deal — the property value, after-repair value (ARV), and your exit strategy. Here's exactly what Black Wolves Acquisition LLC needs from you.",
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1572031879761-efb2a3dd2fde?auto=format&fit=crop&q=80&w=700',
    title: 'How to Calculate ARV (After Repair Value)',
    date: 'October 28, 2025',
    category: 'Education',
    excerpt: "ARV is the single most important number in any fix-and-flip deal. Getting it right determines your loan amount, renovation budget, and expected profit margin.",
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=700',
    title: "Black Wolves Acquisition LLC's Referral Program — Earn While You Network",
    date: 'October 15, 2025',
    category: 'Programs',
    excerpt: "Refer a borrower to Black Wolves Acquisition LLC and earn a commission when their loan closes. Our referral program is open to agents, brokers, wholesalers, and fellow investors.",
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?auto=format&fit=crop&q=80&w=700',
    title: '7 Questions to Ask Your Hard Money Lender Before You Close',
    date: 'October 1, 2025',
    category: 'Tips',
    excerpt: "Not all hard money lenders are created equal. Before you sign on the dotted line, make sure you ask these seven questions to protect yourself and your deal.",
  },
];

const POSTS_PER_PAGE = 9;
const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

export default function Blog() {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const visible = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="w-full bg-white min-h-screen font-sans">

      {/* ── Hero ── */}
      <section className="bg-slate-50 pt-36 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c5a059] uppercase tracking-widest text-sm font-bold mb-3">Black Wolves Acquisition LLC</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 font-serif">The Black Wolves Blog</h1>
          <p className="text-slate-600 text-[15px] max-w-xl leading-relaxed mb-8">
            Insights, market updates, and expert guides for real estate investors globally and beyond.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-white border border-gray-200 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 rounded-full text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#c5a059] transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── Gold bar ── */}
      <div className="h-1 w-full bg-[#c5a059]" />

      {/* ── Category Filter ── */}
      <section className="bg-slate-50 border-b border-slate-200 py-4 px-6 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
          <Tag size={15} className="text-slate-400 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-white shadow'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-[#c5a059] hover:text-[#c5a059]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400">{filtered.length} articles</span>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {visible.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-xl font-medium">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map(post => (
              <article key={post.id} className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* BLOG badge */}
                  <div className="absolute top-3 right-3 bg-[#c5a059] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-sm shadow">
                    BLOG
                  </div>
                  {/* Black Wolves Watermark */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#c5a059]">
                      <path d="M4 20V8L9 4V20M9 20V10L14 7V20M14 20V12L19 10V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[9px] text-white font-bold tracking-wider">Black Wolves</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/30 bg-[#c5a059]/10 px-2 py-0.5 rounded-sm">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-[19px] font-bold text-slate-900 leading-snug group-hover:text-[#c5a059] transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-slate-500 text-[13px] leading-relaxed flex-1 mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Calendar size={11} />
                      <span>{post.date}</span>
                      <span className="mx-1">•</span>
                      <span>No Comments</span>
                    </div>
                    <a
                      href="#"
                      className="text-[#c5a059] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                    >
                      READ MORE <ChevronRight size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2">
            <button
              onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 1}
              className="px-4 py-2 rounded border border-slate-200 text-slate-500 text-sm font-medium hover:border-[#c5a059] hover:text-[#c5a059] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-9 h-9 rounded font-bold text-sm transition-all ${
                  page === p
                    ? 'bg-slate-900 text-white shadow'
                    : 'border border-slate-200 text-slate-500 hover:border-[#c5a059] hover:text-[#c5a059]'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages}
              className="px-4 py-2 rounded border border-slate-200 text-slate-500 text-sm font-medium hover:border-[#c5a059] hover:text-[#c5a059] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="relative w-full py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600"
          alt="Apply Now"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Fund Your Next Deal?</h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto text-[15px]">Fast approvals. Flexible terms. global trusted hard money lender.</p>
          <button
            onClick={() => navigateTo('/signup')}
            className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl text-lg"
          >
            Apply Now <ChevronRight size={20} />
          </button>
        </div>
      </section>

    </div>
  );
}

