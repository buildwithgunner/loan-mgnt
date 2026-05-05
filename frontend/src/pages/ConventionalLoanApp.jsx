import React, { useState } from 'react';

const TOTAL_STEPS = 8;

/* ─────────────── Step configurations ─────────────── */
const steps = [
  {
    title: 'APPLICATION CHECKLIST',
    sections: [
      {
        heading: 'The following items MUST be initially submitted in order to process your Application',
        items: [
          'Application – Signed, Dated and all requested information provided',
          'Complete Scope Of Work (in great detail)',
          'Retainer Agreement – Signed and Dated',
        ],
      },
      {
        heading: 'If you are purchasing this property in a Limited Liability Company.',
        items: [
          'Articles of Organization',
          'Operating Agreement',
          "Certificate of Good Standing (go to your state's website)",
          'EIN Assignment Letter (or equivalent)',
        ],
      },
      {
        heading: 'If you are purchasing this property in a Corporation',
        items: [
          'Articles of Incorporation',
          'By Laws',
          "Certificate of Good Standing (go to your state's website)",
          'LIN Assignment Letter (or equivalent)',
        ],
      },
      {
        heading: null,
        items: [
          '1 Month Statements ALL accounts – Business, personal, checking, savings, retirement i.e. IRA, 401k, etc.',
          'Fully executed purchase contract, counters, assignments and addendums — all pages',
        ],
      },
    ],
  },
  {
    title: 'BORROWER INFORMATION',
    fields: [
      { label: 'Full Legal Name', type: 'text', placeholder: 'John Doe' },
      { label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
      { label: 'Phone Number', type: 'tel', placeholder: '+1 (000) 000-0000' },
      { label: 'Social Security Number', type: 'text', placeholder: 'XXX-XX-XXXX' },
      { label: 'Date of Birth', type: 'date', placeholder: '' },
      { label: 'Current Address', type: 'text', placeholder: '123 Main St, City, FL 00000' },
    ],
  },
  {
    title: 'PROPERTY INFORMATION',
    fields: [
      { label: 'Property Address', type: 'text', placeholder: '456 Oak Ave, Tampa, FL 33601' },
      { label: 'Property Type', type: 'select', options: ['Single Family', 'Multi-Family', 'Commercial', 'Mixed-Use', 'Land'] },
      { label: 'Purchase Price ($)', type: 'number', placeholder: '350,000' },
      { label: 'Estimated After Repair Value ($)', type: 'number', placeholder: '500,000' },
      { label: 'Loan Amount Requested ($)', type: 'number', placeholder: '280,000' },
      { label: 'Estimated Closing Date', type: 'date', placeholder: '' },
    ],
  },
  {
    title: 'SCOPE OF WORK',
    fields: [
      { label: 'Describe Renovation / Construction Scope', type: 'textarea', placeholder: 'Describe all planned renovations in detail...' },
      { label: 'Estimated Renovation Cost ($)', type: 'number', placeholder: '75,000' },
      { label: 'Estimated Timeline (months)', type: 'number', placeholder: '6' },
      { label: 'General Contractor Name (if applicable)', type: 'text', placeholder: 'ABC Construction LLC' },
      { label: 'Contractor License Number', type: 'text', placeholder: 'CGC000000' },
    ],
  },
  {
    title: 'ENTITY INFORMATION',
    fields: [
      { label: 'Entity Name', type: 'text', placeholder: 'Black Wolves Acquisition LLC' },
      { label: 'Entity Type', type: 'select', options: ['LLC', 'Corporation', 'Sole Proprietor', 'Partnership', 'Trust'] },
      { label: 'State of Formation', type: 'text', placeholder: 'Global' },
      { label: 'EIN Number', type: 'text', placeholder: 'XX-XXXXXXX' },
      { label: 'Date of Formation', type: 'date', placeholder: '' },
    ],
  },
  {
    title: 'FINANCIAL INFORMATION',
    fields: [
      { label: 'Credit Score (FICO)', type: 'number', placeholder: '680' },
      { label: 'Annual Income ($)', type: 'number', placeholder: '120,000' },
      { label: 'Employment Status', type: 'select', options: ['Employed', 'Self-Employed', 'Retired', 'Other'] },
      { label: 'Liquid Assets Available ($)', type: 'number', placeholder: '50,000' },
      { label: 'Existing Real Estate Owned (# of properties)', type: 'number', placeholder: '3' },
      { label: 'Total Outstanding Mortgage Debt ($)', type: 'number', placeholder: '800,000' },
    ],
  },
  {
    title: 'EXPERIENCE & REFERENCES',
    fields: [
      { label: 'Number of Fix & Flip / Construction Projects Completed', type: 'number', placeholder: '5' },
      { label: 'Reference 1 – Name', type: 'text', placeholder: 'Jane Smith' },
      { label: 'Reference 1 – Phone', type: 'tel', placeholder: '+1 (000) 000-0000' },
      { label: 'Reference 1 – Relationship', type: 'text', placeholder: 'Business Partner' },
      { label: 'Reference 2 – Name', type: 'text', placeholder: 'Bob Johnson' },
      { label: 'Reference 2 – Phone', type: 'tel', placeholder: '+1 (000) 000-0000' },
      { label: 'Reference 2 – Relationship', type: 'text', placeholder: 'Attorney' },
    ],
  },
  {
    title: 'DECLARATIONS & SIGNATURE',
    declarations: [
      'I intend to occupy this property as my primary residence.',
      'There are any outstanding judgments against me.',
      'I have been declared bankrupt within the past 7 years.',
      'I have had property foreclosed upon in the last 7 years.',
      'I am a party to a lawsuit.',
      'I have directly or indirectly been obligated on any loan that resulted in foreclosure.',
      'I am presently delinquent or in default on any Federal debt or any other loan.',
      'I am obligated to pay alimony, child support, or separate maintenance.',
      'Any part of the down payment is borrowed.',
      'I am a co-maker or endorser on a note.',
      'I am a U.S. citizen.',
      'I am a permanent resident alien.',
    ],
  },
];

function ChecklistStep({ step, checked, onToggle }) {
  return (
    <div className="space-y-8">
      {step.sections.map((section, si) => (
        <div key={si}>
          {section.heading && (
            <p className="font-semibold text-slate-800 mb-3 text-[14px] leading-snug">
              {section.heading}
            </p>
          )}
          <div className="space-y-2.5">
            {section.items.map((item, ii) => {
              const key = `${si}-${ii}`;
              return (
                <label key={ii} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checked[key]}
                    onChange={() => onToggle(key)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-400 text-[#c5a059] accent-[#c5a059] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-[13px] text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
          {si < step.sections.length - 1 && <hr className="mt-6 border-slate-200" />}
        </div>
      ))}
    </div>
  );
}

function FieldsStep({ step, values, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {step.fields.map((field, idx) => (
        <div key={idx} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
          <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">{field.label}</label>
          {field.type === 'select' ? (
            <select
              value={values[field.label] || ''}
              onChange={e => onChange(field.label, e.target.value)}
              className="w-full border border-slate-300 bg-white rounded px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#c5a059] transition-colors"
            >
              <option value="">Select...</option>
              {field.options.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              rows={5}
              placeholder={field.placeholder}
              value={values[field.label] || ''}
              onChange={e => onChange(field.label, e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
            />
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.label] || ''}
              onChange={e => onChange(field.label, e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function DeclarationsStep({ step, answers, onAnswer }) {
  return (
    <div className="space-y-4">
      <p className="text-[13px] text-slate-600 mb-6 leading-relaxed">
        Please answer each of the following questions <strong>Yes</strong> or <strong>No</strong> as they apply to you.
      </p>
      {step.declarations.map((decl, idx) => (
        <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 border-b border-slate-100 last:border-0">
          <p className="flex-1 text-[13px] text-slate-700">{decl}</p>
          <div className="flex gap-3 flex-shrink-0">
            {['Yes', 'No'].map(opt => (
              <button
                key={opt}
                onClick={() => onAnswer(idx, opt)}
                className={`px-5 py-1.5 rounded border text-[12px] font-bold transition-all ${
                  answers[idx] === opt
                    ? 'bg-[#c5a059] text-white border-[#c5a059] shadow'
                    : 'border-slate-300 text-slate-500 hover:border-[#c5a059] hover:text-[#c5a059]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Signature block */}
      <div className="mt-8 border-t border-slate-200 pt-6 space-y-4">
        <h3 className="font-bold text-slate-800 text-[14px]">Electronic Signature</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Full Legal Name (Signature)</label>
            <input type="text" placeholder="Sign here..." className="w-full border border-slate-300 rounded px-3 py-2.5 text-[13px] italic text-slate-700 focus:outline-none focus:border-[#c5a059]" />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Date</label>
            <input type="date" className="w-full border border-slate-300 rounded px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#c5a059]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConventionalLoanApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [checked, setChecked] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [declarations, setDeclarations] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const progress = Math.round(((currentStep + 1) / TOTAL_STEPS) * 100);
  const step = steps[currentStep];

  const handleToggle = (key) => setChecked(c => ({ ...c, [key]: !c[key] }));
  const handleFieldChange = (label, value) => setFieldValues(v => ({ ...v, [label]: value }));
  const handleDeclare = (idx, val) => setDeclarations(d => ({ ...d, [idx]: val }));

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep(s => s + 1);
    else setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(s => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] pt-32 pb-24 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl shadow-xl p-12 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-[#c5a059]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#c5a059]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Application Submitted!</h2>
          <p className="text-slate-500 text-[14px] leading-relaxed mb-8">
            Thank you for submitting your commercial loan application. A Black Wolves Acquisition LLC loan officer will review your information and contact you within 1 business day.
          </p>
          <div className="text-sm text-slate-400 space-y-1">
            <p>📞 +1 563-571-0448</p>
            <p>✉️ info@blackwolvesacquisition.com</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-32 pb-24 px-6 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8 font-serif">
          Apply For Commercial Loan
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">

          {/* Progress */}
          <div className="mb-6">
            <p className="text-[12px] text-slate-500 mb-2 font-medium">Step {currentStep + 1} of {TOTAL_STEPS}</p>
            <div className="relative w-full h-6 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white text-[10px] font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Step Title */}
          <div className="bg-slate-900 text-white px-4 py-2.5 mb-6 font-bold text-[13px] uppercase tracking-wide rounded-sm">
            {step.title}
          </div>

          {/* Step Content */}
          {currentStep === 0 && <ChecklistStep step={step} checked={checked} onToggle={handleToggle} />}
          {currentStep > 0 && currentStep < TOTAL_STEPS - 1 && step.fields && (
            <FieldsStep step={step} values={fieldValues} onChange={handleFieldChange} />
          )}
          {currentStep === TOTAL_STEPS - 1 && (
            <DeclarationsStep step={step} answers={declarations} onAnswer={handleDeclare} />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-600 text-[13px] font-semibold hover:border-slate-500 hover:text-slate-800 transition-all"
              >
                ← Back
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-8 py-2.5 rounded-full text-[13px] transition-all hover:scale-105 shadow"
            >
              {currentStep === TOTAL_STEPS - 1 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-6 h-2 bg-[#c5a059]'
                  : i < currentStep
                  ? 'w-2 h-2 bg-[#c5a059]/50'
                  : 'w-2 h-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}


