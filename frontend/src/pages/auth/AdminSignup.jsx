import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ShieldAlert, ShieldCheck, AlertCircle, Key } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import { adminRegister } from '../../api/admin.js';

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    passcode: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await adminRegister(formData);
      if (data && data.access_token) {
        navigateTo('/admin');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'Registration failed. Check system passcode.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Matrix Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(rgba(197,160,89,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a059]/50 bg-[#c5a059]/10 text-[#c5a059] shadow-lg">
            <ShieldAlert size={32} />
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900 tracking-tight uppercase">
            New Admin Enrollment
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            System Security Level: <span className="text-[#c5a059] font-bold">Class-4 Access</span>
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200 text-xs">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Full Legal Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059]">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all text-sm"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Work Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all text-sm"
                    placeholder="admin@blackwolves.net"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Confirm</label>
                  <input
                    type="password"
                    required
                    className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all text-sm"
                    placeholder="••••••••"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  />
                </div>
              </div>

              {/* System Passcode Field */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold text-[#c5a059] mb-1 uppercase tracking-widest">Master System Passcode</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c5a059]/50">
                    <Key size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-[#c5a059]/5 border border-[#c5a059]/20 rounded-xl text-slate-900 placeholder-[#c5a059]/50 focus:outline-none focus:border-[#c5a059] transition-all text-sm font-mono"
                    placeholder="Enter Clearance Code"
                    value={formData.passcode}
                    onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                  />
                </div>
                <p className="mt-1 text-[9px] text-slate-600 font-bold italic">Clearance code required for administrative role assignment.</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-4 px-4 bg-[#c5a059] hover:bg-[#b08d4a] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#c5a059]/20 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Verifying Clearance...' : 'Create Admin Account'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-slate-600">
              Already have clearance?{' '}
              <button
                onClick={() => navigateTo('/admin/login')}
                className="font-black text-[#c5a059] hover:text-[#b08d4a] transition-colors"
                type="button"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#c5a059]" /> 
                System ID Generated
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
                IP Address Logged
            </div>
        </div>
      </div>
    </div>
  );
}
