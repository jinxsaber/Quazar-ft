import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Send, CheckCircle, XCircle, Loader2, ExternalLink, Image as ImageIcon } from 'lucide-react';

const QuestionPage = () => {
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState(null);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const userIdRef = useRef(null);

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

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) {
            setMessage({ type: 'error', text: 'Please enter an answer.' });
            return;
        }

        setSubmitting(true); // ✅ Immediately disable the button

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
                // Keep the button disabled on correct answer
            } else {
                setMessage({ type: 'error', text: 'Incorrect answer. Try again.' });
                setSubmitting(false); // ✅ Re-enable for incorrect answer
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            setMessage({ type: 'error', text: 'Submission failed. Try again later.' });
            setSubmitting(false); // ✅ Re-enable on failure
        }
    };

    if (loading) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
                <div className="relative z-10 text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <div className="text-xl font-medium text-slate-600">Loading question...</div>
                </div>
            </div>
        );
    }

    if (questionData) {
        return (
            <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-6 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full border border-white/30">
                                <ImageIcon className="w-4 h-4 text-white" />
                                <span className="text-sm font-semibold text-white tracking-wide">
                                    Question UID: {questionData.UID}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex justify-center items-center bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <img
                                    src={questionData.image_url}
                                    alt={`Question ${questionData.UID}`}
                                    className="rounded-lg shadow-lg max-w-full h-auto object-contain transition duration-300 hover:shadow-xl"
                                    style={{ maxHeight: '70vh', maxWidth: '100%' }}
                                />
                            </div>

                            {questionData.link && (
                                <div className="text-center">
                                    <a
                                        href={questionData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl border border-slate-200 transition duration-300 hover:shadow-md"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>{questionData.link}</span>
                                    </a>
                                </div>
                            )}

                            {message && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                                    message.type === 'success'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                    {message.type === 'success' ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <XCircle className="w-5 h-5" />
                                    )}
                                    <span className="font-medium">{message.text}</span>
                                </div>
                            )}

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="Type your answer here..."
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSubmitAnswer}
                                        disabled={submitting}
                                        className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap
                                            ${submitting
                                                ? 'bg-blue-400 cursor-not-allowed shadow-none text-white'
                                                : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'}
                                        `}
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{submitting ? 'Checking...' : 'Submit'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]"></div>
            <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200 p-8">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Could Not Load Question</h3>
                        <p className="text-slate-600">Please ensure the UID exists and try again.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
