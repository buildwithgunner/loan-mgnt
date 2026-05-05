import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Reviews({ user }) {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-6 animate-in zoom-in duration-500">
         <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 mb-8 border border-emerald-500/20">
            <CheckCircle size={48} />
         </div>
         <h2 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">Review Submitted</h2>
         <p className="text-slate-600 text-lg font-medium max-w-md mx-auto leading-relaxed">
            Thank you for your feedback! Your review has been saved in our system.
         </p>
         <button 
           onClick={() => setSubmitted(false)}
           className="bg-[#c5a059] text-white font-black px-12 py-4 rounded-full text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/30 mt-8"
         >
            POST ANOTHER REVIEW
         </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in py-6">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Customer Reviews</h2>
          <p className="text-slate-600 text-sm font-medium">Your Feedback — Black Wolves Acquisition LLC</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-16 relative overflow-hidden shadow-sm">
         <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/5 blur-[100px] pointer-events-none" />
         
         <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="space-y-4 text-center md:text-left">
               <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-widest">Rate Your Experience</h3>
               <p className="text-slate-600 text-sm font-medium">Your feedback helps us improve our services.</p>
               <div className="flex items-center gap-3 justify-center md:justify-start pt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-all hover:scale-125 ${star <= rating ? 'text-[#c5a059]' : 'text-gray-200'}`}
                    >
                      <Star size={32} fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">Your Feedback</label>
               <textarea 
                 rows="6"
                 required
                 placeholder="Enter your detailed feedback here..."
                 className="w-full bg-gray-50 border border-gray-200 rounded-[2rem] px-8 py-6 text-slate-900 font-medium focus:outline-none focus:border-[#c5a059] transition-all placeholder:text-slate-400 resize-none shadow-inner"
               ></textarea>
            </div>

            <div className="flex justify-end pt-4">
               <button 
                 type="submit"
                 className="bg-[#c5a059] text-white font-black px-14 py-5 rounded-full text-xs uppercase tracking-[0.3em] hover:scale-110 transition-all shadow-lg shadow-[#c5a059]/30 flex items-center gap-3"
               >
                 SUBMIT REVIEW <Send size={18} />
               </button>
            </div>
         </form>
      </div>

      {/* Previous Reviews Mock */}
      <div className="space-y-6">
         <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4">Past Reviews</h3>
         <div className="grid grid-cols-1 gap-4">
            {[
               { date: '2024-03-12', text: 'Excellent service. The loan process was very fast and easy.', rating: 5 },
               { date: '2024-02-05', text: 'Great partnership. Highly recommended for real estate investments.', rating: 5 },
            ].map((rev, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between gap-6 shadow-sm">
                  <div className="space-y-2">
                     <div className="flex gap-1 text-[#c5a059] mb-2">
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                     </div>
                     <p className="text-slate-900 font-medium leading-relaxed italic">"{rev.text}"</p>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{rev.date}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
