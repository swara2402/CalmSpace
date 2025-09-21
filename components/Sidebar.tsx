import React from 'react';
import { Page, User } from '../types';

interface NavItemProps {
  icon: string;
  label: Page;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-center md:justify-start w-full p-3 my-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
      active
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
        : 'text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:shadow-md'
    }`}
    aria-current={active ? 'page' : undefined}
  >
    <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
      active
        ? 'bg-white/20 backdrop-blur-sm'
        : 'bg-gray-100/50 dark:bg-gray-700/50 group-hover:bg-white/70 dark:group-hover:bg-gray-600/70'
    }`}>
      <i className={`fas ${icon} text-lg transition-transform duration-300 group-hover:scale-110`}></i>
    </div>
    <span className="hidden md:inline ml-4 font-semibold text-sm tracking-wide">{label}</span>
    {active && (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
    )}
  </button>
);

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  user: User | null;
  onSignOut: () => void;
}

const navItems: { icon: string; label: Page }[] = [
    { icon: "fa-comment-dots", label: "Companion" },
    { icon: "fa-book-open", label: "Journal" },
    { icon: "fa-compass", label: "Resources" },
    { icon: "fa-users", label: "Community" },
    { icon: "fa-user-doctor", label: "Professionals" },
    { icon: "fa-cog", label: "Settings" }
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, user, onSignOut }) => {
  return (
    <aside className="h-full w-16 md:w-72 p-3 md:p-6 bg-gradient-to-b from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-800/40 backdrop-blur-xl border-r border-white/30 dark:border-gray-700/30 flex flex-col items-center shadow-2xl shadow-purple-500/5">
      <div className="flex items-center justify-center h-16 w-full mb-8">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-green-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
        </div>
        <h1 className="hidden md:inline ml-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CalmSpace</h1>
      </div>

      <nav className="w-full space-y-2">
        {navItems.map((item) => (
           <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activePage === item.label}
            onClick={() => setActivePage(item.label)}
           />
        ))}
      </nav>

      <div className="mt-auto w-full pt-6 border-t border-white/30 dark:border-gray-700/30">
         {user ? (
          <div className="flex items-center justify-center md:justify-start p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl">
            <div className="relative">
              <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden md:flex flex-col ml-4 overflow-hidden">
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{user.displayName}</span>
              <button
                onClick={onSignOut}
                className="text-xs text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
              >
                <i className="fas fa-sign-out-alt text-xs"></i>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
           <button
            onClick={() => setActivePage('Journal')}
            className="group flex items-center justify-center md:justify-start w-full p-3 my-2 rounded-2xl text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700/50 dark:to-gray-600/50 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                <i className="fas fa-sign-in-alt text-lg group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <span className="hidden md:inline ml-4 font-semibold text-sm">Sign In to Journal</span>
            </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
