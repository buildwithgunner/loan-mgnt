import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUser, FaKey, FaBolt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function AdminRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", invite_code: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { registerAdmin } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 8) return setError('Password must be at least 8 characters');
    
    setIsSubmitting(true);
    try {
      await registerAdmin({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
        invite_code: form.invite_code,
      });
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.message || 'Admin signup failed. Please check your invitation code.');
      setIsSubmitting(false);
    }
  };

  const inputContainerStyle = (field) => ({
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.03)",
    border: `1px solid ${focusedField === field ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
    borderRadius: 14,
    height: 52,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: focusedField === field ? "0 0 0 4px rgba(99, 102, 241, 0.1)" : "none",
  });

  const iconStyle = (field) => ({
    width: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: focusedField === field ? "#818cf8" : "#475569",
    transition: "color 0.3s",
    fontSize: 14,
  });

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      background: "#030712",
      backgroundImage: "radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.1), transparent 50%), radial-gradient(circle at 90% 90%, rgba(34, 211, 238, 0.05), transparent 50%)",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 480, animation: "fadeUp 0.8s ease" }}>
        
        {/* Brand Header */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
            }}>
              <FaBolt style={{ color: "white", fontSize: 18 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.8px" }}>
                Swift<span style={{ color: "#818cf8" }}>Loan</span>
              </span>
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "#64748b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 5, padding: "2px 8px",
                background: "rgba(255,255,255,0.02)",
              }}>Admin</span>
            </div>
          </Link>
        </div>

        {/* Register Card */}
        <div style={{
          background: "rgba(15, 17, 26, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32,
          padding: "2.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top subtle highlight */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }} />

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "white", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
              Admin Onboarding
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: "1.6" }}>
              Create an administrative account with a valid invite code.
            </p>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>Full Name</label>
              <div style={inputContainerStyle('name')}>
                <div style={iconStyle('name')}><FaUser /></div>
                <input 
                  placeholder="e.g. Sarah Jenkins" 
                  value={form.name} 
                  onChange={(e)=>setForm({...form,name:e.target.value})} 
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required disabled={isSubmitting}
                  style={{ flex: 1, height: "100%", border: "none", background: "transparent", color: "white", fontSize: 14, outline: "none", paddingRight: 16 }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>Work Email</label>
              <div style={inputContainerStyle('email')}>
                <div style={iconStyle('email')}><FaEnvelope /></div>
                <input 
                  type="email" 
                  placeholder="s.jenkins@swiftloan.io" 
                  value={form.email} 
                  onChange={(e)=>setForm({...form,email:e.target.value})} 
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required disabled={isSubmitting}
                  style={{ flex: 1, height: "100%", border: "none", background: "transparent", color: "white", fontSize: 14, outline: "none", paddingRight: 16 }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>Invite Code</label>
              <div style={inputContainerStyle('invite')}>
                <div style={iconStyle('invite')}><FaKey /></div>
                <input 
                  placeholder="Enter code" 
                  value={form.invite_code} 
                  onChange={(e)=>setForm({...form,invite_code:e.target.value})} 
                  onFocus={() => setFocusedField('invite')}
                  onBlur={() => setFocusedField(null)}
                  required disabled={isSubmitting}
                  style={{ flex: 1, height: "100%", border: "none", background: "transparent", color: "white", fontSize: 14, outline: "none", paddingRight: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>Password</label>
                <div style={inputContainerStyle('password')}>
                  <div style={iconStyle('password')}><FaLock /></div>
                  <input 
                    type={showPassword ? "text" : "password"} placeholder="••••••••" 
                    value={form.password} 
                    onChange={(e)=>setForm({...form,password:e.target.value})} 
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required disabled={isSubmitting}
                    style={{ flex: 1, height: "100%", border: "none", background: "transparent", color: "white", fontSize: 14, outline: "none", paddingRight: 8 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: "none", border: "none", color: "#475569", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>Confirm</label>
                <div style={inputContainerStyle('confirm')}>
                  <div style={iconStyle('confirm')}><FaLock /></div>
                  <input 
                    type={showConfirm ? "text" : "password"} placeholder="••••••••" 
                    value={form.confirm} 
                    onChange={(e)=>setForm({...form,confirm:e.target.value})} 
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    required disabled={isSubmitting}
                    style={{ flex: 1, height: "100%", border: "none", background: "transparent", color: "white", fontSize: 14, outline: "none", paddingRight: 8 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{ background: "none", border: "none", color: "#475569", padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    {showConfirm ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171", fontSize: 12, padding: "12px 16px", borderRadius: 12, marginTop: 4 }}>
                {error}
              </div>
            )}

            <button 
              type="submit" disabled={isSubmitting}
              style={{ height: 52, borderRadius: 14, marginTop: 8, background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: isSubmitting ? 0.8 : 1, transition: "all 0.3s" }}
            >
              {isSubmitting ? <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : "Create Account"}
            </button>
          </form>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "2rem", paddingTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              Already have access? <Link to="/admin/login" style={{ color: "#818cf8", fontWeight: 800, textDecoration: "none" }}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}

