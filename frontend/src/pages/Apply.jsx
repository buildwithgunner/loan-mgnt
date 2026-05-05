import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigateTo } from '../App.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#ffffff',
  color: '#051a2c',
  customClass: {
    popup: 'rounded-2xl border border-gray-100 shadow-2xl',
    confirmButton: 'bg-[#1f73b7] text-white font-bold px-10 py-3 rounded-full hover:scale-105 transition-all',
    cancelButton: 'bg-gray-100 text-gray-700 font-bold px-10 py-3 rounded-full hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Borrower Info (kept in state for sync but removed from UI)
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
    
    declarations: Array(12).fill(''),
    selfEmployed: '',
    occupation: '',
    estimatedFico: '',
    estimatedNetWorth: '',
    
    // Property Info
    propertyAddress: '',
    propertyType: '',
    purchasePrice: '',
    loanAmount: '',
    loanDuration: '',
    purpose: 'Purchase',
    loanIntent: '',
  });

  useEffect(() => {
    // Pre-fill from logged in user if available
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

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      Toast.fire({
        title: 'AUTHENTICATION REQUIRED',
        text: 'Please sign in or create an account to finalize your application.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'SIGN IN NOW',
        cancelButtonText: 'STAY HERE'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('pending_application', JSON.stringify(formData));
          navigateTo('/login');
        }
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/dashboard/applications', {
        type: formData.propertyType || formData.purpose,
        property: formData.propertyAddress || formData.address,
        amount: formData.loanAmount || '$0',
        form_data: formData
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      
      Toast.fire({
        title: 'APPLICATION SUBMITTED',
        text: 'Your loan request has been received and is under review.',
        icon: 'success',
        confirmButtonText: 'GO TO DASHBOARD'
      }).then(() => {
        navigateTo('/dashboard');
      });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'An error occurred during application upload.';
      Toast.fire({
        title: 'SUBMISSION FAILED',
        text: msg,
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 2) * 100;

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-slate-800">
      
      {/* Page Title */}
      <div className="pt-24 pb-10 w-full text-center bg-white">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-serif">Apply For Loan</h1>
      </div>

      {/* Main Form Container */}
      <div className="max-w-[1000px] mx-auto bg-[#fafafa] p-8 md:p-12 shadow-sm rounded-md border border-gray-100">
        
        <h2 className="text-3xl font-medium text-gray-800 mb-2">Black Wolves - New Loan Application Form</h2>
        <p className="text-sm text-gray-500 mb-6 font-medium">"<span className="text-red-600">*</span>" indicates required fields</p>

        {/* Progress Bar */}
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-2 font-medium">Step {currentStep} of 2</p>
          <div className="w-full bg-gray-200 rounded-full h-8 flex overflow-hidden">
            <div 
                className="bg-slate-900 h-full flex items-center justify-end px-3 text-white text-xs font-bold transition-all duration-500" 
                style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* STEP 1: PROPERTY & LOAN INFO */}
        {currentStep === 1 && (
          <>
            <div className="bg-slate-900 text-white px-5 py-3 font-bold text-xl mb-8">
              Property and Loan Information
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Subject Property Address <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                  placeholder="Street Address, City, State, ZIP"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Property Type <span className="text-red-500">*</span></label>
                  <select 
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Select Type --</option>
                    <option>Single Family</option>
                    <option>Multi-Family (2-4 units)</option>
                    <option>Commercial</option>
                    <option>Mixed-Use</option>
                    <option>Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Loan Purpose <span className="text-red-500">*</span></label>
                  <select 
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option>Purchase</option>
                    <option>Refinance</option>
                    <option>Cash-Out Refinance</option>
                    <option>Bridge Loan</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Strategic Intent (Detailed Purpose) <span className="text-red-500">*</span></label>
                  <textarea 
                    value={formData.loanIntent}
                    onChange={(e) => handleInputChange('loanIntent', e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 min-h-[100px]" 
                    placeholder="Describe your project and why this funding is critical (e.g. Purchase of a 3-unit property for renovation and resale...)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Loan Duration (Months) <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.loanDuration}
                    onChange={(e) => handleInputChange('loanDuration', e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="e.g. 12 Months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Estimated Purchase Price / Value <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="e.g. $450,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Requested Loan Amount <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="e.g. $300,000"
                  />
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold py-3 px-12 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                  Next Step
                </button>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: REVIEW & SUBMIT */}
        {currentStep === 2 && (
          <>
            <div className="bg-slate-900 text-white px-5 py-3 font-bold text-xl mb-8">
              Review and Submit
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-[#c5a059] border-b pb-2">Borrower Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Name:</span> <span>{formData.firstName} {formData.lastName}</span>
                  <span className="text-gray-500">Email:</span> <span>{formData.email}</span>
                  <span className="text-gray-500">Phone:</span> <span>{formData.phone}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-[#c5a059] border-b pb-2">Loan Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Property Address:</span> <span>{formData.propertyAddress}</span>
                  <span className="text-gray-500">Property Type:</span> <span>{formData.propertyType}</span>
                  <span className="text-gray-500">Loan Purpose:</span> <span>{formData.purpose}</span>
                  <span className="text-gray-500">Loan Duration:</span> <span>{formData.loanDuration}</span>
                  <span className="text-gray-500">Loan Intent:</span> <span className="italic">"{formData.loanIntent}"</span>
                  <span className="text-gray-500">Loan Amount:</span> <span className="font-bold text-green-700">{formData.loanAmount}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 text-blue-800 rounded-md text-sm border border-blue-100 italic">
                By clicking submit, you authorize Black Wolves to review your application and contact you regarding your loan request. Your data is stored securely.
              </div>

              <div className="pt-8 flex justify-between">
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full transition-all"
                >
                  Back
                </button>
                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-16 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
