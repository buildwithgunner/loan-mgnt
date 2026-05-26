import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import {
  FaBolt, FaTachometerAlt, FaMoneyBillWave, FaFileAlt, FaHistory,
  FaUser, FaBell, FaCog, FaSignOutAlt, FaBars, FaTimes,
  FaCheckCircle, FaClock, FaArrowRight,
  FaUpload, FaDownload, FaChartLine, FaShieldAlt,
} from "react-icons/fa";

/* ─── Mock data ─── */
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "J",
  memberSince: "Jan 2026",
  creditScore: 742,
};

const mockStats = [
  { label: "Active Loans", value: "2", icon: <FaMoneyBillWave />, color: "#6366f1", sub: "Total balance: $17,000" },
  { label: "Available Credit", value: "$33,000", icon: <FaChartLine />, color: "#22d3ee", sub: "Of $50,000 limit" },
  { label: "Next Payment", value: "May 15", icon: <FaClock />, color: "#f59e0b", sub: "$412.00 due" },
  { label: "Credit Score", value: "742", icon: <FaShieldAlt />, color: "#10b981", sub: "Good standing ↑" },
];

// mockLoans replaced by API

const mockActivity = [
  { type: "payment", text: "Payment of $420.83 processed for L-1001", time: "2 days ago", icon: <FaCheckCircle />, color: "text-emerald-400" },
  { type: "approved", text: "Business loan L-1002 approved for $12,000", time: "1 week ago", icon: <FaCheckCircle />, color: "text-indigo-400" },
  { type: "applied", text: "Application submitted for personal loan", time: "2 weeks ago", icon: <FaClock />, color: "text-amber-400" },
];

const navItems = [
  { id: "overview",    label: "Overview",       icon: <FaTachometerAlt /> },
  { id: "my-loans",    label: "My Loans",        icon: <FaMoneyBillWave /> },
  { id: "apply",       label: "Apply for Loan",  icon: <FaFileAlt /> },
  { id: "activity",    label: "Activity",        icon: <FaHistory /> },
  { id: "profile",     label: "Profile",         icon: <FaUser /> },
  { id: "settings",    label: "Settings",        icon: <FaCog /> },
];

/* ─── Sub-page components ─── */

