import React from 'react';
import { Bookmark, Clock, ArrowRight, Trash2 } from 'lucide-react';
import type { UserDecisionHistory } from '../../types/decision.types';
import { DecisionService } from '../../services/decision.service';

interface DecisionHistoryListProps {
  history: UserDecisionHistory[];
  onRefresh?: () => void;
}

export default function DecisionHistoryList({
  history,
  onRefresh,
}: DecisionHistoryListProps) {
  const [bookmarking, setBookmarking] = React.useState<string | null>(null);

  const handleToggleBookmark = async (item: UserDecisionHistory) => {
    setBookmarking(item.id);
    try {
      await DecisionService.toggleBookmark(item.id, !item.is_bookmarked);
      onRefresh?.();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setBookmarking(null);
    }
  };

  const getDecisionTitle = (item: UserDecisionHistory): string => {
    if (item.quiz_response?.quiz) {
      return item.quiz_response.quiz.title;
    }
    if (item.comparison) {
      return item.comparison.title;
    }
    if (item.guide) {
      return item.guide.title;
    }
    if (item.selected_product) {
      return item.selected_product.name;
    }
    return 'Decision';
  };

  const getDecisionDescription = (item: UserDecisionHistory): string => {
    if (item.quiz_response) {
      const count = item.quiz_response.recommended_products?.length || 0;
      return `Quiz completed with ${count} recommendations`;
    }
    if (item.comparison) {
      return item.comparison.description;
    }
    if (item.guide) {
      return item.guide.description;
    }
    return item.notes || 'No description available';
  };

  const getDecisionType = (item: UserDecisionHistory): string => {
    return item.decision_type.charAt(0).toUpperCase() + item.decision_type.slice(1);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-16">
        <Clock className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Decision History</h3>
        <p className="text-gray-600">
          Your decision history will appear here once you complete quizzes or view comparisons.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {getDecisionType(item)}
                </span>
                <span className="text-sm text-gray-500">{formatDate(item.created_at)}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getDecisionTitle(item)}
              </h3>

              <p className="text-gray-600 mb-4">{getDecisionDescription(item)}</p>

              {item.selected_product && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-green-900">
                    <strong>Selected:</strong> {item.selected_product.name} by{' '}
                    {item.selected_product.vendor}
                  </p>
                </div>
              )}

              {item.notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {item.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View Details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleToggleBookmark(item)}
                disabled={bookmarking === item.id}
                className={`p-2 rounded-lg transition-colors ${
                  item.is_bookmarked
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={item.is_bookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                <Bookmark
                  size={20}
                  fill={item.is_bookmarked ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
