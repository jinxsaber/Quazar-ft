import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionPage = () => {
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error("No authorization token found. Redirecting to login.");
          navigate('/login');
          return;
        }

        // Using UID '2' as per your original request
        const UID = '33';
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API}question/${UID}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        // 🔑 FIX: Access the nested 'data' property from the response body.
        // This aligns with the backend response structure you provided: response.data.data
        const actualQuestionData = response.data.data;
        
        // Check if the nested data exists and has an image_url
        if (actualQuestionData && actualQuestionData.image_url) {
            setQuestionData(actualQuestionData); 
        } else {
            // Handle case where status is 200 but data is empty/malformed
            console.error("Backend returned 200, but question data is missing.");
            navigate('/login');
        }
        
      } catch (err) {
        // This catches network errors or status codes like 401
        console.error("Failed to load question:", err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-600 animate-pulse">
            Loading question...
        </div>
      </div>
    );
  }
  
  if (questionData) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 sm:p-8">
        
        {/* Main Content Area */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 space-y-8">
            
            {/* Centered Image */}
            <div className="flex justify-center items-center p-4">
                <img 
                    src={questionData.image_url} 
                    alt={`Question ${questionData.UID}`} 
                    // Enhanced styling for aesthetic appeal
                    className="rounded-xl shadow-xl max-w-full h-auto object-contain border-4 border-indigo-100 transform transition duration-500 hover:scale-[1.01]" 
                    style={{ maxHeight: '80vh', maxWidth: '100%' }}
                />
            </div>

            {/* Conditional Link */}
            {questionData.link && (
                <div className="text-center">
                    <a 
                        href={questionData.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-full shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                    >
                        {questionData.link}
                    </a>
                </div>
            )}

            {/* Answer Block */}
            <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-inner border border-blue-200 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <input 
                    type="text" 
                    placeholder="Type your answer here..." 
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
                />
                <button 
                    type="button" 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] min-w-[120px]"
                >
                    Submit
                </button>
            </div>
            
        </div>
      </div>
    );
  }

  // Fallback for missing data after loading is complete (e.g., if the backend had an issue)
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50 p-8">
      <div className="text-xl font-semibold text-red-700 p-6 bg-white rounded-lg shadow-lg border-l-4 border-red-500">
          Could not load question data. Please ensure the UID exists.
      </div>
    </div>
  );
};

export default QuestionPage;