function Overview({ setTab, loans }) {
  return (
    <div className="space-y-8 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      {/* Welcome banner */}
      <div className="relative rounded-2xl p-7 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(34,211,238,0.12) 100%)", border: "1px solid rgba(99,102,241,0.3)" }}>
        <div className="absolute right-6 top-6 w-32 h-32 rounded-full opacity-10 bg-indigo-400 blur-2xl" />
        <h2 className="text-2xl font-black text-white mb-1">Welcome back, {mockUser.name.split(" ")[0]} 👋</h2>
        <p className="text-slate-400 text-sm mb-5">Here's a summary of your account activity. Everything looks healthy.</p>
        <button onClick={() => setTab("apply")} className="btn-primary text-sm py-2.5 px-6 flex items-center gap-2 w-fit">
          Apply for New Loan <FaArrowRight />
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {mockStats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base" style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</div>
              <span className="text-2xl font-black text-white">{s.value}</span>
            </div>
            <p className="text-xs font-semibold text-slate-300 mb-1">{s.label}</p>
            <p className="text-xs text-slate-500">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Active loans preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Active Loans</h3>
          <button onClick={() => setTab("my-loans")} className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">
            View all <FaArrowRight className="text-xs" />
          </button>
        </div>
        <div className="space-y-4">
          {loans.map(loan => (
            <div key={loan.id} className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <FaMoneyBillWave />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="text-white font-semibold text-sm">{loan.type}</span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">{loan.id}</span>
                  <span className="badge-active text-[10px] font-bold px-2.5 py-0.5 rounded-full">{loan.status}</span>
                </div>
                <div className="flex gap-4 text-xs text-slate-500 flex-wrap">
                  <span>Amount: <span className="text-slate-300 font-medium">{loan.amount}</span></span>
                  <span>Rate: <span className="text-slate-300 font-medium">{loan.rate}</span></span>
                  <span>Next: <span className="text-amber-400 font-medium">{loan.nextAmt} on {loan.next}</span></span>
                </div>
                <div className="mt-3 progress-bar">
                  <div className="progress-fill" style={{ width: `${loan.progressLevel}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-medium">
                  <span className="text-indigo-400">{loan.progressStage}</span>
                  <span>{loan.progressLevel}%</span>
                </div>
                {loan.approvalCode && (
                  <div className="mt-3 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Auth Codes:</span>
                    <span className="text-[10px] font-mono text-white">{loan.approvalCode} | {loan.trackingCode}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
        <div className="glass-card rounded-2xl divide-y divide-white/[0.05]">
          {mockActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className={`text-base ${a.color}`}>{a.icon}</div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm font-medium">{a.text}</p>
                <p className="text-slate-600 text-xs mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyLoans({ loans, requestCodes }) {
  return (
    <div className="space-y-6 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      <div>
        <h2 className="text-2xl font-black text-white mb-1">My Loans</h2>
        <p className="text-slate-400 text-sm">Track all your active and past loans.</p>
      </div>
      <div className="space-y-5">
        {loans.map(loan => (
          <div key={loan.id} className="glass-card rounded-2xl p-7">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <h3 className="text-white font-bold text-lg">{loan.type}</h3>
                  <span className="badge-active text-xs font-bold px-3 py-1 rounded-full">{loan.status}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Loan ID", value: loan.id },
                    { label: "Amount", value: loan.amount },
                    { label: "Rate", value: loan.rate },
                    { label: "Term", value: loan.term },
                  ].map(f => (
                    <div key={f.label}>
                      <p className="text-slate-500 text-xs mb-1">{f.label}</p>
                      <p className="text-white font-semibold text-sm">{f.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{loan.progressStage}</span>
                  <span className="text-indigo-400 font-semibold">{loan.progressLevel}%</span>
                </div>
                <div className="progress-bar mb-4">
                  <div className="progress-fill" style={{ width: `${loan.progressLevel}%` }} />
                </div>
                <div className="flex items-center gap-2 text-sm mb-5">
                  <FaClock className="text-amber-400" />
                  <span className="text-slate-400">Next payment: <span className="text-white font-semibold">{loan.nextAmt}</span> on {loan.next}</span>
                </div>

                {loan.approvalCode ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Authorization Codes Active</p>
                      <p className="text-sm font-mono text-white">{loan.approvalCode} — {loan.trackingCode}</p>
                    </div>
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                  </div>
                ) : loan.codesRequested ? (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Codes Requested</p>
                      <p className="text-xs text-slate-400">Awaiting administrative approval. You will be notified shortly.</p>
                    </div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                    <p className="text-xs text-slate-300 mb-3">To proceed with higher levels of processing and final disbursement, you must request your one-time authorization codes.</p>
                    <button 
                      onClick={() => requestCodes(loan.rawId)}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
                    >
                      REQUEST AUTHORIZATION CODES <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <button className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2">
                  <FaDownload /> Make Payment
                </button>
                <button className="btn-outline text-xs py-2.5 px-5">View Statement</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplyLoanForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ loanType: "Personal Loan", amount: "", term: "12", purpose: "", fullName: "", email: "", phone: "" });

  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const monthly = form.amount ? ((Number(form.amount) * 1.05) / Number(form.term)).toFixed(2) : "0.00";

  return (
    <div className="max-w-2xl animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-1">Apply for a Loan</h2>
        <p className="text-slate-400 text-sm">Complete the form below. No impact on your credit score to check your rate.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {["Loan Details", "Personal Info", "Review"].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === i + 1 ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : step > i + 1 ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-500"}`}>
              {step > i + 1 ? <FaCheckCircle /> : i + 1}
            </div>
            <span className="text-xs font-medium hidden sm:block" style={{ color: step === i + 1 ? "#a5b4fc" : step > i + 1 ? "#4ade80" : "#64748b" }}>{s}</span>
            {i < 2 && <div className="w-8 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Loan Type</label>
              <select value={form.loanType} onChange={e => updateForm("loanType", e.target.value)} className="swift-input">
                {["Personal Loan", "Business Loan", "Real Estate", "Swift Cash", "Equity Release"].map(t => (
                  <option key={t} value={t} className="bg-gray-900">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Loan Amount ($)</label>
              <input type="number" value={form.amount} onChange={e => updateForm("amount", e.target.value)} placeholder="e.g. 10000" className="swift-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Repayment Term</label>
              <select value={form.term} onChange={e => updateForm("term", e.target.value)} className="swift-input">
                {["6", "12", "24", "36", "48", "60"].map(t => (
                  <option key={t} value={t} className="bg-gray-900">{t} months</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Purpose</label>
              <textarea value={form.purpose} onChange={e => updateForm("purpose", e.target.value)} placeholder="Briefly describe why you need this loan..." className="swift-input h-24 resize-none" />
            </div>
            {form.amount && (
              <div className="glass-strong rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Estimated Monthly Payment</p>
                  <p className="text-2xl font-black text-indigo-400">${monthly}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Over {form.term} months</p>
                  <p className="text-sm font-semibold text-slate-300">at ~5% APR</p>
                </div>
              </div>
            )}
            <button onClick={() => setStep(2)} disabled={!form.amount} className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
              Continue <FaArrowRight />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {[
              { label: "Full Name", field: "fullName", type: "text", placeholder: "John Doe" },
              { label: "Email Address", field: "email", type: "email", placeholder: "john@example.com" },
              { label: "Phone Number", field: "phone", type: "tel", placeholder: "+1 234-567-8900" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                <input type={type} value={form[field]} onChange={e => updateForm(field, e.target.value)} placeholder={placeholder} className="swift-input" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ID Document</label>
              <label className="swift-input cursor-pointer flex items-center gap-3 text-slate-400 hover:border-indigo-500/50 transition-colors">
                <FaUpload className="text-indigo-400" />
                <span className="text-sm">Click to upload passport or driver's license</span>
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1 py-3">Back</button>
              <button onClick={() => setStep(3)} disabled={!form.fullName || !form.email} className="btn-primary flex-1 py-3 disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg">Review & Submit</h3>
            <div className="space-y-3">
              {[
                ["Loan Type", form.loanType],
                ["Amount", `$${Number(form.amount).toLocaleString()}`],
                ["Term", `${form.term} months`],
                ["Est. Monthly", `$${monthly}`],
                ["Name", form.fullName],
                ["Email", form.email],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                  <span className="text-slate-400 text-sm">{k}</span>
                  <span className="text-white text-sm font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3 glass-strong rounded-xl p-4">
              <FaShieldAlt className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                By submitting, you agree to our Terms of Service and authorize SwiftLoan to perform a soft credit check (no impact on your score).
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-outline flex-1 py-3">Back</button>
              <button onClick={() => setStep(4)} className="btn-primary flex-1 py-3">Submit Application</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto border border-emerald-500/30">
              <FaCheckCircle className="text-emerald-400 text-3xl" />
            </div>
            <h3 className="text-white font-black text-2xl">Application Submitted!</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
              Our team is reviewing your application. You'll receive a decision via email within 24 hours.
            </p>
            <div className="glass-strong rounded-xl p-4">
              <p className="text-xs text-slate-400">Reference Number</p>
              <p className="text-indigo-400 font-mono font-bold text-lg">SWL-728451</p>
            </div>
            <button onClick={() => setStep(1)} className="btn-outline text-sm py-2.5 px-6 mx-auto">Submit Another Application</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Activity() {
  const all = [
    ...mockActivity,
    { type: "info", text: "Account created successfully", time: "3 weeks ago", icon: <FaCheckCircle />, color: "text-cyan-400" },
    { type: "warning", text: "Loan application submitted for review", time: "3 weeks ago", icon: <FaClock />, color: "text-amber-400" },
  ];
  return (
    <div className="space-y-6 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Activity History</h2>
        <p className="text-slate-400 text-sm">Full log of all your account activity.</p>
      </div>
      <div className="glass-card rounded-2xl divide-y divide-white/[0.05]">
        {all.map((a, i) => (
          <div key={i} className="flex items-center gap-4 p-5 table-row-hover transition-colors">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${a.color} bg-white/[0.04] flex-shrink-0`}>{a.icon}</div>
            <div className="flex-1">
              <p className="text-slate-200 text-sm font-medium">{a.text}</p>
              <p className="text-slate-600 text-xs mt-0.5">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-6 max-w-2xl animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      <div>
        <h2 className="text-2xl font-black text-white mb-1">My Profile</h2>
        <p className="text-slate-400 text-sm">Manage your personal information and account settings.</p>
      </div>
      <div className="glass-card rounded-2xl p-7">
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/[0.06]">
          <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-indigo-500/20">
            {mockUser.avatar}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{mockUser.name}</h3>
            <p className="text-slate-400 text-sm">{mockUser.email}</p>
            <p className="text-slate-600 text-xs mt-1">Member since {mockUser.memberSince}</p>
          </div>
        </div>
        <div className="space-y-5">
          {[
            { label: "Full Name", value: mockUser.name, type: "text" },
            { label: "Email", value: mockUser.email, type: "email" },
            { label: "Phone", value: "+1 234-567-8901", type: "tel" },
            { label: "Address", value: "123 Main St, New York, NY 10001", type: "text" },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{f.label}</label>
              <input type={f.type} defaultValue={f.value} className="swift-input" />
            </div>
          ))}
          <button className="btn-primary py-3 px-8 text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const toggles = [
    { label: "Email Notifications", desc: "Get loan updates and payment reminders via email", checked: true },
    { label: "SMS Alerts", desc: "Receive real-time alerts on your mobile", checked: false },
    { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", checked: true },
    { label: "Marketing Emails", desc: "Receive offers and product updates from SwiftLoan", checked: false },
  ];
  return (
    <div className="space-y-6 max-w-2xl animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Settings</h2>
        <p className="text-slate-400 text-sm">Manage your account preferences and security.</p>
      </div>
      <div className="glass-card rounded-2xl divide-y divide-white/[0.05]">
        {toggles.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-5">
            <div>
              <p className="text-slate-200 text-sm font-semibold">{t.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{t.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
              <input type="checkbox" defaultChecked={t.checked} className="sr-only peer" />
              <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
            </label>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-7 border border-red-500/10">
        <h3 className="text-red-400 font-bold mb-2">Danger Zone</h3>
        <p className="text-slate-400 text-sm mb-4">Once you close your account, there's no going back. All data will be permanently deleted.</p>
        <button className="text-red-400 border border-red-500/30 rounded-xl px-5 py-2 text-sm font-semibold hover:bg-red-500/10 transition-colors">
          Close Account
        </button>
      </div>
    </div>
  );
}

/* ─── Main User Dashboard ─── */
export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const { logout } = useAuth();

  const fetchLoans = () => {
    api.get("/loans").then(res => {
      const mapped = res.data.map(l => ({
        id: l.id,
        type: "Personal Loan",
        amount: "$" + Number(l.amount).toLocaleString(),
        rate: l.interestRate,
        term: l.duration,
        status: l.status,
        progressLevel: l.progressLevel,
        progressStage: l.progressStage || 'Pending Requirements',
        approvalCode: l.approvalCode,
        trackingCode: l.trackingCode,
        codesRequested: l.codesRequested,
        rawId: l.id,
        next: l.nextPaymentDate,
        nextAmt: "$420.00"
      }));
      setLoans(mapped);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const requestCodes = async (id) => {
    try {
      await api.post(`/loans/${id}/request-codes`);
      fetchLoans();
    } catch (error) {
      console.error(error);
    }
  };

  const unread = 3;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":  return <Overview setTab={setActiveTab} loans={loans} />;
      case "my-loans":  return <MyLoans loans={loans} requestCodes={requestCodes} />;
      case "apply":     return <ApplyLoanForm />;
      case "activity":  return <Activity />;
      case "profile":   return <Profile />;
      case "settings":  return <Settings />;
      default:          return <Overview setTab={setActiveTab} loans={loans} />;
    }
  };

  return (
    <div className="bg-transparent min-h-screen flex font-['Inter'] relative z-10">

      {/* ─── SIDEBAR ─── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col glass border-r border-white/[0.06] transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <FaBolt className="text-white text-sm" />
            </div>
            <span className="text-lg font-black text-white">Swift<span className="gradient-text">Loan</span></span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Menu</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${activeTab === item.id ? "nav-active text-indigo-300" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User profile bottom */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {mockUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{mockUser.name}</p>
              <p className="text-slate-500 text-xs truncate">{mockUser.email}</p>
            </div>
          </div>
          <button onClick={async () => { await logout(); navigate("/login"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/[0.05] transition-all mt-1">
              <FaSignOutAlt /> Sign Out
            </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* Top Navbar */}
        <header className="sticky top-0 z-20 glass border-b border-white/[0.06] h-16 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
            <div>
              <h1 className="text-white font-bold text-base capitalize">
                {navItems.find(n => n.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <FaBell className="text-sm" />
              </button>
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unread}
                </span>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              {mockUser.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}



