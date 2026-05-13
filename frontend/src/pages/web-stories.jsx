import React, { useState } from 'react';
import { navigateTo } from '../App.jsx';
import { BookOpen, ChevronRight } from 'lucide-react';

const allStories = [
  /* ── Page 1 ── */
  {
    id: 1,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?auto=format&fit=crop&q=80&w=700',
    title: 'How to find Fix and Flip Properties?',
    date: 'September 22, 2022',
    excerpt: "Finding the right property to flip is the foundation of every great return. Discover Black Wolves Acquisition LLC's top strategies for sourcing off-market deals globally.",
  },
  {
    id: 2,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=700',
    title: 'WHY YOU SHOULD INVEST IN LAND?',
    date: 'September 20, 2022',
    excerpt: 'Land investment is often overlooked but remains one of the most powerful wealth-building strategies. We break down the key reasons to consider raw land.',
  },
  {
    id: 3,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=700',
    title: 'Best Investment options in this inflation to secure your future!',
    date: 'September 18, 2022',
    excerpt: 'Real estate has historically outpaced inflation. Here are the best hard money loan strategies to position yourself for lasting wealth.',
  },
  {
    id: 4,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1507671285223-28f092e07172?auto=format&fit=crop&q=80&w=600',
    date: 'September 16, 2022',
    content: {
      title: 'Real estate\nhousing\nmarket crash',
      subtitle: 'Fact Check',
      titleColor: '#a8cf45',
      subtitleColor: '#ffffff',
      hasCaret: true,
    },
  },
  {
    id: 5,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1557682260-96773eb01377?auto=format&fit=crop&q=80&w=600',
    date: 'September 14, 2022',
    headerTitle: "Don't make these 5 mistakes while doing Fix and Flip",
    content: {
      body: "Don't make these\n5 mistakes while\ndoing Fix and Flip",
      bodyColor: '#1a1a1a',
      bg: '#eeb44c',
      diagonal: true,
    },
  },
  {
    id: 6,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=600',
    date: 'September 13, 2022',
    content: {
      title: 'Bridge Loan\nVs\nHard Money Loan',
      subtitle: 'Are they Same?',
      titleColor: '#eeb44c',
      subtitleColor: '#a8cf45',
    },
  },
  {
    id: 7,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600',
    date: 'September 12, 2022',
    headerTitle: 'Documents Needed for hard money loan',
    content: {
      listTitle: '1.\nPurchase Agreement',
      list: [
        'Buyer and seller information',
        'Property details',
        'Pricing details',
        'Financing details',
        'Fixtures and appliances included/excluded in the sale',
        'Closing and possession dates',
        'Earnest money deposit',
        'Closing costs',
        'Conditions that can terminate a contract',
        'Contingencies',
      ],
    },
  },
  {
    id: 8,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=700',
    title: 'How Hard Money Loans work in 2024',
    date: 'October 3, 2022',
    excerpt: 'A step-by-step breakdown of the hard money loan process — from application to funding in as little as 7 days.',
  },
  {
    id: 9,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=700',
    title: 'New Construction Loans Explained',
    date: 'October 1, 2022',
    excerpt: 'Breaking ground on a new project? Learn how new construction loans from Black Wolves Acquisition LLC can fund your vision from start to finish.',
  },

  /* ── Page 2 ── */
  {
    id: 10,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=700',
    title: 'What is a Cash-Out Refinance Loan?',
    date: 'October 8, 2022',
    excerpt: 'Unlock the equity in your existing property to fund your next investment. Black Wolves Acquisition LLC explains exactly how cash-out refinancing works for investors.',
  },
  {
    id: 11,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=700',
    title: 'Top 7 Tips to Close a Deal Faster',
    date: 'October 10, 2022',
    excerpt: 'Speed matters in real estate. Here are 7 proven tips to accelerate your deal pipeline and close faster with hard money financing.',
  },
  {
    id: 12,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=700',
    title: 'How to Evaluate a Fix and Flip Property',
    date: 'October 12, 2022',
    excerpt: 'Before you make an offer, you need to run the numbers. We walk you through the exact framework Black Wolves Acquisition LLC uses to underwrite fix-and-flip deals.',
  },
  {
    id: 13,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600',
    date: 'October 14, 2022',
    content: {
      title: 'Fix & Flip\nProfits\nin 2024',
      subtitle: 'The Numbers',
      titleColor: '#c5a059',
      subtitleColor: '#ffffff',
    },
  },
  {
    id: 14,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    date: 'October 16, 2022',
    headerTitle: '5 Signs a Property is a Good Fix & Flip',
    content: {
      body: "5 Signs a\nProperty is a\nGreat Flip",
      bodyColor: '#ffffff',
      bg: '#051a2c',
      diagonal: true,
    },
  },
  {
    id: 15,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600',
    date: 'October 18, 2022',
    content: {
      title: 'Hard Money\nVs\nBank Loan',
      subtitle: 'Which is Faster?',
      titleColor: '#eeb44c',
      subtitleColor: '#a8cf45',
    },
  },
  {
    id: 16,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=700',
    title: 'Understanding LTV in Hard Money Loans',
    date: 'October 20, 2022',
    excerpt: 'Loan-to-Value ratio is the most important metric in hard money lending. Here is how to calculate it and how it affects your loan terms.',
  },
  {
    id: 17,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=700',
    title: 'Fix and Lease: The Buy-and-Hold Strategy',
    date: 'October 22, 2022',
    excerpt: 'Not every property needs to be flipped. Fix and lease loans let you renovate, rent, and build long-term passive income through your real estate portfolio.',
  },
  {
    id: 18,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=700',
    title: 'How to Get Pre-Qualified for a Hard Money Loan',
    date: 'October 24, 2022',
    excerpt: 'Pre-qualification is your first step. We show you exactly what to prepare and what lenders like Black Wolves Acquisition LLC look for when evaluating applications.',
  },

  /* ── Page 3 ── */
  {
    id: 19,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=700',
    title: 'Investing globally Real Estate in 2024',
    date: 'November 1, 2022',
    excerpt: "global real estate market remains one of the hottest in the country. Here's what every investor needs to know heading into 2024.",
  },
  {
    id: 20,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1507671285223-28f092e07172?auto=format&fit=crop&q=80&w=700',
    title: 'What Happens After Your Loan is Funded?',
    date: 'November 3, 2022',
    excerpt: 'Closing day is just the beginning. Learn what to expect after your hard money loan is funded and how to execute your project on budget and on time.',
  },
  {
    id: 21,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=700',
    title: 'Black Wolves Acquisition LLC: Who We Are and What We Do',
    date: 'November 5, 2022',
    excerpt: 'Get to know Black Wolves Acquisition LLC — Global\'s trusted hard money lender. Learn about our team, our values, and our commitment to fast, transparent financing.',
  },
  {
    id: 22,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    date: 'November 7, 2022',
    content: {
      title: 'Tampa Bay\nReal Estate\nMarket Update',
      subtitle: 'November 2022',
      titleColor: '#ffffff',
      subtitleColor: '#c5a059',
    },
  },
  {
    id: 23,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    date: 'November 9, 2022',
    headerTitle: 'How to Scale Your Real Estate Portfolio',
    content: {
      body: "How to Scale\nYour Real\nEstate Portfolio",
      bodyColor: '#ffffff',
      bg: '#c5a059',
      diagonal: true,
    },
  },
  {
    id: 24,
    type: 'story',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&q=80&w=600',
    date: 'November 11, 2022',
    content: {
      title: 'No Income\nVerification\nLoans',
      subtitle: 'How it Works',
      titleColor: '#eeb44c',
      subtitleColor: '#ffffff',
    },
  },
  {
    id: 25,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=700',
    title: 'Common Hard Money Loan Myths — Debunked',
    date: 'November 13, 2022',
    excerpt: 'Many investors avoid hard money loans based on misconceptions. We bust the top 6 myths and show you why private lending is a smart strategy.',
  },
  {
    id: 26,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1572031879761-efb2a3dd2fde?auto=format&fit=crop&q=80&w=700',
    title: '6 Renovation Mistakes That Kill Your ROI',
    date: 'November 15, 2022',
    excerpt: 'Every dollar spent on renovations should increase your sale price. Here are the six most costly renovation mistakes fix-and-flip investors make.',
  },
  {
    id: 27,
    type: 'card',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=700',
    title: 'Why Black Wolves Acquisition LLC Closes in 7 Days',
    date: 'November 17, 2022',
    excerpt: 'Speed is our competitive advantage. Discover the process and team behind Black Wolves Acquisition LLC\'s industry-leading 7-day funding timeline.',
  },
];

