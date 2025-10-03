import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      navigate("/login");
      toast.success("Registeration Successful!")
    } catch (error) {
      console.log(error);
      toast.error("Registeration Failure!")
    } finally {
        setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Background matching navbar/footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-64px)] py-12 lg:px-14 sm:px-8 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Jetly
              </h1>
            </div>
            <p className="text-white/80 text-lg">Join the future of link management</p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit(registerHandler)}
            className="bg-white/95 backdrop-blur-sm shadow-2xl py-8 sm:px-8 px-6 rounded-2xl border border-white/20 relative overflow-hidden"
          >
            {/* Glass effect border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            
            <div className="text-center mb-8">
              <h2 className="font-bold text-3xl text-slate-800 mb-2">
                Create Account
              </h2>
              <p className="text-slate-600">Start shortening URLs in seconds</p>
            </div>
            
            <div className="space-y-6">
              <TextField
                label="Username"
                required
                id="username"
                type="text"
                message="*Username is required"
                placeholder="Choose a unique username"
                register={register}
                errors={errors}
                className="text-slate-700"
              />
              <TextField
                label="Email"
                required
                id="email"
                type="email"
                message="*Email is required"
                placeholder="Enter your email address"
                register={register}
                errors={errors}
                className="text-slate-700"
              />
              <TextField
                label="Password"
                required
                id="password"
                type="password"
                message="*Password is required"
                placeholder="Create a secure password"
                register={register}
                min={6}
                errors={errors}
                className="text-slate-700"
              />
            </div>

            <button
              disabled={loader}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 mt-8"
            >
              {loader ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Register"
              )}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">Login</span>
                </Link>
              </p>
            </div>

            {/* Features highlight */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">⚡</div>
                  <p className="text-xs text-slate-600 font-medium">Lightning Fast</p>
                </div>
                <div className="group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">📊</div>
                  <p className="text-xs text-slate-600 font-medium">Rich Analytics</p>
                </div>
                <div className="group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🔒</div>
                  <p className="text-xs text-slate-600 font-medium">Secure Links</p>
                </div>
              </div>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-6 text-white/60">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span className="text-sm">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;