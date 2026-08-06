import React from 'react';
import { navigateTo } from '../../App.jsx';

const benefits = [
  'Business grant and capital-prep guidance',
  'Fast intake for new and existing members',
  'Funding-fit review before you submit',
  'Support for startup, expansion, and community projects',
];

const steps = [
  {
    title: 'Create your profile',
    text: 'New users can join through signup and select business grants right away.',
  },
  {
    title: 'Share your business goals',
    text: 'Tell us what the funds will support, how long your business has been active, and the size of the request.',
  },
  {
    title: 'Request from your dashboard',
    text: 'Existing members can submit a fresh business-grant request from the loan request area anytime.',
  },
];

export default function BusinessGrants() {
  return (
    <div className="bg-[#fdfbf7] text-slate-900">
      <section className="relative overflow-hidden bg-[#05101c] text-white">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_rgba(197,160,89,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#e6c98a]">Business Grants</p>
            <h1 className="text-4xl font-black uppercase italic tracking-tight md:text-6xl">
              Funding support for businesses that need a faster path forward.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Black Wolves now gives new applicants and existing members a direct path to business-grant consideration.
              Use it for startup costs, expansion plans, working capital, and community-minded projects.
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <button
                onClick={() => navigateTo('/signup')}
                className="rounded-full bg-[#c5a059] px-8 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-lg shadow-[#c5a059]/20 transition-transform hover:-translate-y-0.5"
              >
                Start Signup
              </button>
              <button
                onClick={() => navigateTo('/login')}
                className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/10"
              >
                Existing Member Access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tight md:text-3xl">What business grants can support</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              The new business-grant path is meant to help us route the right kind of support faster. If you are building
              a company, opening a new location, or need help getting a plan in front of our team, this is the right place.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="rounded-2xl border border-[#c5a059]/15 bg-[#f9f7f2] p-5 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#c5a059]/15 bg-[#f9f7f2] p-8 shadow-sm md:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c5a059]">Quick Note</p>
            <h3 className="mt-3 text-2xl font-black uppercase italic tracking-tight">How it works</h3>
            <div className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c5a059] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#e6c98a]">Already a member?</p>
              <h3 className="mt-2 text-2xl font-black uppercase italic tracking-tight">Request a business grant or new loan from your dashboard.</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Existing users can log in, open the loan request area, and select Business Grant for the next application.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('/login')}
                className="rounded-full border border-white/15 px-7 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-colors hover:bg-white/10"
              >
                Log In
              </button>
              <button
                onClick={() => navigateTo('/signup')}
                className="rounded-full bg-[#c5a059] px-7 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-lg shadow-[#c5a059]/20 transition-transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
