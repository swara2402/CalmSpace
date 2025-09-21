import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import JournalPage from './components/JournalPage';
import ResourcesPage from './components/ResourcesPage';
import CommunityPage from './components/CommunityPage';
import ProfessionalsPage from './components/ProfessionalsPage';
import LoginPage from './components/LoginPage';
import AccountPicker from './components/AccountPicker';
import LandingPage from './components/LandingPage'; // Import the new LandingPage
import SettingsPage from './components/SettingsPage';
import { Page, User } from './types';
import { authService } from './services/authService';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center h-full text-center text-gray-500">
    <div className="p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
          <i className="fas fa-construction text-white text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">This feature is coming soon!</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Companion');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [accountPickerState, setAccountPickerState] = useState<{ isOpen: boolean; users: User[] }>({ isOpen: false, users: [] });
  const [showLandingPage, setShowLandingPage] = useState(!localStorage.getItem('hasVisitedCalmSpace'));

  useEffect(() => {
    const unsubscribe = authService.onStateChange(state => {
      setUser(state.currentUser);
      setAccountPickerState({
        isOpen: state.isPickerOpen,
        users: state.pickerUsers
      });
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBeginJourney = () => {
    localStorage.setItem('hasVisitedCalmSpace', 'true');
    setShowLandingPage(false);
    setActivePage('Companion');
  };

  const handleNavigate = (page: Page) => {
    localStorage.setItem('hasVisitedCalmSpace', 'true');
    setShowLandingPage(false);
    setActivePage(page);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    setActivePage('Companion'); // Navigate to a non-protected page
  };

  const renderPage = () => {
    // Pages requiring authentication
    if (['Journal', 'Community', 'Professionals'].includes(activePage)) {
      if (isAuthLoading) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
          </div>
        );
      }
      if (!user) {
        return <LoginPage />;
      }
    }

    switch (activePage) {
      case 'Companion':
        return <ChatWindow />;
      case 'Journal':
        // We know user is not null here due to the check above
        return <JournalPage user={user!} />;
      case 'Resources':
        return <ResourcesPage user={user} />;
      case 'Community':
        return <CommunityPage user={user!} />;
      case 'Professionals':
        return <ProfessionalsPage user={user!} />;
      case 'Settings':
        return <SettingsPage user={user} />;
      default:
        return <ChatWindow />;
    }
  };

  if (showLandingPage) {
    return <LandingPage onBegin={handleBeginJourney} onNavigate={handleNavigate} />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800 flex overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 p-4 md:p-6 h-full relative z-10">
        <div className="h-full">
          {renderPage()}
        </div>
      </main>
      {accountPickerState.isOpen && (
        <AccountPicker
          users={accountPickerState.users}
          onSelect={authService.selectAccount}
          onCancel={authService.cancelSignIn}
        />
      )}
    </div>
  );
};

export default App;
