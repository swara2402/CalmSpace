import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface SettingsPageProps {
  user: User | null;
}

interface SettingItemProps {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description, children }) => (
  <div className="flex items-center justify-between p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
        <i className={`fas ${icon} text-white`}></i>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
    <div className="flex items-center">
      {children}
    </div>
  </div>
);

const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
  // Settings state with localStorage persistence
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('calmspace-notifications');
    return saved ? JSON.parse(saved) : true;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('calmspace-darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [soundEffects, setSoundEffects] = useState(() => {
    const saved = localStorage.getItem('calmspace-soundEffects');
    return saved ? JSON.parse(saved) : true;
  });

  const [autoSave, setAutoSave] = useState(() => {
    const saved = localStorage.getItem('calmspace-autoSave');
    return saved ? JSON.parse(saved) : true;
  });

  // Apply dark mode to the document with immediate effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log('🌙 Dark mode activated');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('☀️ Light mode activated');
    }
    localStorage.setItem('calmspace-darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handle notification toggle
  const handleNotificationToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('calmspace-notifications', JSON.stringify(newValue));

    if (newValue) {
      console.log('🔔 Notifications enabled');
    } else {
      console.log('🔕 Notifications disabled');
    }
  };

  // Handle dark mode toggle with immediate visual feedback
  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('calmspace-darkMode', JSON.stringify(newValue));

    console.log(newValue ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
  };

  // Handle sound effects toggle
  const handleSoundToggle = () => {
    const newValue = !soundEffects;
    setSoundEffects(newValue);
    localStorage.setItem('calmspace-soundEffects', JSON.stringify(newValue));

    console.log(newValue ? '🔊 Sound effects enabled' : '🔇 Sound effects disabled');
  };

  // Handle auto-save toggle
  const handleAutoSaveToggle = () => {
    const newValue = !autoSave;
    setAutoSave(newValue);
    localStorage.setItem('calmspace-autoSave', JSON.stringify(newValue));

    console.log(newValue ? '💾 Auto-save enabled' : '📝 Auto-save disabled');
  };

  // Export settings data
  const handleExportData = () => {
    const settings = {
      notifications,
      darkMode,
      soundEffects,
      autoSave,
      exportDate: new Date().toISOString(),
      user: user ? user.displayName : 'Guest'
    };

    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `calmspace-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('📁 Settings exported successfully');
  };

  // Clear all data (with confirmation)
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      // Reset all states to defaults
      setNotifications(true);
      setDarkMode(false);
      setSoundEffects(true);
      setAutoSave(true);

      console.log('🗑️ All data cleared');
      alert('All data has been cleared. The page will refresh.');
      window.location.reload();
    }
  };

  return (
    <div className="h-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-green-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 transform rotate-3">
            <i className="fas fa-cog text-white text-3xl"></i>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Customize your CalmSpace experience
          </p>
        </div>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Profile</h2>
          <div className="flex items-center space-x-4">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{user.displayName}</h3>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Items */}
      <div className="space-y-4">
        <SettingItem
          icon="fa-bell"
          title="Notifications"
          description="Receive reminders and updates"
        >
          <button
            onClick={handleNotificationToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              notifications ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                notifications ? 'right-1' : 'left-1'
              }`}
            ></div>
          </button>
        </SettingItem>

        <SettingItem
          icon="fa-moon"
          title="Dark Mode"
          description="Toggle between light and dark themes"
        >
          <button
            onClick={handleDarkModeToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                darkMode ? 'right-1' : 'left-1'
              }`}
            ></div>
          </button>
        </SettingItem>

        <SettingItem
          icon="fa-volume-up"
          title="Sound Effects"
          description="Enable audio feedback for interactions"
        >
          <button
            onClick={handleSoundToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              soundEffects ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                soundEffects ? 'right-1' : 'left-1'
              }`}
            ></div>
          </button>
        </SettingItem>

        <SettingItem
          icon="fa-save"
          title="Auto-Save"
          description="Automatically save your journal entries"
        >
          <button
            onClick={handleAutoSaveToggle}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              autoSave ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                autoSave ? 'right-1' : 'left-1'
              }`}
            ></div>
          </button>
        </SettingItem>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
        <button
          onClick={handleExportData}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-download mr-2"></i>
          Export Data
        </button>
        <button className="flex-1 px-6 py-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-2xl font-semibold border border-white/20 dark:border-gray-700/30 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300">
          <i className="fas fa-question-circle mr-2"></i>
          Help & Support
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800/30">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button
            onClick={handleClearData}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 border border-red-200 dark:border-red-800/30"
          >
            <i className="fas fa-trash mr-2"></i>
            Clear All Data
          </button>
          <p className="text-sm text-red-600 dark:text-red-400">
            This action cannot be undone. All your journal entries and data will be permanently deleted.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-white/20 dark:border-gray-700/30">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          CalmSpace v1.0.0 • Made with ❤️ for mental wellness
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
