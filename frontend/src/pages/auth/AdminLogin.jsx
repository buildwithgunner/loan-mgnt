import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Shield } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import { adminLogin } from '../../api/admin.js';
import Logo from '../../components/Logo.jsx';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: localStorage.getItem('remembered_admin_email') || '', 
    password: '',
    remember: !!localStorage.getItem('remembered_admin_email')
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await adminLogin(formData);
      if (data && data.access_token) {
        const storage = formData.remember ? localStorage : sessionStorage;
        storage.setItem('access_token', data.access_token);
        storage.setItem('user', JSON.stringify(data.user));

        if (formData.remember) {
          localStorage.setItem('remembered_admin_email', formData.email);
        } else {
          localStorage.removeItem('remembered_admin_email');
        }
        
        navigateTo('/admin');
      } else {
        setError('Login failed. Please check credentials.');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Connection error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Light Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c5a059] rounded-full blur-[180px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300 rounded-full blur-[180px] opacity-20" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center flex flex-col items-center">
          <Logo className="h-24 mb-6" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] text-[10px] font-black uppercase tracking-widest mb-4">
            <Shield size={12} /> Admin Access Only
          </div>
          <h2 className="mt-2 text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Command Center
          </h2>
          <p className="mt-2 text-xs text-slate-500 font-bold tracking-[0.3em] uppercase">
            Authorized Personnel Only
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#c5a059]/50 via-transparent to-blue-500/50 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <form className="space-y-6 relative" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-shake">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-2 uppercase tracking-widest">Administrator Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c5a059]/60">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-4 focus:ring-[#c5a059]/10 transition-all font-mono text-sm"
                  placeholder="admin.id@blackwolves.net"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-2 uppercase tracking-widest">Security Credentials</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c5a059]/60">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-11 pr-12 py-4 bg-slate-50 border border-gray-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-4 focus:ring-[#c5a059]/10 transition-all font-mono text-sm"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#c5a059] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#c5a059] focus:ring-[#c5a059] border-gray-300 rounded bg-white"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              />
              <label htmlFor="remember-me" className="ml-2 block text-[10px] text-slate-600 uppercase tracking-widest font-black">
                Remember Terminal
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl text-sm font-black text-white bg-gradient-to-r from-[#c5a059] to-[#b08d4a] hover:from-[#d4b574] hover:to-[#c5a059] focus:outline-none transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] disabled:opacity-50 tracking-widest uppercase"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Decrypting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Initiate Secure Login
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-slate-600 font-medium">
              New Admin?{' '}
              <button
                onClick={() => navigateTo('/admin/signup')}
                className="font-black text-[#c5a059] hover:text-[#b08d4a] transition-colors underline decoration-[#c5a059]/30 underline-offset-4"
              >
                Register Credentials
              </button>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-[.2em] font-black">
            <ShieldCheck size={14} className="text-[#c5a059]" />
            Encrypted Zero-Trust Architecture
          </div>
          <button 
            onClick={() => navigateTo('/login')}
            className="text-[10px] text-slate-700 hover:text-slate-400 font-bold uppercase tracking-widest transition-colors"
          >
            ← Back to Public Site
          </button>
        </div>
      </div>
    </div>
  );
}