function StoryCard({ story }) {
  const c = story.content || {};
  return (
    <div className="flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-sm">
      {story.headerTitle && (
        <div className="px-5 pt-5 pb-2">
          <h2 className="text-[19px] font-bold text-slate-900 leading-snug">{story.headerTitle}</h2>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col pt-2">
        {/* Instagram-style story frame */}
        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-md bg-[#1a1a1a] cursor-pointer group">
          <img
            src={story.image}
            alt="Story"
            className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Progress bars */}
          <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden">
                {i === 0 && <div className="h-full w-full bg-white" />}
              </div>
            ))}
          </div>
          {/* Share icon */}
          <div className="absolute top-7 right-3 z-20">
            <svg className="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>

          {/* Content overlay variants */}
          {c.listTitle && (
            <div className="absolute inset-0 bg-white/95 flex flex-col p-5 overflow-y-auto">
              <h3 className="text-slate-900 font-extrabold text-lg text-center mb-3">
                {c.listTitle.split('\n').map((l, i) => (
                  <span key={i} className={i === 0 ? 'text-[#c5a059]' : ''}>{l}<br /></span>
                ))}
              </h3>
              <ul className="text-slate-600 text-[12px] space-y-1.5 font-medium">
                {c.list.map((item, i) => (
                  <li key={i}>– {item}</li>
                ))}
              </ul>
            </div>
          )}

          {c.diagonal && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: c.bg }}>
              <div className="absolute inset-0" style={{ clipPath: 'polygon(0 22%, 100% 8%, 100% 78%, 0 92%)', background: c.bg }} />
              <p className="relative z-10 text-center font-extrabold text-[#1a1a1a] text-[20px] leading-snug px-5">
                {c.body.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
              </p>
            </div>
          )}

          {c.title && !c.listTitle && !c.diagonal && (
            <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-center items-center p-5 text-center">
              <h3 className="font-extrabold text-2xl leading-tight drop-shadow mb-2" style={{ color: c.titleColor || '#fff' }}>
                {c.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
              </h3>
              {c.subtitle && (
                <p className="font-bold text-lg drop-shadow" style={{ color: c.subtitleColor || '#fff' }}>{c.subtitle}</p>
              )}
              {c.hasCaret && <div className="text-white text-3xl mt-4">→</div>}
            </div>
          )}
        </div>

        <div className="mt-4">
          <a href="#" className="text-[#c5a059] uppercase text-[10px] font-bold tracking-wider hover:underline">READ MORE »</a>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
          {story.date} <span className="mx-1">•</span> No Comments
        </div>
      </div>
    </div>
  );
}

