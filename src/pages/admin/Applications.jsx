import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import api from "../../api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const load = () => api.get('/admin/applications').then((res) => setApplications(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const mutateStatus = async (id, status) => {
    await api.patch(`/admin/applications/${id}`, { status });
    load();
  };

  const columns = [
    { header: "Application", accessor: "id" },
    { header: "Borrower", accessor: "borrower" },
    { header: "Requested", render: (r) => `$${r.amount.toLocaleString()}` },
    { header: "Duration", accessor: "duration" },
    { header: "Purpose", accessor: "purpose" },
    { header: "Status", render: (r) => <Badge type={r.status === "Pending" ? "warning" : r.status === "Rejected" ? "danger" : "success"}>{r.status}</Badge> },
    { header: "Actions", render: (r) => <div className="flex gap-2 text-xs"><button onClick={() => mutateStatus(r.rawId, "Approved")} className="text-emerald-300">Approve</button><button onClick={() => mutateStatus(r.rawId, "Rejected")} className="text-red-300">Reject</button><button onClick={() => mutateStatus(r.rawId, "More Info Requested")} className="text-amber-300">Request Info</button><button onClick={() => mutateStatus(r.rawId, "Edited Terms")} className="text-indigo-300">Edit Terms</button></div> },
  ];

  return <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Loan Applications</h1><Card><Table columns={columns} data={applications} /></Card></div>;
}
