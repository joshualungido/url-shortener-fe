import React, { useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../hooks/useQuery";
import { FaLink } from 'react-icons/fa';
import ShortenPopUp from "./ShortenPopUp";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    navigate("/error");
  }

  const { isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);
  
  const { isLoading: loader, data: totalClicks = [] } = useFetchTotalClicks(
    token,
    onError
  );

  return (
    <div className="min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Background matching navbar/footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 lg:px-14 sm:px-8 px-4">
        {loader ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-semibold">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <div className="lg:w-[90%] w-full mx-auto py-12">
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Analytics Dashboard
                  </h1>
                  <p className="text-slate-600">
                    Monitor your link performance and track engagement
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 shadow-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-700">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Section */}
            <div className="h-96 relative mb-8">
              {totalClicks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center max-w-md mx-4">
                    <div className="text-6xl mb-4">📊</div>
                    <h1 className="text-slate-800 font-bold text-2xl mb-3">
                      No Data For This Time Period
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Share your short links to view where your engagements are coming from and start tracking your performance.
                    </p>
                  </div>
                </div>
              )}
              <Graph graphData={totalClicks} />
            </div>

            {/* Create New URL Button */}
            <div className="py-5 sm:text-end text-center">
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
                onClick={() => setShortenPopUp(true)}
              >
                <FaLink className="text-lg" />
                Create a New Short URL
              </button>
            </div>

            {/* URL List Section */}
            <div className="mt-8">
              {!isLoading && myShortenUrls?.length === 0 ? (
                <div className="flex justify-center pt-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center max-w-lg w-full relative overflow-hidden">
                    {/* Glass effect border */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <FaLink className="text-white text-2xl" />
                      </div>
                      <h1 className="text-slate-800 font-bold text-xl mb-2">
                        You haven't created any short link yet
                      </h1>
                      <p className="text-slate-600 mb-6">
                        Start creating short links to track your engagement and analytics
                      </p>
                      <button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
                        onClick={() => setShortenPopUp(true)}
                      >
                        <FaLink className="text-lg" />
                        Create Your First Link
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden">
                  {/* Glass effect border */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                      <h3 className="text-xl font-bold text-slate-800">Your Short Links</h3>
                    </div>
                    {myShortenUrls && (
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {myShortenUrls.length} {myShortenUrls.length === 1 ? 'Link' : 'Links'}
                      </div>
                    )}
                  </div>
                  
                  <ShortenUrlList data={myShortenUrls} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};
export default DashboardLayout;