function BlogCard({ story }) {
  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-sm overflow-hidden cursor-pointer flex flex-col">
      <div className="w-full aspect-[16/10] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-[20px] font-bold text-slate-900 leading-snug group-hover:text-[#c5a059] transition-colors mb-3">
          {story.title}
        </h2>
        <p className="text-slate-500 text-[13px] leading-relaxed flex-1 mb-5">{story.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[11px] text-gray-400">{story.date} • No Comments</span>
          <a href="#" className="text-[#c5a059] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
            READ MORE <ChevronRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WebStories() {
  const [page, setPage] = useState(1);
  const perPage = 9;
  const totalPages = Math.ceil(allStories.length / perPage);
  const visible = allStories.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="w-full bg-white min-h-screen font-sans">

      {/* ── Hero ── */}
      <section className="bg-slate-50 pt-36 pb-16 px-6 text-center border-b border-gray-100">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
            <BookOpen size={22} className="text-[#c5a059]" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif mb-4">Archives: Stories</h1>
        <p className="text-slate-600 max-w-xl mx-auto text-[15px] leading-relaxed">
          Insights, tips, market updates, and web stories from the Black Wolves Acquisition LLC team — helping real estate investors succeed globally.
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="h-1 w-full bg-[#c5a059]" />

      {/* ── Story Grid ── */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map(story =>
            story.type === 'story'
              ? <StoryCard key={story.id} story={story} />
              : <BlogCard key={story.id} story={story} />
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-16 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`w-9 h-9 rounded font-bold text-sm transition-all ${
                page === p
                  ? 'bg-slate-900 text-white'
                  : 'text-[#c5a059] border border-[#c5a059] hover:bg-[#c5a059] hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className="relative w-full py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600"
          alt="Apply Now"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Get Funded?</h2>
          <button
            onClick={() => navigateTo('/signup')}
            className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-xl text-lg"
          >
            Apply Now! <ChevronRight size={20} />
          </button>
        </div>
      </section>

    </div>
  );
}

