import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, CheckCircle2, AlertCircle, MapPin, ChevronLeft, Briefcase, CreditCard } from 'lucide-react';
import { navigateTo } from '../../App.jsx';
import { apiClient } from '../../api/client.js';
import Logo from '../../components/Logo.jsx';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false,
    remember: false,
    // Borrower Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    maritalStatus: '',
    occupation: '',
    selfEmployed: '',
    estimatedFico: '',
    estimatedNetWorth: '',
    referralSource: '',
    workingWithConsultant: '',
    loanIntent: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) return setError('Please enter your email');
    setError('');
    setIsLoading(true);
    try {
      await apiClient('/otp/send', {
        method: 'POST',
        body: { email: formData.email }
      });
      setIsOtpSent(true);
    } catch (err) {
      setError(err || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the verification code');
    setError('');
    setIsLoading(true);
    try {
      await apiClient('/otp/verify', {
        method: 'POST',
        body: { email: formData.email, code: otp }
      });
      setIsOtpVerified(true);
      setStep(2);
    } catch (err) {
      setError(err || 'Invalid or expired code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!formData.agreed) {
      setError("Please agree to the Terms of Service");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Clear any existing auth data to prevent session conflicts
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');

      const data = await apiClient('/register', {
        method: 'POST',
        body: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          remember: formData.remember,
          // Extra borrower profile info
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          ssn: formData.ssn,
          dob: `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`,
          marital_status: formData.maritalStatus,
          occupation: formData.occupation,
          self_employed: formData.selfEmployed,
          estimated_fico: formData.estimatedFico,
          estimated_net_worth: formData.estimatedNetWorth,
          referral_source: formData.referralSource,
          working_with_consultant: formData.workingWithConsultant,
          loan_intent: formData.loanIntent,
        },
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
      setError(err || 'Registration failed. Please try again.');
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all";
  const inputClassNoIcon = "block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all";
  const selectClass = "block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#c5a059] rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <Logo className="h-24 mb-6" />
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
            {step === 1 ? 'Verify Email' : step === 2 ? 'Create Account' : 'Borrower Information'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {step === 1 ? 'Step 1: Security Verification' : step === 2 ? 'Step 2: Join Black Wolves' : 'Step 3: Complete Profile'}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                s === step ? 'bg-[#c5a059] border-[#c5a059] text-white' :
                s < step ? 'bg-[#c5a059]/30 border-[#c5a059] text-[#c5a059]' :
                'bg-white border-gray-300 text-slate-400'
              }`}>
                {s < step ? <CheckCircle2 size={14} /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${s < step ? 'bg-[#c5a059]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* ── STEP 1: OTP Verification ── */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input type="email" required disabled={isOtpSent} className={inputClass} placeholder="name@gmail.com"
                    value={formData.email} onChange={e => set('email', e.target.value)} />
                </div>
                {isOtpSent && (
                  <button type="button" onClick={() => setIsOtpSent(false)} className="mt-2 text-xs text-[#c5a059] font-bold hover:underline">
                    Change Email
                  </button>
                )}
              </div>

              {isOtpSent && (
                <div className="animate-fade-in">
                  <label className={labelClass}>Verification Code</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input type="text" required maxLength={6} className={inputClass} placeholder="Enter 6-digit code"
                      value={otp} onChange={e => setOtp(e.target.value)} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">We've sent a code to your email. It expires in 10 minutes.</p>
                </div>
              )}

              <button type="submit" disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20 disabled:opacity-50">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isOtpSent ? 'Verify Code' : 'Send Verification Code'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>
          )}

          {/* ── STEP 2: Account Details ── */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleNext}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                      <User size={18} />
                    </div>
                    <input type="text" required className={inputClass} placeholder="Franklin Smith"
                      value={formData.fullName} onChange={e => set('fullName', e.target.value)} />
                  </div>
                </div>

                <div className="md:col-span-2 opacity-60">
                  <label className={labelClass}>Verified Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c5a059] transition-colors">
                      <CheckCircle2 size={18} />
                    </div>
                    <input type="email" disabled className={inputClass} value={formData.email} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                      <Phone size={18} />
                    </div>
                    <input type="tel" required className={inputClass} placeholder="+1 (555) 000-0000"
                      value={formData.phone} onChange={e => set('phone', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input type="password" required className={inputClass} placeholder="••••••••"
                      value={formData.password} onChange={e => set('password', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input type="password" required className={inputClass} placeholder="••••••••"
                      value={formData.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start">
                  <input id="terms" type="checkbox" required
                    className="h-4 w-4 mt-0.5 text-[#c5a059] focus:ring-[#c5a059] border-gray-300 rounded bg-white"
                    checked={formData.agreed} onChange={e => set('agreed', e.target.checked)} />
                  <label htmlFor="terms" className="ml-3 text-sm text-slate-600">
                    I agree to the{' '}
                    <a href="#" className="font-bold text-[#c5a059] hover:text-[#b08d4a]">Terms of Service</a> and{' '}
                    <a href="#" className="font-bold text-[#c5a059] hover:text-[#b08d4a]">Privacy Policy</a>.
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox"
                    className="h-4 w-4 text-[#c5a059] focus:ring-[#c5a059] border-gray-300 rounded bg-white"
                    checked={formData.remember} onChange={e => set('remember', e.target.checked)} />
                  <label htmlFor="remember-me" className="ml-3 text-sm text-slate-600">Remember me</label>
                </div>
              </div>

              <div className="flex gap-4">
                 <button type="button" onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all text-sm font-semibold">
                  <ChevronLeft size={16} /> Back
                </button>
                <button type="submit"
                  className="group relative flex-1 flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20">
                  <div className="flex items-center gap-2">
                    Next: Borrower Info
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: Borrower Information ── */}
          {step === 3 && (
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Address */}
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-[#c5a059] mb-3">Home Address</p>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className={labelClass}>Street Address <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                        <MapPin size={18} />
                      </div>
                      <input type="text" required className={inputClass} placeholder="123 Main St"
                        value={formData.address} onChange={e => set('address', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>City <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClassNoIcon} placeholder="Tampa"
                        value={formData.city} onChange={e => set('city', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>State <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClassNoIcon} placeholder="FL"
                        value={formData.state} onChange={e => set('state', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>ZIP Code <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClassNoIcon} placeholder="33601"
                        value={formData.zipCode} onChange={e => set('zipCode', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-[#c5a059] mb-3">Identity & Personal</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>SSN (Last 4 digits)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                        <CreditCard size={18} />
                      </div>
                      <input type="text" maxLength={4} className={inputClass} placeholder="••••"
                        value={formData.ssn} onChange={e => set('ssn', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="text" maxLength={2} className={inputClassNoIcon} placeholder="MM"
                        value={formData.dobMonth} onChange={e => set('dobMonth', e.target.value)} />
                      <input type="text" maxLength={2} className={inputClassNoIcon} placeholder="DD"
                        value={formData.dobDay} onChange={e => set('dobDay', e.target.value)} />
                      <input type="text" maxLength={4} className={inputClassNoIcon} placeholder="YYYY"
                        value={formData.dobYear} onChange={e => set('dobYear', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Marital Status</label>
                    <select className={selectClass} value={formData.maritalStatus} onChange={e => set('maritalStatus', e.target.value)}>
                      <option value="">-- Select --</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Working With a Consultant?</label>
                    <select className={selectClass} value={formData.workingWithConsultant} onChange={e => set('workingWithConsultant', e.target.value)}>
                      <option value="">-- Select --</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-[#c5a059] mb-3">Financial Profile</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Occupation</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#c5a059] transition-colors">
                        <Briefcase size={18} />
                      </div>
                      <input type="text" className={inputClass} placeholder="e.g. Real Estate Investor"
                        value={formData.occupation} onChange={e => set('occupation', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Self Employed?</label>
                    <select className={selectClass} value={formData.selfEmployed} onChange={e => set('selfEmployed', e.target.value)}>
                      <option value="">-- Select --</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Estimated FICO Score</label>
                    <select className={selectClass} value={formData.estimatedFico} onChange={e => set('estimatedFico', e.target.value)}>
                      <option value="">-- Select Range --</option>
                      <option>Below 580</option>
                      <option>580 – 619</option>
                      <option>620 – 659</option>
                      <option>660 – 699</option>
                      <option>700 – 739</option>
                      <option>740 – 779</option>
                      <option>780+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Estimated Net Worth</label>
                    <select className={selectClass} value={formData.estimatedNetWorth} onChange={e => set('estimatedNetWorth', e.target.value)}>
                      <option value="">-- Select Range --</option>
                      <option>Under $50,000</option>
                      <option>$50,000 – $100,000</option>
                      <option>$100,000 – $250,000</option>
                      <option>$250,000 – $500,000</option>
                      <option>$500,000 – $1M</option>
                      <option>Over $1M</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>How Did You Hear About Us?</label>
                    <select className={selectClass} value={formData.referralSource} onChange={e => set('referralSource', e.target.value)}>
                      <option value="">-- Select --</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Friend / Referral</option>
                      <option>Email</option>
                      <option>Event / Conference</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Strategic Loan Intent (Why is this loan needed?)</label>
                    <textarea 
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/50 focus:border-[#c5a059] transition-all min-h-[100px]"
                      placeholder="e.g. Need $250k for a Fix & Flip project in Tampa..."
                      value={formData.loanIntent}
                      onChange={e => set('loanIntent', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition-all text-sm font-semibold">
                  <ChevronLeft size={16} /> Back
                </button>
                <button type="submit" disabled={isLoading}
                  className="group relative flex-1 flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#c5a059] hover:bg-[#b08d4a] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button onClick={() => navigateTo('/login')}
                className="font-bold text-[#c5a059] hover:text-[#b08d4a] transition-colors">
                Sign In
              </button>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Fast Funding', 'Deal Consulting', 'Portal Access'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-white shadow-sm py-2 px-4 rounded-lg border border-gray-100">
              <CheckCircle2 size={12} className="text-[#c5a059]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
