import React, { useState, useEffect } from 'react';
import { MessageSquare, Filter, Star, Clock, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import { interviewQuestions, interviewCategories } from '../../data/interviewQuestions';
import { InterviewQuestion } from '../../types/tools.types';
import { professionalToolsService } from '../../services/professional-tools.service';
import { useAuth } from '../../contexts/AuthContext';

export default function InterviewPrepPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const filteredQuestions = selectedCategory === 'all'
    ? interviewQuestions
    : interviewQuestions.filter(q => q.category === selectedCategory);

  const handlePractice = (question: InterviewQuestion) => {
    setSelectedQuestion(question);
    setUserAnswer('');
  };

  const handleSubmitAnswer = () => {
    if (selectedQuestion && userAnswer.trim()) {
      setAnsweredQuestions(prev => new Set(prev).add(selectedQuestion.id));
      alert('Great practice! Review the tips and framework for improvement.');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      hard: 'text-red-600 bg-red-100'
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquare size={16} />
            500+ Interview Questions
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Interview Prep Tool</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Practice with common interview questions, learn frameworks like STAR, and get ready to ace your next interview.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{interviewQuestions.length}+</h3>
            <p className="text-slate-600">Interview Questions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{answeredQuestions.size}</h3>
            <p className="text-slate-600">Questions Practiced</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {Math.round((answeredQuestions.size / interviewQuestions.length) * 100)}%
            </h3>
            <p className="text-slate-600">Completion Rate</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {interviewCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-purple-300'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-sm opacity-75">({cat.count})</span>
            </button>
          ))}
        </div>

        {!selectedQuestion ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredQuestions.map(question => (
              <div
                key={question.id}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </div>
                  {answeredQuestions.has(question.id) && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">{question.question}</h3>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <span className="capitalize">{question.category}</span>
                  {question.framework !== 'general' && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-purple-600">{question.framework}</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handlePractice(question)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Practice This Question
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
            <button
              onClick={() => setSelectedQuestion(null)}
              className="text-purple-600 hover:text-purple-700 font-medium mb-6"
            >
              ← Back to Questions
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="text-sm text-slate-600 capitalize">{selectedQuestion.category}</span>
                {selectedQuestion.framework !== 'general' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {selectedQuestion.framework} Framework
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedQuestion.question}</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Your Answer</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={10}
                placeholder="Write your answer here using the framework provided..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-0 resize-none"
              />
              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-slate-200">
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Star size={18} />
                  Tips for Success
                </h3>
                <ul className="space-y-2">
                  {selectedQuestion.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-blue-900 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedQuestion.common_follow_ups.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <MessageSquare size={18} />
                    Common Follow-ups
                  </h3>
                  <ul className="space-y-2">
                    {selectedQuestion.common_follow_ups.map((followUp, idx) => (
                      <li key={idx} className="text-sm text-purple-900 flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{followUp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedQuestion.example_answers && selectedQuestion.example_answers.length > 0 && (
              <div className="mt-6 bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-3">Example Answer</h3>
                <p className="text-sm text-green-900 leading-relaxed">{selectedQuestion.example_answers[0]}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
