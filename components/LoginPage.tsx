import React from 'react';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await authService.signIn();
    } catch (error) {
      console.error("Sign in failed:", error);
      // In a real app, show an error message to the user
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-green-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <i className="fas fa-book-open text-white text-3xl"></i>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Access Your Journal
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your private sanctuary for thoughts and reflections
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 py-6">
          <div className="flex items-center space-x-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-md border border-white/20 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-lock text-white"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Encrypted & Private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your entries are secured with AES encryption</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-md border border-white/20 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-shield-alt text-white"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">PIN Protected</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Only you can access your personal journal</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-md border border-white/20 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-chart-line text-white"></i>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Mood Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visualize your emotional journey over time</p>
            </div>
          </div>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="group w-full flex items-center justify-center space-x-4 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:from-purple-400 disabled:to-blue-400 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSigningIn ? (
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span>Sign in with Google</span>
            </div>
          )}
        </button>

        {/* Privacy notice */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <i className="fas fa-lock text-xs"></i>
            <span>Your privacy is our priority</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            We only access your email and name for authentication. Your journal entries remain completely private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
