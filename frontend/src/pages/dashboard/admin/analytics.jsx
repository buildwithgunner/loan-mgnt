import React from 'react';

const metrics = [
  { label: 'Total Page Views',       value: '48,291', change: '+22%',  up: true },
  { label: 'Unique Visitors',        value: '12,847', change: '+15%',  up: true },
  { label: 'Applications Submitted', value: '312',    change: '+8%',   up: true },
  { label: 'Conversion Rate',        value: '2.43%',  change: '+0.4%', up: true },
  { label: 'Avg. Session Duration',  value: '3m 42s', change: '+12%',  up: true },
  { label: 'Bounce Rate',            value: '34.2%',  change: '-5%',   up: false },
];

const topPages = [
  { page: '/loans/fix-and-flip',    views: 8421, pct: 95 },
  { page: '/apply',                 views: 5388, pct: 62 },
  { page: '/loans/new-construction',views: 4201, pct: 48 },
  { page: '/blog',                  views: 3814, pct: 44 },
  { page: '/web-stories',           views: 2958, pct: 34 },
  { page: '/areas-we-serve',        views: 2143, pct: 25 },
];

const traffic = [
  { source: 'Organic Search', pct: 48, color: 'bg-[#051a2c]' },
  { source: 'Direct',         pct: 22, color: 'bg-[#c5a059]' },
  { source: 'Referral',       pct: 17, color: 'bg-blue-500' },
  { source: 'Social Media',   pct: 13, color: 'bg-slate-400' },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">Business Analytics</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-2xl font-black text-slate-900">{m.value}</p>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{m.label}</p>
            <p className={`text-[10px] font-black mt-3 uppercase tracking-widest ${m.up ? 'text-emerald-500' : 'text-red-400'}`}>
              {m.change} growth
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top pages */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-8">Popular Pages</h3>
          <div className="space-y-4">
            {topPages.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                  <span className="text-[#c5a059]">{p.page}</span>
                  <span>{p.views.toLocaleString()} visits</span>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#c5a059] to-amber-200 transition-all duration-700"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-8">Traffic Stats</h3>
          <div className="space-y-4">
            {traffic.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                  <span>{t.source}</span><span>{t.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Device Usage</h4>
            <div className="space-y-2 text-sm">
              {[{ d: 'Desktop', v: '58%' }, { d: 'Mobile', v: '35%' }, { d: 'Tablet', v: '7%' }].map((d, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-600">
                  <span>{d.d}</span><span className="font-bold text-[#051a2c]">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly chart */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-8 px-2">Loan Activity — 2026</h3>
        <div className="flex items-end gap-4 h-40">
          {[
            { m: 'Jan', apps: 70, appr: 48 },
            { m: 'Feb', apps: 85, appr: 60 },
            { m: 'Mar', apps: 60, appr: 42 },
            { m: 'Apr', apps: 95, appr: 70 },
            { m: 'May', apps: 78, appr: 55 },
            { m: 'Jun', apps: 88, appr: 65 },
          ].map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full flex gap-1.5 items-end">
                <div className="flex-1 bg-gray-100 rounded-t-lg transition-all duration-500 hover:bg-[#c5a059]/20" style={{ height: `${d.apps * 1.5}px` }} />
                <div className="flex-1 bg-[#c5a059] rounded-t-lg transition-all duration-500 hover:scale-y-110 origin-bottom" style={{ height: `${d.appr * 1.5}px` }} />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{d.m}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-8 mt-10 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-lg bg-gray-200" /> Applications</div>
          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-lg bg-[#c5a059]" /> Approvals</div>
        </div>
      </div>
    </div>
  );
}
