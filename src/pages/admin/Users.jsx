import { useMemo, useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import api from "../../api";

export default function Users() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  const load = () => api.get('/admin/borrowers').then((res) => setList(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const rows = useMemo(() => list.filter((b) => {
    const q = query.toLowerCase();
    return b.name.toLowerCase().includes(q) || (b.phone || '').toLowerCase().includes(q) || b.email.toLowerCase().includes(q);
  }), [list, query]);

  const columns = [
    { header: "Borrower", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Status", render: (r) => <Badge type={r.blacklisted ? "danger" : r.suspended ? "warning" : "success"}>{r.blacklisted ? "Blacklisted" : r.suspended ? "Suspended" : "Active"}</Badge> },
    { header: "Action", render: (r) => <button onClick={() => setSelected(r)} className="text-indigo-300">View Profile</button> },
  ];

  const toggle = async (borrower, payload) => {
    await api.patch(`/admin/borrowers/${borrower.rawId}`, payload);
    await load();
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Borrower Management</h1>
      <Card>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone, or email" className="mb-4 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-white" />
        <Table columns={columns} data={rows} />
      </Card>

      <Modal open={!!selected} title={selected ? `${selected.name} Profile` : "Profile"} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4 text-slate-200">
            <p><strong>ID:</strong> {selected.id}</p>
            <p><strong>Documents:</strong> {selected.documents.join(", ")}</p>
            <p><strong>Guarantor:</strong> {selected.guarantor ? `${selected.guarantor.name} (${selected.guarantor.phone})` : "None"}</p>
            <div>{selected.loanHistory.map((l) => <p key={l.id}>{l.id} - ${l.principal.toLocaleString()} - {l.status}</p>)}</div>
            <div className="flex gap-3">
              <button onClick={() => toggle(selected, { is_blacklisted: !selected.blacklisted })} className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white">{selected.blacklisted ? "Remove Blacklist" : "Blacklist"}</button>
              <button onClick={() => toggle(selected, { is_suspended: !selected.suspended })} className="rounded-lg bg-amber-600 px-3 py-2 text-sm text-white">{selected.suspended ? "Activate" : "Suspend Account"}</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
