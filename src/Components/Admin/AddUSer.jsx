import React from 'react';
import { TrashIcon } from '../Icons';

const StaffUsersTab = ({
  token,
  users,
  fetchUsers,
  showAlert,
  showConfirm,
  handleCreateStaff,
  handleDeleteUser,
  staffForm,
  setStaffForm,
  staffError,
  setStaffError,
  staffSuccess,
  setStaffSuccess
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn text-left">
      {/* Create User Form */}
      <div className="lg:col-span-1 glass rounded-2xl border border-slate-200 p-6 shadow-lg h-fit bg-white">
        <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Add Administrative User</h3>
        {staffError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">{staffError}</div>}
        {staffSuccess && <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">{staffSuccess}</div>}

        <form onSubmit={handleCreateStaff} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={staffForm.name}
              onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 placeholder-slate-400 font-medium"
              placeholder="Exam Assistant"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={staffForm.email}
              onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 placeholder-slate-400 font-mono"
              placeholder="staff@collegedrive.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input
              type="password"
              value={staffForm.password}
              onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 placeholder-slate-400 font-medium"
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">System Role</label>
            <select
              value={staffForm.role}
              onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
            >
              <option value="Staff">Staff (Question Management only)</option>
              <option value="Admin">Admin (Full Control)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-100"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Table */}
      <div className="lg:col-span-2 glass rounded-2xl border border-slate-200 p-6 shadow-xl bg-white">
        <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Administrative & Staff Accounts</h3>
        
        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Role</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{u.name}</td>
                  <td className="py-3.5 px-3 font-mono font-medium">{u.email}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      u.role === 'Admin' 
                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {u.email === 'sudip.shankar@gwcdata.ai' ? (
                      <span className="text-xs text-slate-400 font-semibold font-mono">Main Admin</span>
                    ) : (
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="text-red-600 hover:text-red-850 transition-colors cursor-pointer"
                      >
                        <TrashIcon className="w-4 h-4 mx-auto" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffUsersTab;
