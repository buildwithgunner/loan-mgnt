import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import { apiClient } from '../../api/client.js';
import Logo from '../../components/Logo.jsx';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: localStorage.getItem('remembered_email') || '', 
    password: '', 
    remember: !!localStorage.getItem('remembered_email') 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Clear any existing auth data to prevent session conflicts
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');

      const data = await apiClient('/login', {
        method: 'POST',
        body: formData,
      });

      if (data && data.access_token) {
        const storage = formData.remember ? localStorage : sessionStorage;
        storage.setItem('access_token', data.access_token);
        storage.setItem('user', JSON.stringify(data.user));
        
        if (formData.remember) {
           localStorage.setItem('remembered_email', formData.email);
           localStorage.setItem('remember_me', 'true');
        } else {
           localStorage.removeItem('remembered_email');
           localStorage.removeItem('remember_me');
        }

        navigateTo('/dashboard');
      }
    } catch (err) {
      setError(err || 'Something went wrong. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c5a059] rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center flex flex-col items-center">
          <Logo className="h-24 mb-6" />
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back to Black Wolves Acquisition LLC
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-[#c5a059] hover:text-[#b08d4a] transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
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
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigateTo('/signup')}
                className="font-bold text-[#c5a059] hover:text-[#b08d4a] transition-colors"
              >
                Sign Up 
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest font-bold">
          <ShieldCheck size={14} className="text-[#c5a059]" />
          Securely Encrypted
        </div>
      </div>
    </div>
  );
}
