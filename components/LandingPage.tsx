import React from 'react';
import { Page } from '../types';

interface LandingPageProps {
  onBegin: () => void;
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBegin, onNavigate }) => {
  return (
    <div className="relative h-screen w-screen flex flex-col text-white font-sans overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/calm-water-surface-at-sunset-free-photo.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-500/20 rounded-full blur-lg animate-float animation-delay-1500"></div>
      </div>

      <header className="relative z-20 p-6 backdrop-blur-md bg-black/10 border-b border-white/10">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">CalmSpace</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {[
              { icon: "fa-comment-dots", label: "Companion" },
              { icon: "fa-book-open", label: "Journal" },
              { icon: "fa-compass", label: "Resources" },
              { icon: "fa-users", label: "Community" },
              { icon: "fa-user-doctor", label: "Professionals" },
              { icon: "fa-cog", label: "Settings" }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.label as Page)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Your mental wellness companion</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                "Your mental health matters, and you deserve to feel peace."
              </span>
            </h2>

            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Welcome to your personal sanctuary for mental wellness and growth. A safe space where you can be yourself, find support, and nurture your wellbeing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center items-center animate-fade-in-up animation-delay-1000">
            <button
              onClick={onBegin}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold text-lg shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Begin Your Journey</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>

            <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-purple-200 animate-fade-in-up animation-delay-2000">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-green-400"></i>
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-heart text-red-400"></i>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-brain text-blue-400"></i>
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
