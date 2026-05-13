import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, X, Save, User as UserIcon, Mail, Phone, Shield, BadgeCheck, Clock, AlertCircle, ShieldOff } from 'lucide-react';
import { getAdminUsers, updateAdminUser, deleteAdminUser, activateUser, deactivateUser } from '../../../api/admin';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  background: '#0c1a24',
  color: '#ffffff',
  customClass: {
    popup: 'rounded-3xl border border-gray-100 shadow-xl bg-white',
    confirmButton: 'bg-[#c5a059] text-white font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg',
    cancelButton: 'bg-gray-100 text-slate-600 font-black px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gray-200 transition-all'
  },
  buttonsStyling: false
});
import UserProfileDetail from './UserProfileDetail.jsx';
import davidImg from '../../../assets/team/david.jpg';
import sarahImg from '../../../assets/team/sarah.jpg';
import michaelImg from '../../../assets/team/michael.jpg';

const TEAM_PHOTOS = [davidImg, sarahImg, michaelImg];

export default function UserManagement() {
  const [search, setSearch]   = useState('');
  const [users,  setUsers]    = useState([]);
  const [filter, setFilter]   = useState('all');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'requests'

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAdminUsers();
      setUsers(res.users.map((u, i) => ({
          ...u,
          avatar: TEAM_PHOTOS[i % 3],
          joined: new Date(u.created_at).toLocaleDateString(),
          apps: u.applications_count || 0,
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const pendingRequests = users.filter(u => u.activation_requested && !u.is_active);

  const filtered = users.filter(u => {
    const matchSearch = (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || u.role === filter;
    return matchSearch && matchFilter;
  });

  const handleDelete = async (id) => {
    const result = await Toast.fire({
      title: 'TERMINATE ACCOUNT?',
      text: "This action will permanently delete this user and all associated data.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES, DELETE',
      cancelButtonText: 'CANCEL'
    });

    if (result.isConfirmed) {
      try {
        await deleteAdminUser(id);
        Toast.fire({ title: 'USER DELETED', text: 'Account removed from registry.', icon: 'success', timer: 2000, showConfirmButton: false });
        fetchUsers();
      } catch (error) {
        Toast.fire({ title: 'ERROR', text: 'Failed to terminate account.', icon: 'error' });
      }
    }
  };

  const handleEditClick = (u) => {
    setEditingUser({ ...u });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await updateAdminUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
        role: editingUser.role || 'user'
      });
      Toast.fire({ title: 'UPDATE SUCCESS', text: 'User profile synchronized.', icon: 'success', timer: 2000, showConfirmButton: false });
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      Toast.fire({ title: 'SYNC ERROR', text: 'Failed to update user.', icon: 'error' });
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateUser(id);
      Toast.fire({ title: 'ACCOUNT ACTIVATED', text: 'User now has full access.', icon: 'success', timer: 2000, showConfirmButton: false });
      fetchUsers();
    } catch (error) {
      Toast.fire({ title: 'ERROR', text: 'Failed to activate account.', icon: 'error' });
    }
  };

  const handleDeactivate = async (id) => {
    const result = await Toast.fire({
      title: 'DEACTIVATE ACCOUNT?',
      text: 'This will restrict the user\'s access.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'DEACTIVATE',
      cancelButtonText: 'CANCEL'
    });
    if (!result.isConfirmed) return;
    try {
      await deactivateUser(id);
      Toast.fire({ title: 'ACCOUNT DEACTIVATED', text: 'User access has been restricted.', icon: 'success', timer: 2000, showConfirmButton: false });
      fetchUsers();
    } catch (error) {
      Toast.fire({ title: 'ERROR', text: 'Failed to deactivate account.', icon: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#c5a059] uppercase italic tracking-tighter">User Management</h2>
          <p className="text-slate-500 text-sm font-medium">Manage user accounts, permissions, and activations.</p>
        </div>
      </div>

      {/* ── Activation Requests Panel ── */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl overflow-hidden shadow-sm animate-in slide-in-from-top duration-300">
          <div className="px-8 py-5 bg-amber-100 border-b border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-white">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-amber-900 font-black uppercase text-xs tracking-widest">Activation Requests</p>
                <p className="text-amber-700 text-[10px] font-bold">{pendingRequests.length} user{pendingRequests.length > 1 ? 's' : ''} awaiting account activation</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-400 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
              {pendingRequests.length} Pending
            </span>
          </div>
          <div className="divide-y divide-amber-100">
            {pendingRequests.map((u) => (
              <div key={u.id} className="px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/80 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-300" />
                  <div>
                    <p className="font-bold text-slate-900">{u.name}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{u.email}</p>
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      Requested: {u.activation_requested_at ? new Date(u.activation_requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProfileId(u.id)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:border-[#c5a059] hover:text-[#c5a059] transition-all shadow-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleActivate(u.id)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:scale-105 transition-all shadow-md shadow-emerald-200"
                  >
                    <BadgeCheck size={14} className="inline mr-1" /> Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex gap-1.5 p-1.5 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm w-fit">
        {[
          { key: 'all', label: 'All Users' },
          { key: 'requests', label: `Activation Requests ${pendingRequests.length > 0 ? `(${pendingRequests.length})` : ''}` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.key ? 'bg-[#c5a059] text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters + Search */}
      {activeTab === 'all' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-1.5 p-1.5 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
            {['all', 'user', 'admin'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-[#c5a059] text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                {f}s
              </button>
            ))}
          </div>
        </div>
      )}

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
                  {['User ID', 'User Details', 'Phone', 'Role', 'Status', 'Apps', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-5 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(activeTab === 'requests' ? pendingRequests : filtered).map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-[10px] text-slate-500">#USR-{u.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#c5a059]/30" />
                          {/* Activation status dot */}
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            u.is_active ? 'bg-emerald-500' : u.activation_requested ? 'bg-amber-400' : 'bg-slate-300'
                          }`} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 whitespace-nowrap">{u.name}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap text-xs">{u.phone || '—'}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        u.role === 'admin'
                          ? 'bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20'
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {u.role || 'User'}
                      </span>
                    </td>
                    {/* Activation status */}
                    <td className="px-6 py-5">
                      {u.is_active ? (
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                          <BadgeCheck size={11} /> Active
                        </span>
                      ) : u.activation_requested ? (
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit animate-pulse">
                          <Clock size={11} /> Pending
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full w-fit">
                          <AlertCircle size={11} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[#c5a059] text-xs">
                        {u.apps}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-[11px] font-black uppercase tracking-widest whitespace-nowrap">{u.joined}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedProfileId(u.id)}
                          className="p-2 rounded-xl bg-gray-100 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                          title="View Profile"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleEditClick(u)}
                          className="p-2 rounded-xl bg-gray-100 text-slate-500 hover:text-[#c5a059] hover:bg-[#c5a059]/10 transition-all"
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </button>
                        {/* Activate / Deactivate toggle */}
                        {u.is_active ? (
                          <button
                            onClick={() => handleDeactivate(u.id)}
                            className="p-2 rounded-xl bg-gray-100 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
                            title="Deactivate Account"
                          >
                            <ShieldOff size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(u.id)}
                            className="p-2 rounded-xl bg-gray-100 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                            title="Activate Account"
                          >
                            <BadgeCheck size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-2 rounded-xl bg-gray-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(activeTab === 'requests' ? pendingRequests : filtered).length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-8 py-20 text-center">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <BadgeCheck size={28} />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {activeTab === 'requests' ? 'No pending activation requests' : 'No users found'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              Total Users: {users.length}
            </p>
            {pendingRequests.length > 0 && (
              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                {pendingRequests.length} Pending Activation{pendingRequests.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Profile Detail Slide-over */}
      {selectedProfileId && (
        <UserProfileDetail
          userId={selectedProfileId}
          onClose={() => setSelectedProfileId(null)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40">
           <div className="bg-white border border-gray-200 rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-[#c5a059] to-[#e6c98a] p-8 text-[#05101c] relative">
                <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors hover:rotate-90">
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-black tracking-tight uppercase italic">Edit User</h3>
                <p className="text-[#05101c]/80 text-[10px] font-black uppercase tracking-widest mt-1">User ID: #USR-{editingUser.id}</p>
            </div>

              <div className="p-8 space-y-6">
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                  <div className="relative group">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
                    <input
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                      value={editingUser.name}
                      onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                    />
                  </div>
               </div>

                 <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
                    <input
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                      value={editingUser.email}
                      onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                    />
                  </div>
               </div>

                 <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Phone</label>
                    <div className="relative group">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
                      <input
                        className="w-full pl-9 pr-3 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-slate-900 text-xs focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                        value={editingUser.phone || ''}
                        onChange={e => setEditingUser({...editingUser, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Role</label>
                    <div className="relative group">
                      <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#c5a059]" />
                      <select
                        className="w-full pl-9 pr-3 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-slate-900 text-xs appearance-none focus:outline-none focus:border-[#c5a059] transition-all shadow-sm"
                        value={editingUser.role || 'user'}
                        onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                      >
                        <option value="user" className="bg-white">User</option>
                        <option value="admin" className="bg-white">Admin</option>
                      </select>
                    </div>
                  </div>
               </div>

                 <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-4 text-slate-500 font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="flex-[2] py-4 bg-[#c5a059] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-lg shadow-[#c5a059]/20"
                  >
                    SAVE CHANGES
                  </button>
               </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
