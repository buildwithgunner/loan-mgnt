import React, { useState, useEffect } from 'react';
import { Send, Building2, DollarSign, Calculator, Info, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { apiClient } from '../../../api/client.js';

export default function LoanRequest({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // Step 1: Borrower Info
    firstName: '',
    lastName: '',
    ssn: '',
    dobMonth: 'MM',
    dobDay: 'DD',
    dobYear: 'YYYY',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    mailingSame: '',
    maritalStatus: '',
    workingWithConsultant: '',
    referralSource: '',
    coBorrowerCount: 0,
    
    // Step 1: Declarations (12 values)
    declarations: Array(12).fill(''),
    
    // Step 1: Personal Financials
    selfEmployed: '',
    occupation: '',
    estimatedFico: '',
    estimatedNetWorth: '',
    
    // Step 2: Property Info
    propertyAddress: '',
    propertyType: 'Fix & Flip',
    purchasePrice: '',
    loanAmount: '',
    loanDuration: '',
    purpose: 'Purchase',
  });

  useEffect(() => {
    // Pre-fill from logged in user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeclarationChange = (idx, value) => {
    const newDeclarations = [...formData.declarations];
    newDeclarations[idx] = value;
    setFormData(prev => ({ ...prev, declarations: newDeclarations }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await apiClient('/dashboard/applications', {
        method: 'POST',
        body: {
          type: formData.propertyType || formData.purpose,
          property: formData.propertyAddress || formData.address,
          amount: formData.loanAmount || '$0',
          form_data: formData
        },
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center animate-fade-in">
        <div className="bg-white rounded-[3rem] p-16 shadow-lg border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 blur-3xl rounded-full" />
          <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform border border-emerald-100">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">Application Sent</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
            Your detailed loan application has been received. Our processing team will review all documents and contact you within 1 business day.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
            }}
            className="w-full bg-[#c5a059] text-white font-black py-5 rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-[#c5a059]/30 uppercase tracking-widest text-xs"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const progress = (currentStep / 2) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tight">New Loan Application</h2>
          <p className="text-slate-600 text-sm font-medium italic">Enter your loan requirements below</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-3 text-[10px] font-black text-slate-900 bg-gray-50 px-6 py-3 rounded-full border border-gray-200 uppercase tracking-[0.2em]">
            Step {currentStep} of 2
          </div>
          <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all duration-700" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-12">
          
          {error && (
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3 uppercase tracking-wider">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          {/* STEP 1: PROPERTY & LOAN INFO */}
          {currentStep === 1 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 text-slate-900 border-b border-gray-100 pb-6">
                  <div className="p-3 bg-gray-50 rounded-xl text-[#c5a059]">
                    <Building2 size={24} />
                  </div>
                  <h3 className="font-black text-xl uppercase italic tracking-wider">Property & Loan Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="md:col-span-2 text-slate-900">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Subject Property Address</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                      placeholder="Enter the full address of the property"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Property Type</label>
                    <select
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-black text-[#c5a059] focus:outline-none appearance-none cursor-pointer uppercase shadow-sm"
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    >
                      <option className="bg-white">Fix & Flip</option>
                      <option className="bg-white">New Construction</option>
                      <option className="bg-white">Bridge Loan</option>
                      <option className="bg-white">Rental</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Loan Purpose</label>
                    <select
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-black text-[#c5a059] focus:outline-none appearance-none cursor-pointer uppercase shadow-sm"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                    >
                      <option className="bg-white">Purchase</option>
                      <option className="bg-white">Refinance</option>
                      <option className="bg-white">Cash-out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Loan Duration (Months)</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                      placeholder="e.g. 12 Months"
                      value={formData.loanDuration}
                      onChange={(e) => handleInputChange('loanDuration', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Estimated Purchase Price / Value ($)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#c5a059] shadow-sm"
                      placeholder="0.00"
                      value={formData.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Requested Loan Amount ($)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#c5a059] shadow-sm"
                      placeholder="0.00"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-3xl flex items-center justify-between border border-gray-200 shadow-sm">
                   <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-2xl bg-[#c5a059] flex items-center justify-center text-white shadow-lg shadow-[#c5a059]/20">
                       <DollarSign size={32} />
                     </div>
                     <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 mb-1">Total Loan Amount</p>
                        <p className="text-3xl font-black text-[#c5a059] italic">${Number(formData.loanAmount).toLocaleString()}</p>
                     </div>
                   </div>
                </div>

                <div className="pt-10 flex justify-end">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="bg-white text-slate-900 font-black px-8 py-5 rounded-2xl transition-all border border-gray-200 hover:bg-gray-50 uppercase tracking-[0.2em] text-xs flex items-center gap-4 shadow-sm"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className="bg-[#c5a059] text-white font-black px-12 py-5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-[#c5a059]/30 flex items-center gap-4 uppercase tracking-[0.2em] text-xs"
                  >
                    Review Details <ChevronRight size={18} />
                  </button>
                </div>
             </div>
          )}

          {/* STEP 2: REVIEW & SUBMIT */}
          {currentStep === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center gap-3 text-slate-900 border-b border-gray-100 pb-6">
                <div className="p-3 bg-gray-50 rounded-xl text-[#c5a059]">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-black text-xl uppercase italic tracking-wider">Final Review</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
                   <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest italic">Borrower Summary</p>
                   <div className="space-y-1">
                      <p className="text-xl font-black text-slate-900">{formData.firstName} {formData.lastName}</p>
                      <p className="text-xs text-slate-600">{formData.email} // {formData.phone}</p>
                   </div>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-4">
                   <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest italic">Property Summary</p>
                   <div className="space-y-1">
                      <p className="text-xl font-black text-slate-900">{formData.propertyAddress}</p>
                      <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">{formData.propertyType} — ${Number(formData.loanAmount).toLocaleString()}</p>
                   </div>
                </div>
              </div>

               <div className="p-8 bg-[#c5a059]/5 border border-[#c5a059]/20 rounded-[2rem] text-center">
                  <p className="text-xs text-slate-600 font-medium italic">
                    By submitting this application, you confirm that the information provided is accurate and you authorize Black Wolves Acquisition LLC to perform a preliminary review.
                  </p>
               </div>

               <div className="pt-10 flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-white text-slate-900 font-black px-8 py-5 rounded-2xl transition-all border border-gray-200 hover:bg-gray-50 uppercase tracking-[0.2em] text-xs flex items-center gap-4 shadow-sm"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#c5a059] text-white font-black px-12 py-5 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-[#c5a059]/30 flex items-center gap-4 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#05101c]/30 border-t-[#05101c] rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Finalize & Submit <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

       <div className="flex flex-col items-center gap-2">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
          SECURED PROTOCOL // BLACK WOLVES ACQUISITION LLC
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    </div>
  );
}
