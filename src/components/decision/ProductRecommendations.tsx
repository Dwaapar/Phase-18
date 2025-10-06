import React from 'react';
import { CheckCircle, Star, ExternalLink, TrendingUp } from 'lucide-react';
import type { QuizRecommendation } from '../../types/decision.types';

interface ProductRecommendationsProps {
  recommendations: QuizRecommendation[];
  onSelectProduct?: (productId: string) => void;
}

export default function ProductRecommendations({
  recommendations,
  onSelectProduct,
}: ProductRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No recommendations available</p>
      </div>
    );
  }

  const topRecommendation = recommendations[0];
  const otherRecommendations = recommendations.slice(1);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                Best Match
              </span>
              <span className="px-3 py-1 bg-white text-green-700 rounded-full text-sm font-medium">
                {topRecommendation.confidence}% Confidence
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {topRecommendation.product.name}
            </h3>
            <p className="text-lg text-gray-700 mb-1">by {topRecommendation.product.vendor}</p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(topRecommendation.product.rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {topRecommendation.product.rating} ({topRecommendation.product.review_count}{' '}
                reviews)
              </span>
            </div>
          </div>
          {topRecommendation.product.logo_url && (
            <img
              src={topRecommendation.product.logo_url}
              alt={topRecommendation.product.name}
              className="w-24 h-24 object-contain"
            />
          )}
        </div>

        <p className="text-gray-700 mb-6">{topRecommendation.product.description}</p>

        <div className="bg-white rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Why this is perfect for you:</h4>
          <div className="space-y-2">
            {topRecommendation.reasons.map((reason, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Pros</h5>
            <ul className="space-y-1">
              {topRecommendation.product.pros.slice(0, 3).map((pro, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Cons</h5>
            <ul className="space-y-1">
              {topRecommendation.product.cons.slice(0, 3).map((con, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onSelectProduct?.(topRecommendation.product.id)}
            className="flex-1 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Select This Product
          </button>
          {topRecommendation.product.website_url && (
            <a
              href={topRecommendation.product.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center gap-2"
            >
              Visit Website
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {otherRecommendations.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Other Great Options
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherRecommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {rec.confidence}% Match
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{rec.product.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">by {rec.product.vendor}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(rec.product.rating)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {rec.product.rating} ({rec.product.review_count})
                      </span>
                    </div>
                  </div>
                  {rec.product.logo_url && (
                    <img
                      src={rec.product.logo_url}
                      alt={rec.product.name}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {rec.product.description}
                </p>

                <div className="space-y-2 mb-4">
                  {rec.reasons.slice(0, 2).map((reason, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-blue-500 flex-shrink-0" size={16} />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectProduct?.(rec.product.id)}
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all text-sm"
                  >
                    Select
                  </button>
                  {rec.product.website_url && (
                    <a
                      href={rec.product.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm flex items-center gap-1"
                    >
                      View
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
