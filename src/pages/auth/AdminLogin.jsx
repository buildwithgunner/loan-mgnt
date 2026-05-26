import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUserShield, FaArrowRight, FaBolt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await loginAdmin(form);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Admin login failed. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  const inputContainerStyle = (field) => ({
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.03)",
    border: `1px solid ${focusedField === field ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
    borderRadius: 14,
    height: 56,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: focusedField === field ? "0 0 0 4px rgba(99, 102, 241, 0.1)" : "none",
  });

  const iconStyle = (field) => ({
    width: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: focusedField === field ? "#818cf8" : "#475569",
    transition: "color 0.3s",
    fontSize: 16,
  });

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      background: "#030712",
      backgroundImage: "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.05), transparent 50%)",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp 0.8s ease" }}>
        
        {/* Brand Header */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
            }}>
              <FaBolt style={{ color: "white", fontSize: 20 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: "white", letterSpacing: "-1px" }}>
                Swift<span style={{ color: "#818cf8" }}>Loan</span>
              </span>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "#64748b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6, padding: "3px 10px",
                background: "rgba(255,255,255,0.02)",
              }}>Admin</span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div style={{
          background: "rgba(15, 17, 26, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32,
          padding: "3rem 2.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top subtle highlight */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
          }} />

          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: "1.6" }}>
              Secure portal for capital management and borrower oversight.
            </p>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Email Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>
                Admin Email
              </label>
              <div style={inputContainerStyle('email')}>
                <div style={iconStyle('email')}>
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="admin@swiftloan.io"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={isSubmitting}
                  style={{
                    flex: 1, height: "100%", border: "none", background: "transparent",
                    color: "white", fontSize: 15, outline: "none", paddingRight: 20,
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginLeft: 4 }}>
                Secure Password
              </label>
              <div style={inputContainerStyle('password')}>
                <div style={iconStyle('password')}>
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={isSubmitting}
                  style={{
                    flex: 1, height: "100%", border: "none", background: "transparent",
                    color: "white", fontSize: 15, outline: "none", paddingRight: 8,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none", border: "none", color: "#475569",
                    padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171", fontSize: 13,
                padding: "12px 16px", borderRadius: 12,
                animation: "shake 0.4s cubic-bezier(.36,.07,.19,.97) both",
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: 56, borderRadius: 14, marginTop: 8,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "white", border: "none", cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: 16, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                opacity: isSubmitting ? 0.8 : 1,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                transition: "all 0.3s",
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: 20, height: 20,
                    border: "3px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <FaArrowRight style={{ fontSize: 14 }} />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: "2.5rem", paddingTop: "2rem",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
              Need administrative access?{" "}
              <Link to="/admin/register" style={{ color: "#818cf8", fontWeight: 800, textDecoration: "none" }}>
                Apply for Account
              </Link>
            </p>
            <Link to="/login" style={{ fontSize: 13, color: "#334155", textDecoration: "none", fontWeight: 600 }}>
              Switch to Borrower Login
            </Link>
          </div>
        </div>

        {/* Bottom Note */}
        <p style={{
          textAlign: "center", marginTop: "1.5rem",
          fontSize: 12, color: "#334155",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontWeight: 500,
        }}>
          <FaUserShield style={{ fontSize: 14 }} />
          Secure Admin Portal v2.0
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}