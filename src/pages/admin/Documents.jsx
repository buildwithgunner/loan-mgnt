import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import api from "../../api";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => { api.get('/admin/documents').then((res) => setDocuments(res.data)).catch(console.error); }, []);

  const columns = [
    { header: "Document", accessor: "fileName" },
    { header: "Type", accessor: "type" },
    { header: "Borrower", accessor: "borrower" },
    { header: "Actions", render: () => <div className="flex gap-3"><button className="text-indigo-300">Preview</button><button className="text-emerald-300">Download</button></div> },
  ];

  return <div className="space-y-6"><h1 className="text-2xl font-bold text-white">Documents Center</h1><Card><Table columns={columns} data={documents} /></Card></div>;
}
