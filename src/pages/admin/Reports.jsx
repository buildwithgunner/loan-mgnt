import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import api from "../../api";

export default function Reports() {
  const [data, setData] = useState({ topBorrowers: [], defaulters: [] });
  useEffect(() => { api.get('/admin/reports').then((res) => setData(res.data)).catch(console.error); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Reports</h1>
      <Card title="Exports"><div className="flex flex-wrap gap-3"><button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Export CSV</button><button className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white">Export Excel</button><button className="rounded-lg bg-rose-600 px-3 py-2 text-sm text-white">Export PDF</button></div></Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Card title="Top Borrowers">{data.topBorrowers.map((b) => <p key={b}>{b}</p>)}</Card><Card title="Defaulters List">{data.defaulters.map((d) => <p key={d}>{d}</p>)}</Card></div>
    </div>
  );
}
