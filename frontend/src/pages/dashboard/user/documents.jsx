import React, { useState, useEffect } from 'react';
import { Upload, FileText, Download, Search, MoreVertical, CreditCard, Check, X, Image as ImageIcon } from 'lucide-react';
import { apiClient } from '../../../api/client.js';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ID Upload State
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await apiClient('/dashboard/documents');
        setDocuments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const handleIdUpload = async () => {
     if(!idFront || !idBack) return;
     setIsUploading(true);
     try {
         const formDataFront = new FormData();
         formDataFront.append('document', idFront);
         formDataFront.append('category', 'ID Card - Front');
         
         const formDataBack = new FormData();
         formDataBack.append('document', idBack);
         formDataBack.append('category', 'ID Card - Back');

         await apiClient('/dashboard/documents/upload-id', { method: 'POST', body: formDataFront });
         await apiClient('/dashboard/documents/upload-id', { method: 'POST', body: formDataBack });
         
         setUploadSuccess(true);
         setTimeout(() => {
             setUploadSuccess(false);
             setIdFront(null);
             setIdBack(null);
             // reload docs
             apiClient('/dashboard/documents').then(data => setDocuments(data || []));
         }, 3000);
     } catch (err) {
         console.error('Failed to upload ID');
     } finally {
         setIsUploading(false);
     }
  };

  const categories = ['All', 'Underwriting', 'Closing', 'Legal', 'Personal'];

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'All' || doc.category === activeCategory)
  );

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center animate-pulse">
        <div className="w-10 h-10 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">My Documents</h2>
          <p className="text-slate-600 text-sm font-medium">Securely managed files for your loan applications.</p>
        </div>
      </div>

      {/* Identity Verification Section */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-6 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c5a059]/10 rounded-lg text-[#c5a059]">
               <CreditCard size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Identity Verification</h3>
         </div>
         <p className="text-slate-600 text-sm font-medium">Please upload a clear copy of your government-issued ID card (Front & Back).</p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Front Side */}
            <div className="space-y-3">
               <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">ID Card (Front)</label>
               <div className={`relative h-48 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${
                 idFront ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-gray-300 bg-gray-50 hover:border-[#c5a059]/50'
               }`}>
                  {idFront ? (
                    <>
                       <ImageIcon size={32} className="text-[#c5a059]" />
                       <span className="text-xs font-bold text-slate-900">front_id_side.jpg</span>
                       <button onClick={() => setIdFront(null)} className="absolute top-2 right-2 p-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100"><X size={14}/></button>
                    </>
                  ) : (
                    <>
                       <Upload size={24} className="text-slate-400" />
                       <span className="text-[11px] font-bold text-slate-500">Click to Upload Front</span>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setIdFront(e.target.files[0])} />
                    </>
                  )}
               </div>
            </div>

            {/* Back Side */}
            <div className="space-y-3">
               <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">ID Card (Back)</label>
               <div className={`relative h-48 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${
                 idBack ? 'border-[#c5a059] bg-[#c5a059]/10' : 'border-gray-300 bg-gray-50 hover:border-[#c5a059]/50'
               }`}>
                  {idBack ? (
                    <>
                       <ImageIcon size={32} className="text-[#c5a059]" />
                       <span className="text-xs font-bold text-slate-900">back_id_side.jpg</span>
                       <button onClick={() => setIdBack(null)} className="absolute top-2 right-2 p-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100"><X size={14}/></button>
                    </>
                  ) : (
                    <>
                       <Upload size={24} className="text-slate-400" />
                       <span className="text-[11px] font-bold text-slate-500">Click to Upload Back</span>
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setIdBack(e.target.files[0])} />
                    </>
                  )}
               </div>
            </div>
         </div>

         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {uploadSuccess ? (
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                 <Check size={18} /> Identification uploaded for review.
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-medium italic">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
            )}
            <button 
              onClick={handleIdUpload}
              disabled={!idFront || !idBack || isUploading}
              className={`px-8 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-md ${
                !idFront || !idBack || isUploading 
                ? 'bg-gray-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-[#c5a059] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#c5a059]/20'
              }`}
            >
              {isUploading ? 'Uploading...' : 'VERIFY IDENTITY'}
            </button>
         </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full bg-white border border-gray-200 p-1 rounded-2xl flex items-center gap-1 overflow-x-auto scrollbar-hide shadow-sm">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                activeCategory === cat ? 'bg-[#c5a059] text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#c5a059]" />
          <input 
            type="text"
            placeholder="Search files..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-slate-900 uppercase italic">My Files</h3>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{filteredDocs.length} Total Files</span>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredDocs.length > 0 ? filteredDocs.map((doc, i) => (
            <div key={i} className="group px-8 py-5 flex items-center gap-6 hover:bg-gray-50 transition-colors">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                doc.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
              }`}>
                <FileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-[15px] truncate">{doc.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{doc.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{doc.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://127.0.0.1:8000'}/storage/${doc.path}`} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-slate-400 hover:bg-[#c5a059] hover:text-white transition-all">
                  <Download size={16} />
                </a>
                <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-slate-500 text-sm font-medium">
               No documents found in this repository.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
