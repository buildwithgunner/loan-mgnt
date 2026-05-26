import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBolt, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false, remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const nextUser = await register({ 
        name: form.name, 
        email: form.email, 
        password: form.password, 
        password_confirmation: form.confirm,
        remember: form.remember
      });
      navigate(nextUser?.is_admin ? "/admin" : "/dashboard");
    } catch {
      setError("Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="relative z-10 w-full max-w-xl">
        <div className="mb-6 text-center"><Link to="/" className="inline-flex items-center gap-2.5 no-underline"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><FaBolt className="text-white text-sm" /></div><span className="text-xl font-black text-white">Swift<span className="gradient-text">Loan</span></span></Link></div>
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 space-y-5">
          <div className="relative"><FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full Name" className="swift-input pl-10" /></div>
          <div className="relative"><FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" className="swift-input pl-10" /></div>
          <div className="relative"><FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type={showPass ? "text" : "password"} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Password" className="swift-input pl-10 pr-10" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">{showPass ? <FaEyeSlash /> : <FaEye />}</button></div>
          <div className="relative"><FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type="password" required value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Confirm Password" className="swift-input pl-10" /></div>
          <div className="flex flex-col gap-3">
            <label className="text-xs text-slate-400 flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} required className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" /> 
              <span>I agree to terms</span>
            </label>
            <label className="text-xs text-slate-400 flex gap-2 items-center cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" /> 
              <span>Remember this device</span>
            </label>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading || !form.agree} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-70">{loading ? "Creating account..." : <><span>Create Account</span> <FaArrowRight /></>}</button>
          <p className="text-center text-slate-400 text-sm">Already have an account? <Link to="/login" className="text-indigo-400 font-semibold">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}
