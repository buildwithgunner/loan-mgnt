import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import api from "../../api";

export default function Security() {
  const [staff, setStaff] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/admin/security').then((res) => {
      setStaff(res.data.staff || []);
      setLogs(res.data.logs || []);
    }).catch(console.error);
  }, []);

  const staffCols = [
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "2FA", render: (r) => (r.twoFactor ? "Enabled" : "Disabled") },
    { header: "Last Login", accessor: "lastLogin" },
  ];

  const logCols = [
    { header: "Time", accessor: "time" },
    { header: "Actor", accessor: "actor" },
    { header: "Activity", accessor: "action" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Security & Staff Access</h1>
      <Card title="Staff Accounts and Roles"><Table columns={staffCols} data={staff} /></Card>
      <Card title="Activity Logs"><Table columns={logCols} data={logs} /></Card>
    </div>
  );
}
