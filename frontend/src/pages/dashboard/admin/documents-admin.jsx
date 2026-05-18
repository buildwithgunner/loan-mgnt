import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, User } from 'lucide-react';
import { apiClient } from '../../../api/client';

export default function DocumentsAdmin() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await apiClient('/admin/documents');
        setDocuments(data?.documents || []);
      } catch (err) {
        console.error('Failed to fetch admin documents', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const filteredDocs = documents.filter(doc => 
    (doc.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (doc.user || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">User Documents</h2>
          <p className="text-slate-500 text-sm font-medium">View all documents uploaded by users.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
          <input
            type="text"
            placeholder="Search by file or user name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a059]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-[10px] text-slate-600 uppercase font-black tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left whitespace-nowrap">File Name</th>
                  <th className="px-6 py-5 text-left whitespace-nowrap">Category</th>
                  <th className="px-6 py-5 text-left whitespace-nowrap">User</th>
                  <th className="px-6 py-5 text-left whitespace-nowrap">Upload Date</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[200px]">{doc.name}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{doc.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-gray-100 text-slate-600">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-2">
                         <User size={14} className="text-slate-400" />
                         <div>
                            <p className="font-bold text-slate-900">{doc.user}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{doc.user_email}</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                       {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 text-right">
                       <a 
                         href={`${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://127.0.0.1:8000'}/storage/${doc.path}`} 
                         target="_blank" 
                         rel="noreferrer" 
                         className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c5a059] hover:text-white transition-all"
                       >
                         <Download size={14} /> View
                       </a>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <FileText size={28} />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        No documents found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Total Documents: {filteredDocs.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
