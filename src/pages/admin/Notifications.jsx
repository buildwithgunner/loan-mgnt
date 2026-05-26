import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import api from "../../api";

export default function Notifications() {
  const [logs, setLogs] = useState([]);

  const load = () => api.get('/admin/notifications').then((res) => setLogs(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const send = async (channel, message) => {
    await api.post('/admin/notifications', { channel, message });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Reminders & Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><button onClick={() => send('SMS', 'Due today alerts sent')} className="w-full rounded-lg bg-indigo-600 py-2 text-white">Send SMS Reminders</button></Card>
        <Card><button onClick={() => send('Email', 'Overdue borrower alerts sent')} className="w-full rounded-lg bg-emerald-600 py-2 text-white">Send Email Reminders</button></Card>
        <Card><button onClick={() => send('WhatsApp', 'WhatsApp notification links generated')} className="w-full rounded-lg bg-green-700 py-2 text-white">Create WhatsApp Links</button></Card>
      </div>
      <Card title="Alert Log">
        <div className="space-y-2 text-slate-200">{logs.map((l) => <p key={l.id}>{l.channel}: {l.message}</p>)}</div>
      </Card>
    </div>
  );
}
