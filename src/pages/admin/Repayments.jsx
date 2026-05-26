import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import api from "../../api";

export default function Repayments() {
  const [items, setItems] = useState([]);
  const [lateFeesEnabled, setLateFeesEnabled] = useState(true);
  const load = () => api.get('/admin/repayments').then((res) => setItems(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const addPartial = async (id) => {
    await api.patch(`/admin/repayments/${id}/pay`, { amount: 200 });
    load();
  };

  const columns = [
    { header: "Payment", accessor: "id" },
    { header: "Loan", accessor: "loanId" },
    { header: "Due Date", accessor: "dueDate" },
    { header: "Amount Due", render: (r) => `$${r.amountDue.toLocaleString()}` },
    { header: "Paid", render: (r) => `$${r.paidAmount.toLocaleString()}` },
    { header: "Outstanding", render: (r) => `$${(r.amountDue - r.paidAmount + (lateFeesEnabled && r.status === "Unpaid" ? 50 : 0)).toLocaleString()}` },
    { header: "Status", render: (r) => <Badge type={r.status === "Paid" ? "success" : r.status === "Partial" ? "warning" : "danger"}>{r.status}</Badge> },
    { header: "Action", render: (r) => <button onClick={() => addPartial(r.rawId)} className="text-indigo-300">Record Partial</button> },
  ];

  return <div className="space-y-6"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-white">Repayment Tracking</h1><button onClick={() => setLateFeesEnabled((v) => !v)} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">Auto Late Fee: {lateFeesEnabled ? "On" : "Off"}</button></div><Card><Table columns={columns} data={items} /></Card></div>;
}
