import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 z-50 flex items-center sticky top-0 relative overflow-hidden">
      {/* Custom gradient background matching footer */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Glass effect border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
        <a href="/" className="flex items-center group">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
            Jetly
          </h1>
        </a>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-lg ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          } transition-all duration-300 sm:h-fit sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
          style={{
            background: navbarOpen
              ? "linear-gradient(135deg, rgb(15 23 42), rgb(30 58 138), rgb(67 56 202))"
              : "none",
          }}
        >
          <li className="hover:text-blue-400 font-medium transition-all duration-200">
            <a
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              } hover:text-blue-400`}
              href="/"
            >
              Home
            </a>
          </li>
          <li className="hover:text-blue-400 font-medium transition-all duration-200">
            <a
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              } hover:text-blue-400`}
              href="/about"
            >
              About
            </a>
          </li>
          {token && (
            <li className="hover:text-blue-400 font-medium transition-all duration-200">
              <a
                className={`${
                  path === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                } hover:text-blue-400`}
                href="/dashboard"
              >
                Dashboard
              </a>
            </li>
          )}
          {!token && (
            <a href="/register">
              <li className="sm:ml-0 -ml-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer w-24 text-center font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Sign Up
              </li>
            </a>
          )}
          {token && (
            <button
              onClick={onLogOutHandler}
              className="sm:ml-0 -ml-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Log Out
            </button>
          )}
        </ul>

        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
        >
          {navbarOpen ? (
            <span className="text-white text-3xl">✕</span>
          ) : (
            <span className="text-white text-3xl">☰</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
