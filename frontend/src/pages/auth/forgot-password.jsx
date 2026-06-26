import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import { apiClient } from '../../api/client.js';
import Logo from '../../components/Logo.jsx';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await apiClient('/password/forgot', {
        method: 'POST',
        body: { email }
      });
      setSuccessMsg('A password reset code has been sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err || 'Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await apiClient('/password/reset', {
        method: 'POST',
        body: {
          email,
          code: formData.code,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        }
      });
      setSuccessMsg('Your password has been successfully reset.');
      setStep(3);
    } catch (err) {
      setError(err || 'Failed to reset password. Please check the code and try again.');
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Black Wolves Acquisition LLC
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 text-red-500" /> {error}
            </div>
          )}

          {successMsg && step !== 3 && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-700 text-sm">
              <CheckCircle2 size={18} className="flex-shrink-0 text-green-500" /> {successMsg}
            </div>
          )}

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleRequestOtp}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter the email address associated with your account and we'll send you a 6-digit verification code to reset your password.
              </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending code...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Send Code
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <p className="text-sm text-slate-600 leading-relaxed">
                We've sent a code to <strong className="text-slate-800">{email}</strong>. Enter it below along with your new password.
              </p>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 tracking-[0.3em] font-mono text-center focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
                    placeholder="123456"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
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

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-11 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resetting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Reset Password
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Password Reset Successful</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your password has been successfully updated. You can now use your new password to sign in to your account.
              </p>
              <button
                onClick={() => navigateTo('/login')}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5a059] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {step !== 3 && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-slate-600">
                Remember your password?{' '}
                <button
                  onClick={() => navigateTo('/login')}
                  className="font-bold text-[#c5a059] hover:text-[#b08d4a] transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest font-bold">
          <ShieldCheck size={14} className="text-[#c5a059]" />
          Securely Encrypted
        </div>
      </div>
    </div>
  );
}
