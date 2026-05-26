import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBolt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const nextUser = await login(form);
      navigate(nextUser?.is_admin ? "/admin" : "/dashboard");
    } catch {
      setError("Invalid login details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8"><Link to="/" className="inline-flex items-center gap-2.5 no-underline"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30"><FaBolt className="text-white" /></div><span className="text-2xl font-black text-white">Swift<span className="gradient-text">Loan</span></span></Link><h1 className="text-2xl font-black text-white mt-6 mb-1">Welcome back</h1></div>
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
          <div><label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label><div className="relative"><FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="swift-input pl-10" /></div></div>
          <div><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label><div className="relative mt-2"><FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" /><input type={showPass ? "text" : "password"} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="swift-input pl-10 pr-10" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">{showPass ? <FaEyeSlash /> : <FaEye />}</button></div></div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              checked={form.remember} 
              onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} 
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer select-none">Remember this device</label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-70">{loading ? "Signing in..." : <><span>Sign In</span> <FaArrowRight /></>}</button>
        </form>
        <p className="text-center text-slate-400 text-sm mt-6">Don't have an account? <Link to="/register" className="text-indigo-400 font-semibold">Create one free</Link></p>
        <div className="flex items-center justify-center gap-2 text-slate-600 text-xs mt-6"><FaShieldAlt className="text-emerald-600" /><span>256-bit SSL encrypted</span></div>
      </div>
    </div>
  );
}
