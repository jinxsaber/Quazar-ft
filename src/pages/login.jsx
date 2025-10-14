import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}auth/login`,
        formData
      );

      const token = response.data.token;
      localStorage.setItem('authToken', token);

      setMessage(response.data.message || "Login successful!");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        navigate("/q");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setError(msg);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoSignup = () => {
    navigate("/SignupForm");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-sky-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-slate-200 space-y-6"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 border border-blue-200">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-slate-600 mt-2">Sign in to continue your journey</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
        >
          Sign In
        </button>

        {message && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm text-center font-medium">{message}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}
