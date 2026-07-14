import React, { useState } from 'react';
import { 
  UserIcon, 
  GraduationCapIcon, 
  SettingsIcon, 
  BookOpenIcon, 
  LogOutIcon 
} from '../Icons';

const Sidebar = ({ activeTab, setActiveTab, isAdmin, logout, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    ...(isAdmin ? [
      { id: 'overview', label: 'Overview', icon: SettingsIcon },
      { id: 'students', label: 'Students', icon: GraduationCapIcon },
      { id: 'users', label: 'Staff Users', icon: UserIcon },
      { id: 'batches', label: 'Batches', icon: BookOpenIcon }
    ] : []),
    { id: 'questions', label: 'Manage Questions', icon: BookOpenIcon }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE HEADER BAR */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <img src="/image.png" alt="GWC Logo" className="h-10 object-contain" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg cursor-pointer"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:z-10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Upper Portion */}
        <div className="flex flex-col flex-1">
          {/* Logo & Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <img src="/image.png" alt="GWC Logo" className="h-12 object-contain" />
            <button 
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* User Info Card */}
          <div className="p-4 mx-4 my-3 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center space-x-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-slate-800 truncate">{user?.name || 'Administrator'}</span>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{user?.role}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-3 space-y-1 flex-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800' }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Portion (Logout button) */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => { setIsOpen(false); logout(); }}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-all cursor-pointer text-sm font-bold shadow-sm"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
