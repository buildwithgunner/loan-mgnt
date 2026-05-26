import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import api from "../../api";

export default function Settings() {
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get('/admin/settings').then((res) => setForm(res.data)).catch(console.error);
  }, []);

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const save = async () => {
    await api.patch('/admin/settings', form);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.businessName || ''} onChange={(e) => onChange("businessName", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="Business name" />
          <input value={form.logo || ''} onChange={(e) => onChange("logo", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="Company logo" />
          <input value={form.defaultInterestRate || ''} onChange={(e) => onChange("defaultInterestRate", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="Interest rate defaults" />
          <input value={form.durationPresets || ''} onChange={(e) => onChange("durationPresets", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="Loan duration presets" />
          <input value={form.smsProvider || ''} onChange={(e) => onChange("smsProvider", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="SMS settings" />
          <input value={form.emailFrom || ''} onChange={(e) => onChange("emailFrom", e.target.value)} className="rounded-xl border border-white/20 bg-black/30 p-2 text-white" placeholder="Email settings" />
        </div>
        <button onClick={save} className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-white">Save Settings</button>
      </Card>
    </div>
  );
}
