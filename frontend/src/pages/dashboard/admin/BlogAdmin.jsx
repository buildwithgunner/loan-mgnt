import React, { useState } from 'react';
import { Plus, Eye, Edit2, Trash2, X } from 'lucide-react';
import { blogPosts as initialPosts } from '../shared/mockData.js';

const CATEGORIES = ['Hard Money', 'Fix & Flip', 'Construction', 'Education', 'Market Insights', 'Strategy', 'Tips', 'Refinancing'];

export default function BlogAdmin() {
  const [posts,   setPosts]   = useState(initialPosts);
  const [showNew, setShowNew] = useState(false);
  const [form,    setForm]    = useState({ title: '', category: '', image: '', content: '' });

  const handleDelete  = (id) => setPosts(p => p.filter(post => post.id !== id));
  const handleField   = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePublish = (status) => {
    if (!form.title.trim()) return;
    setPosts(p => [{
      id: Date.now(),
      title: form.title,
      category: form.category || 'General',
      status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0,
      author: 'Admin',
    }, ...p]);
    setForm({ title: '', category: '', image: '', content: '' });
    setShowNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">Blog Management</h2>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#b08d4a] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* New-post form */}
      {showNew && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 space-y-8 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Create New Post</h3>
            <button onClick={() => setShowNew(false)} className="text-slate-400 hover:text-slate-900 transition-all hover:rotate-90"><X size={24} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Post Title *</label>
              <input
                value={form.title}
                onChange={e => handleField('title', e.target.value)}
                placeholder="Enter post title..."
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            {/* Category */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={e => handleField('category', e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c5a059]"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            {/* Image */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Featured Image URL</label>
              <input
                value={form.image}
                onChange={e => handleField('image', e.target.value)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            {/* Content */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1.5 block">Content / Excerpt</label>
              <textarea
                rows={6}
                value={form.content}
                onChange={e => handleField('content', e.target.value)}
                placeholder="Write your post content here..."
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
            <button
              onClick={() => { setShowNew(false); setForm({ title:'', category:'', image:'', content:'' }); }}
              className="px-8 py-3 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handlePublish('draft')}
              className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-widest transition-all border border-gray-200"
            >
              Save Draft
            </button>
            <button
              onClick={() => handlePublish('published')}
              className="px-10 py-3 bg-[#c5a059] hover:bg-[#b08d4a] text-white text-[10px] font-black rounded-full uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-[#c5a059]/20"
            >
              Publish Post
            </button>
          </div>
        </div>
      )}

      {/* Posts table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[10px] text-slate-600 uppercase font-black tracking-widest border-b border-gray-100">
              <tr>
                {['Post Title', 'Category', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-5 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 max-w-[300px]">
                    <p className="font-bold text-slate-900 text-[15px] truncate">{post.title}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1.5">by {post.author}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-gray-100 text-slate-600 border border-gray-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{post.views.toLocaleString()}</td>
                  <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">{post.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t border-gray-100 text-[10px] font-black text-slate-600 uppercase tracking-widest bg-gray-50">
          {posts.length} Total Posts
        </div>
      </div>
    </div>
  );
}
