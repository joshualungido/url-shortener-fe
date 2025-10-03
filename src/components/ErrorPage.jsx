import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

const ErrorPage = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background matching navbar/footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 relative overflow-hidden">
          {/* Glass effect border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse blur-xl opacity-50"></div>
              
              {/* Icon container */}
              <div className="relative w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <FaExclamationTriangle className="text-white text-5xl animate-bounce" style={{animationDuration: '2s'}} />
              </div>
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Oops!
            </span>
          </h1>

          {/* Error Message */}
          <div className="text-center mb-8">
            <p className="text-xl text-slate-700 font-medium mb-2">
              Something went wrong
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
              <p className="text-slate-600 leading-relaxed">
                {message ? message : "An unexpected error has occurred. Please try again or contact support if the problem persists."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <MdRefresh className="text-xl" />
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <FaHome className="text-lg" />
              Go Home
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">
                Need help? Contact our support team
              </p>
              <a 
                href="mailto:support@jetly.com" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
              >
                support@jetly.com
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Error Code: <span className="font-mono text-white/80">500</span> • 
            If this continues, please reach out to us
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;