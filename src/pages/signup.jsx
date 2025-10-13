import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignupForm() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    accountType: "Student",
    password: "",
    confirmPassword: "",
  });

  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_API}api/v1/auth/signup`, formData);
      setMessage(response.data.message);
      console.log("fsfsfasfasfas");
      setTimeout(() => {
        navigate("/LoginForm"); 
      }, 2000);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        accountType: "Student",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    }
  };

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Sign Up
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="ECE">Branch Select</option>
          <option value="ECE(IOT)">ECE (IOT)</option>
          <option value="CSE">CSE</option>
          <option value="ME">ME</option>
          <option value="CHE">CHE</option>
          <option value="CE">CE</option>
          <option value="BBA">BBA</option>
          <option value="EE">EE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Account
        </button>

        {message && (
          <p className="text-green-600 text-sm mt-2 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}

