import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import api from "../../api";

export default function Guarantors() {
  const [guarantors, setGuarantors] = useState([]);
  useEffect(() => { api.get('/admin/guarantors').then((res) => setGuarantors(res.data)).catch(console.error); }, []);

  const columns = [
    { header: "Guarantor", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Address", accessor: "address" },
    { header: "Linked Loans", render: (r) => r.linkedLoans.length ? r.linkedLoans.join(", ") : "None" },
  ];

  return <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Guarantor Management</h1><Card><Table columns={columns} data={guarantors} /></Card></div>;
}
