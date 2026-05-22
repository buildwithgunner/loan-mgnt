import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Trash2, Check, Mail, Phone, Calendar, MapPin, Inbox, CheckCircle, RefreshCw } from 'lucide-react';
import { getAdminLeads, updateLeadStatus, deleteLead } from '../../../api/admin';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#ffffff',
  color: '#0f172a',
  customClass: {
    popup: 'rounded-3xl border border-gray-100 shadow-xl bg-white',
    confirmButton: 'bg-[#c5a059] text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg',
    cancelButton: 'bg-gray-100 text-slate-600 font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('new_inquiry'); // 'new_inquiry', 'contacted', 'all'

  const fetchMessages = async (selectFirst = false) => {
    try {
      setLoading(true);
      const res = await getAdminLeads();
      // Filter leads to find contact form submissions (which have 'new_inquiry' or 'contacted' status)
      // Or general leads that have a purpose/message
      const inquiries = (res.leads || []).filter(lead => 
        lead.status === 'new_inquiry' || 
        lead.status === 'contacted' ||
        (lead.purpose && lead.purpose.includes('Subject:'))
      );
      setMessages(inquiries);
      
      if (inquiries.length > 0) {
        if (selectFirst || !selectedMessage) {
          setSelectedMessage(inquiries[0]);
        } else {
          // Update selected message reference with new data
          const updatedSelected = inquiries.find(m => m.id === selectedMessage.id);
          setSelectedMessage(updatedSelected || inquiries[0]);
        }
      } else {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(true);
  }, []);

  const handleMarkContacted = async (id) => {
    try {
      await updateLeadStatus(id, 'contacted');
      Toast.fire({
        title: 'MESSAGE PROCESSED',
        text: 'Inquiry marked as contacted successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      fetchMessages();
    } catch (err) {
      Toast.fire({
        title: 'PROTOCOL ERROR',
        text: 'Failed to update inquiry status.',
        icon: 'error'
      });
    }
  };

  const handleDeleteMessage = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this message removal!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await deleteLead(id);
        Toast.fire({
          title: 'DELETED',
          text: 'The inquiry has been deleted permanently.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        
        // If the deleted message was selected, clear it or select first
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
        fetchMessages(true);
      } catch (err) {
        Toast.fire({
          title: 'PROTOCOL ERROR',
          text: 'Failed to delete inquiry.',
          icon: 'error'
        });
      }
    }
  };

  // Parser helper to extract fields from packed purpose string
  const parsePurpose = (lead = {}) => {
    const purpose = lead.purpose || '';
    const result = {
      subject: lead.subject || lead.loan_type || 'Contact Inquiry',
      message: lead.message_body || '',
      address: lead.address || ''
    };

    if (!purpose) {
      result.message = result.message || 'No message content.';
      return result;
    }

    const subjectMatch = purpose.match(/Subject:\s*([^\n]+)/i);
    const messageMatch = purpose.match(/Message:\s*([\s\S]+?)(?=\nAddress:|$)/i);
    const addressMatch = purpose.match(/Address:\s*([\s\S]+)/i);

    if (subjectMatch) result.subject = subjectMatch[1].trim();
    if (messageMatch) result.message = messageMatch[1].trim();
    if (addressMatch) result.address = addressMatch[1].trim();

    // Fallback if structure is raw
    if (!result.message && !subjectMatch && !messageMatch && !addressMatch) {
      result.message = purpose;
    }

    result.message = result.message || 'No message content.';
    return result;
  };

  // Filter messages based on tab/status and search query
  const filteredMessages = messages.filter(msg => {
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : msg.status === statusFilter;
      
    const parsed = parsePurpose(msg);
    const matchesSearch = 
      (msg.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      parsed.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parsed.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] tracking-tighter uppercase italic">Contact Inquiries</h2>
          <p className="text-slate-500 text-sm font-medium">Manage user inquiries and messages from the public site.</p>
        </div>
        <button 
          onClick={() => fetchMessages()}
          className="flex items-center justify-center gap-2 border border-slate-200 hover:border-[#c5a059] text-slate-600 hover:text-[#c5a059] px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all bg-white shadow-sm"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> REFRESH
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex gap-2 w-full lg:w-auto">
          {[
            { id: 'new_inquiry', label: 'Unread Inquiries' },
            { id: 'contacted', label: 'Archived / Read' },
            { id: 'all', label: 'All Messages' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex-1 lg:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                statusFilter === tab.id
                  ? 'bg-[#c5a059] text-white shadow-sm'
                  : 'text-slate-500 hover:text-[#c5a059] hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#c5a059] transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search sender, email, subject..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Inbox Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {loading ? (
          <div className="lg:col-span-12 bg-white rounded-3xl border border-gray-100 shadow-sm py-24 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a059] mx-auto mb-4"></div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Opening Secure Inbox...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="lg:col-span-12 bg-white rounded-3xl border border-gray-100 shadow-sm py-24 text-center">
            <Inbox size={48} className="mx-auto mb-4 text-slate-300 stroke-[1.5]" />
            <p className="text-sm font-semibold text-slate-400">No public inquiries found in the database.</p>
            <p className="text-xs text-slate-400 mt-1">Make sure the database connection is healthy and you have inquiries.</p>
          </div>
        ) : (
          <>
            {/* Left Pane: Inbox List */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="p-5 border-b border-gray-100 bg-slate-50/50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Showing {filteredMessages.length} Messages
                </span>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
                {filteredMessages.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 text-xs">
                    No matching inquiries match filters.
                  </div>
                ) : (
                  filteredMessages.map(msg => {
                    const parsed = parsePurpose(msg);
                    const isSelected = selectedMessage && selectedMessage.id === msg.id;
                    const isNew = msg.status === 'new_inquiry';
                    const dateObj = new Date(msg.created_at);
                    
                    return (
                      <div 
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-5 cursor-pointer transition-all relative ${
                          isSelected 
                            ? 'bg-[#c5a059]/5 border-l-4 border-[#c5a059]' 
                            : 'hover:bg-slate-50/70 border-l-4 border-transparent'
                        }`}
                      >
                        {/* New indicator dot */}
                        {isNew && (
                          <div className="absolute top-6 right-5 w-2.5 h-2.5 bg-[#c5a059] rounded-full shadow-sm animate-pulse" />
                        )}

                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="font-bold text-slate-900 text-sm truncate pr-4">
                            {msg.name}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-mono flex-shrink-0">
                            {dateObj.toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-[#c5a059] mb-1 truncate">
                          {parsed.subject}
                        </p>
                        
                        <p className="text-xs text-slate-500 line-clamp-2 pr-6">
                          {parsed.message}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isNew 
                              ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}>
                            {isNew ? 'New Inquiry' : 'Contacted'}
                          </span>
                          {msg.phone && (
                            <span className="text-[9px] text-slate-400 flex items-center gap-1 font-mono">
                              <Phone size={10} /> {msg.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Pane: Reading Viewer */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
              {selectedMessage ? (
                (() => {
                  const parsed = parsePurpose(selectedMessage);
                  const isNew = selectedMessage.status === 'new_inquiry';
                  const dateObj = new Date(selectedMessage.created_at);

                  return (
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
                            Sender Details
                          </span>
                          <h3 className="text-lg font-black text-slate-900 mt-1 uppercase">
                            {selectedMessage.name}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          {isNew && (
                            <button
                              onClick={() => handleMarkContacted(selectedMessage.id)}
                              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm"
                            >
                              <Check size={14} /> MARK CONTACTED
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(selectedMessage.id)}
                            className="flex items-center gap-1.5 border border-red-100 hover:bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                          >
                            <Trash2 size={14} /> REMOVE
                          </button>
                        </div>
                      </div>

                      {/* Contact metadata bar */}
                      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                        <a 
                          href={`mailto:${selectedMessage.email}`}
                          className="flex items-center gap-2 text-slate-600 hover:text-[#c5a059] transition-colors"
                        >
                          <Mail size={14} className="text-[#c5a059]" />
                          <span className="font-medium underline">{selectedMessage.email}</span>
                        </a>
                        {selectedMessage.phone && (
                          <a 
                            href={`tel:${selectedMessage.phone}`}
                            className="flex items-center gap-2 text-slate-600 hover:text-[#c5a059] transition-colors"
                          >
                            <Phone size={14} className="text-[#c5a059]" />
                            <span className="font-mono">{selectedMessage.phone}</span>
                          </a>
                        )}
                        <div className="flex items-center gap-2 text-slate-500 font-mono">
                          <Calendar size={14} className="text-[#c5a059]" />
                          <span>{dateObj.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Message Content Area */}
                      <div className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-thin">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">
                            Subject
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 border-l-4 border-[#c5a059] pl-3 leading-relaxed">
                            {parsed.subject}
                          </h4>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">
                            Message
                          </span>
                          <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 text-sm leading-relaxed whitespace-pre-line border border-slate-100 italic shadow-inner">
                            "{parsed.message}"
                          </div>
                        </div>

                        {parsed.address && (
                          <div className="pt-4 border-t border-gray-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5 mb-2">
                              <MapPin size={12} className="text-[#c5a059]" /> Sender Location / Address
                            </span>
                            <p className="text-xs font-semibold text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100 inline-block">
                              {parsed.address}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                  <Inbox size={48} className="mx-auto mb-4 text-slate-300 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-slate-400">Select an inquiry from the inbox</p>
                  <p className="text-xs text-slate-400 mt-1">Choose a message from the list on the left to read its full detail.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
