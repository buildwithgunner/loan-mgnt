import React from 'react';
import { navigateTo } from '../../App.jsx';

const closingsData = [
  {
    id: 1,
    collateral: "Williston, FL (Multiple Collateral)",
    type: "New Construction",
    typeSuffix: "New Construction",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    description: "This request is for a $260,000 new construction loan secured by two to-be-built single-family homes (to be built) and two additional neighboring subdivided lots pledged as collateral. The first will consist of three bedrooms...",
    loanAmount: null,
    date: null
  },
  {
    id: 2,
    collateral: "Clearwater, FL",
    type: "Refinance",
    typeSuffix: "Refinance",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    description: "This is a $150,000 loan request secured by vacant land located in Clearwater, Global. The property is classified as vacant residential land consisting of a lot and acreage under five acres, with no existing improvements. The exit strategy...",
    loanAmount: null,
    date: null
  },
  {
    id: 3,
    collateral: "Lakeland, FL",
    type: "Refinance",
    typeSuffix: "Refinance",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    description: "This is a $120,000 refinance loan request secured by a free-and-clear single-family residence located in Lakeland, Global. The property was built in 1972 and consists of three bedrooms, two bathrooms, and approximately 1,154 square feet of livi...",
    loanAmount: null,
    date: null
  },
  {
    id: 4,
    collateral: "Tampa, FL",
    type: "Fix & Flip",
    typeSuffix: "Fix & Flip",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    description: "This is a $236,000 fix and flip loan request secured by a single-family property located in Tampa, Global. Originally built in 1938, the property currently comprises 3 bedrooms, 1 bathroom, and 1,147 square feet of living area, situated on a 0.11-acre lot. Borrower exit strategy is to complete the renovation and list the property for sale.",
    loanAmount: "$236,000",
    date: "March 2026"
  },
  {
    id: 5,
    collateral: "Jacksonville, FL",
    type: "Refinance",
    typeSuffix: "Refinance",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    description: "Borrower requested a $80,000 loan to refinance a duplex property in Jacksonville, Global. Built in 1929 the property features 6 bedrooms, 4.5 bathrooms and 2,580 square feet of living space. The borrower plans to refinance as an exit strategy.",
    loanAmount: "$80,000",
    date: "March 2026"
  },
  {
    id: 6,
    collateral: "Dover, FL",
    type: "New Construction",
    typeSuffix: "New Construction",
    image: "https://images.unsplash.com/photo-1541888009698-fcfe79c85775?auto=format&fit=crop&q=80&w=800",
    description: "This request is for a $450,000 new construction loan, with $125,000 to be funded at closing, secured by a new construction single family proeprty located in Dover, Global. The property will feature a two-story single-family residence with four bedrooms and four bathrooms, totaling 3,745 square feet of living area and a two-car garage, situated on a 1.2-acre lakefront lot backing up to a private lake. The primary exit strategy is a refinance into long-term financing upon completion, though the borrower has stated he would consider a sale if market conditions warrant.",
    loanAmount: "$450,000",
    date: "March 2026"
  }
];

export default function LoanClosings() {
  return (
    <div className="w-full bg-[#fcfdfd] min-h-screen font-sans pb-24 border-t border-gray-100">
      
      {/* Page Header */}
      <div className="pt-24 pb-12 w-full text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-serif">Recent Loan Closings</h1>
        <div className="h-1 w-20 bg-[#c5a059] mx-auto rounded-full"></div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {closingsData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden flex flex-col font-sans transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg border border-gray-100"
            >
              {/* Top Section */}
              <div className="p-6 pb-4">
                <h3 className="text-[#c5a059] text-[22px] font-bold mb-4 font-serif">New Loan Funded</h3>
                <div className="text-slate-600 text-[15px] font-medium leading-tight">
                  <span className="text-[#c5a059] font-bold mr-1">Collateral:</span>
                  <br />
                  <span className="mt-1 inline-block text-slate-900">{item.collateral}</span>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="relative w-full h-[240px]">
                <img src={item.image} alt={item.collateral} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-0 bg-[#c5a059] text-white text-[14px] px-4 py-1.5 rounded-r-full shadow-md z-10 flex items-center font-bold">
                  <span className="mr-1">Type:</span> {item.typeSuffix}
                </div>
              </div>
              
              {/* Description Section */}
              <div className="p-6 pt-5 flex-grow flex flex-col bg-slate-50/50">
                <h4 className="text-[#c5a059] text-[15px] font-bold mb-3 uppercase tracking-wider">Description:</h4>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-6 font-normal flex-grow">
                  {item.description}
                </p>
                <div className="text-[15px] text-slate-600 mt-auto space-y-1 pt-4 border-t border-gray-200">
                  {item.loanAmount && (
                    <div><span className="text-[#c5a059] font-bold mr-1">Loan Amount:</span> <span className="text-slate-900 font-semibold">{item.loanAmount}</span></div>
                  )}
                  {item.date && (
                    <div><span className="text-[#c5a059] font-bold mr-1">Date:</span> <span className="text-slate-900 font-semibold">{item.date}</span></div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      
    </div>
  );
}

