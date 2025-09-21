import React, { useState } from 'react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="p-6 border-t border-white/30 dark:border-gray-700/30 bg-gradient-to-r from-white/20 to-purple-50/20 dark:from-gray-900/20 dark:to-purple-900/20 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share what's on your mind..."
            disabled={isLoading}
            className="w-full px-6 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/40 dark:border-gray-600/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 shadow-lg shadow-gray-900/5 pr-16"
            autoComplete="off"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-smile text-gray-400 text-lg"></i>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl flex items-center justify-center hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 disabled:from-purple-400 disabled:to-blue-400 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <i className="fas fa-paper-plane text-lg transform rotate-12"></i>
          )}
        </button>
      </form>

      <div className="mt-3 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <i className="fas fa-lock"></i>
          <span>Your conversations are private and secure</span>
        </div>
      </div>
    </div>
  );
};

export default InputBar;
