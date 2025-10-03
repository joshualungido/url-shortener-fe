import React, { useState, useEffect } from "react";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const [urlInput, setUrlInput] = useState("");
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    links: 0,
    clicks: 0,
    users: 0,
  });

  // Animate stats on component mount
  useEffect(() => {
    const targets = { links: 250000, clicks: 5200000, users: 45000 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        links: Math.floor(targets.links * progress),
        clicks: Math.floor(targets.clicks * progress),
        users: Math.floor(targets.users * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleShorten = () => {
    if (!urlInput.trim()) return;

    setIsShortening(true);
    setTimeout(() => {
      setShortenedUrl(`jetly.co/${Math.random().toString(36).substr(2, 8)}`);
      setIsShortening(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Generate short URLs in milliseconds with our optimized infrastructure and global CDN network.",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description:
        "Track clicks, locations, devices, and referrers with real-time analytics and detailed insights.",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, SSL certificates, and advanced threat protection for all your links.",
    },
    {
      icon: "🎯",
      title: "Smart Targeting",
      description:
        "Redirect users based on location, device, or custom rules for personalized experiences.",
    },
  ];

  const companies = [
    "TechCorp",
    "DataFlow",
    "CloudSync",
    "LinkMaster",
    "WebScale",
    "NetForce",
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 lg:px-14 sm:px-8 px-4">
        {/* Hero Section */}
        <div className="lg:flex-row flex-col lg:py-16 pt-16 pb-8 lg:gap-16 gap-12 flex justify-between items-center">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🚀 New: Advanced Analytics Dashboard
            </div>

            <h1 className="font-bold text-slate-800 lg:text-6xl md:text-5xl text-4xl lg:leading-[70px] md:leading-[55px] leading-tight mb-6">
              Shorten URLs,
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Amplify
              </span>{" "}
              Results
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Transform long, unwieldy URLs into powerful, trackable short
              links. Built for modern teams who need speed, analytics, and
              reliability.
            </p>

            {/* URL Shortener Tool */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter your long URL here..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                />
                <button
                  onClick={handleShorten}
                  disabled={isShortening || !urlInput.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  {isShortening ? "Shortening..." : "Shorten URL"}
                </button>
              </div>

              {shortenedUrl && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 mb-1">
                        Your shortened URL:
                      </p>
                      <p className="font-mono text-green-800 font-semibold">
                        {shortenedUrl}
                      </p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                Get Started Free
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 w-full sm:w-auto">
                View Demo
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-md border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">
                    Link Dashboard
                  </h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Mock links */}
                <div className="space-y-3">
                  {[
                    {
                      original: "https://example.com/very-long-url...",
                      short: "jetly.co/abc123",
                      clicks: "1.2k",
                    },
                    {
                      original: "https://another-site.com/even-longer...",
                      short: "jetly.co/xyz789",
                      clicks: "856",
                    },
                    {
                      original: "https://marketing-campaign.com/su...",
                      short: "jetly.co/mkt001",
                      clicks: "2.1k",
                    },
                  ].map((link, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 truncate">
                            {link.original}
                          </p>
                          <p className="font-medium text-blue-600 text-sm">
                            {link.short}
                          </p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-xs text-gray-500">clicks</p>
                          <p className="font-semibold text-gray-800">
                            {link.clicks}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                📈
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-indigo-500 text-white p-3 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🔗
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {animatedStats.links.toLocaleString()}+
              </div>
              <p className="text-gray-600 font-medium">Links Shortened</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {animatedStats.clicks.toLocaleString()}+
              </div>
              <p className="text-gray-600 font-medium">Total Clicks</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {animatedStats.users.toLocaleString()}+
              </div>
              <p className="text-gray-600 font-medium">Happy Users</p>
            </div>
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="text-center mb-16">
          <p className="text-slate-600 font-medium mb-8">
            Trusted by teams at leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-gray-100"
              >
                <span className="font-semibold text-gray-700">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Jetly?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              More than just URL shortening. Get powerful tools that help you
              understand and optimize your link performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-15 16c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Links?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of marketers, developers, and businesses who trust
              Jetly for their link management needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Simple. Fast. Powerful.
            </h2>
            <p className="text-xl text-slate-600">
              Get started in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Paste Your URL",
                desc: "Simply paste any long URL into our shortener",
              },
              {
                step: "02",
                title: "Customize & Generate",
                desc: "Add custom alias, set expiration, or use our smart generator",
              },
              {
                step: "03",
                title: "Share & Track",
                desc: "Share your short link and monitor performance in real-time",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-gradient-to-r from-blue-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
