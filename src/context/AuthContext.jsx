/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api, { ensureCsrfCookie } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      return res.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser();
  }, []);

  const login = async (payload) => {
    await ensureCsrfCookie();
    await api.post("/auth/login", payload);
    return refreshUser();
  };

  const loginAdmin = async (payload) => {
    await ensureCsrfCookie();
    await api.post("/auth/admin/login", payload);
    return refreshUser();
  };

  const register = async (payload) => {
    await ensureCsrfCookie();
    await api.post("/auth/register", payload);
    return refreshUser();
  };

  const registerAdmin = async (payload) => {
    await ensureCsrfCookie();
    await api.post("/auth/admin/register", payload);
    return refreshUser();
  };

  const logout = async () => {
    try {
      await ensureCsrfCookie();
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, loginAdmin, register, registerAdmin, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
