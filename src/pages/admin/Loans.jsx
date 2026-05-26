import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import api from "../../api";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [activeLoan, setActiveLoan] = useState(null);
  const [stage, setStage] = useState('');
  const [level, setLevel] = useState(0);

  const load = () => api.get('/admin/active-loans').then((res) => setLoans(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const markDisbursed = async (id) => {
    await api.patch(`/admin/active-loans/${id}/disburse`, { disbursement_method: 'Bank Transfer', transfer_reference: `TRX-${Date.now()}` });
    load();
  };

  const updateProgress = async () => {
    if (!activeLoan) return;
    await api.patch(`/admin/active-loans/${activeLoan}/progress`, {
      progress_stage: stage,
      progress_level: level
    });
    setActiveLoan(null);
    load();
  };

  const generateCodes = async () => {
    if (!activeLoan) return;
    await api.post(`/admin/active-loans/${activeLoan}/generate-codes`);
    setActiveLoan(null);
    load();
  };

  const columns = [
    { header: "Loan ID", accessor: "id" },
    { header: "Borrower", accessor: "borrower" },
    { header: "Principal", render: (r) => `$${r.principal.toLocaleString()}` },
    { header: "Progress", render: (r) => (
      <div>
        <div className="text-sm">{r.progressStage || 'Pending'} ({r.progressLevel || 0}%)</div>
        {r.codesRequested && <Badge type="warning">Codes Requested</Badge>}
        {r.approvalCode && <div className="text-[10px] text-slate-400 font-mono mt-1">{r.approvalCode} | {r.trackingCode}</div>}
      </div>
    )},
    { header: "Status", render: (r) => <Badge type={r.status === "Overdue" ? "danger" : "success"}>{r.status}</Badge> },
    { header: "Disbursement", render: (r) => r.disbursed ? `${r.disbursementMethod} (${r.transferRef})` : "Pending" },
    { header: "Action", render: (r) => (
      <div className="flex gap-2">
        {!r.disbursed && <button onClick={() => markDisbursed(r.rawId)} className="text-emerald-300 text-xs hover:text-emerald-100">Disburse</button>}
        <button onClick={() => { 
          setActiveLoan(r.rawId); 
          setStage(r.progressStage || 'Pending Requirements'); 
          setLevel(r.progressLevel || 20); 
          setActiveLoanData(r);
        }} className="text-indigo-300 text-xs hover:text-indigo-100">Update Progress</button>
      </div>
    )},
  ];

  const [activeLoanData, setActiveLoanData] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Loan Disbursement & Active Loans</h1>
      <Card><Table columns={columns} data={loans} /></Card>

      {activeLoan && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">Update Loan Progress</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Progress Stage</label>
                <input type="text" value={stage} onChange={e => setStage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Progress Level ({level}%)</label>
                <input type="range" min="0" max="100" step="5" value={level} onChange={e => setLevel(parseInt(e.target.value))} className="w-full accent-indigo-500" />
              </div>

              {activeLoanData?.codesRequested && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                   <p className="text-xs text-amber-500 font-medium mb-3">Borrower has requested authorization codes for this loan.</p>
                   <button onClick={generateCodes} className="w-full py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-400 transition-all">GENERATE CODES NOW</button>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={() => setActiveLoan(null)} className="flex-1 py-2 rounded-xl border border-white/10 text-white text-sm hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={updateProgress} className="flex-1 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-all">Save Progress</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
