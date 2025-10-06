import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDecisionHistory } from '../../hooks/useDecision';
import DecisionHistoryList from '../../components/decision/DecisionHistoryList';
import { Loader, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DecisionHistoryPage() {
  const { user } = useAuth();
  const { history, loading, error, refresh } = useDecisionHistory(user?.id);

  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="text-gray-400" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign In Required</h1>
            <p className="text-lg text-gray-600 mb-8">
              Sign in to view your decision history and saved recommendations.
            </p>
            <Link
              to="/auth/signin"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading History</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={refresh}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Decision History</h1>
          <p className="text-xl text-gray-600">
            Review your past decisions, quizzes, and recommendations
          </p>
        </div>

        <div className="flex gap-6 mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
            All Decisions
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Quizzes
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Comparisons
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">
            Bookmarked
          </button>
        </div>

        <DecisionHistoryList history={history} onRefresh={refresh} />
      </div>
    </div>
  );
}
