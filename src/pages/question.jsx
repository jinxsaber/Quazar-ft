import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const QuestionPage = () => {
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const userIdRef = useRef(null); 

    // Update user level
    const updateUserLevel = async (authToken, userId) => {
        try {
            await axios.put(`${import.meta.env.VITE_PUBLIC_API}levels/${userId}`, {}, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            setTimeout(() => {
                navigate(0);
            }, 1500);
        } catch (error) {
            console.error("Failed to update user level:", error);
            setMessage({ type: 'error', text: 'Answer correct, but failed to update level. Please refresh.' });
        }
    };

    // Fetch Question
    useEffect(() => {
        const fetchQuestion = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return navigate('/');

            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                userIdRef.current = userId;

                const levelResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_API}levels/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userLevel = levelResponse.data.level;

                const questionResponse = await axios.get(`${import.meta.env.VITE_PUBLIC_API}question/${userLevel}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const { data: question, isLastQuestion } = questionResponse.data;

                // ✅ Redirect to Congratulations page if last question
                if (isLastQuestion) {
                    navigate('/congratulations');
                    return;
                }

                setQuestionData(question);
                setMessage(null);
                setAnswer('');
            } catch (error) {
                console.error("Failed to load question:", error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [navigate]);

    // Submit answer
    const handleSubmitAnswer = async () => {
        if (!answer.trim()) {
            setMessage({ type: 'error', text: 'Please enter an answer.' });
            return;
        }

        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${import.meta.env.VITE_PUBLIC_API}checkAnswer`, {
                UID: questionData.UID,
                answer: answer.trim()
            }, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Correct answer! Updating level...' });
                await updateUserLevel(authToken, userIdRef.current);
            } else {
                setMessage({ type: 'error', text: 'Incorrect answer. Try again.' });
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            setMessage({ type: 'error', text: 'Submission failed. Try again later.' });
        }
    };

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
        const messageClass = message
            ? message.type === 'success'
                ? 'bg-green-100 text-green-700 border-green-400'
                : 'bg-red-100 text-red-700 border-red-400'
            : '';

        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 sm:p-8">
                <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 space-y-8">
                    <div className="text-center text-lg font-bold text-indigo-700">
                        Current Question UID: {questionData.UID}
                    </div>

                    <div className="flex justify-center items-center p-4">
                        <img
                            src={questionData.image_url}
                            alt={`Question ${questionData.UID}`}
                            className="rounded-xl shadow-xl max-w-full h-auto object-contain border-4 border-indigo-100 transform transition duration-500 hover:scale-[1.01]"
                            style={{ maxHeight: '80vh', maxWidth: '100%' }}
                        />
                    </div>

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

                    {message && (
                        <div className={`p-3 rounded-lg border-l-4 font-medium text-center ${messageClass}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="w-full bg-white p-4 sm:p-6 rounded-xl shadow-inner border border-blue-200 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <input
                            type="text"
                            placeholder="Type your answer here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                            className="flex-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
                        />
                        <button
                            type="button"
                            onClick={handleSubmitAnswer}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-red-50 p-8">
            <div className="text-xl font-semibold text-red-700 p-6 bg-white rounded-lg shadow-lg border-l-4 border-red-500">
                Could not load question data. Please ensure the UID exists.
            </div>
        </div>
    );
};

export default QuestionPage;
