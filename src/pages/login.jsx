import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

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
      // Make sure your backend sends the token in the response body
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}auth/login`,
        formData
      );

      // 🔑 Get the token from the response data
      const token = response.data.token; 
      localStorage.setItem('authToken', token); // Store the token in localStorage

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome Back!
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Log In
        </button>
        {message && (
          <p className="text-green-600 text-sm mt-2 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}
        <div className="mt-4 text-center space-x-4">
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-block px-6 py-2 bg-gray-300 text-black font-semibold text-sm rounded-md border-2 border-gray-400 hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Home
          </button>
          {/* <button
            type="button"
            onClick={handleGoSignup}
            className="inline-block px-6 py-2 bg-green-600 text-white font-semibold text-sm rounded-md border-2 border-green-500 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button> */}
        </div>
      </form>
    </div>
  );
}