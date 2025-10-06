import React, { useState } from 'react';
import { Check, X, Minus, Star, Download, Share2 } from 'lucide-react';
import type { DecisionProduct } from '../../types/decision.types';
import type { ComparisonMatrix as ComparisonMatrixType, ComparisonFeature } from '../../services/comparison-matrix.service';

interface ComparisonMatrixProps {
  matrix: ComparisonMatrixType;
  onExport?: () => void;
  onShare?: () => void;
}

export function ComparisonMatrix({ matrix, onExport, onShare }: ComparisonMatrixProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = Array.from(
    new Set(matrix.features.map(f => f.category))
  );

  const filteredFeatures = selectedCategories.length === 0
    ? matrix.features
    : matrix.features.filter(f => selectedCategories.includes(f.category));

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderFeatureValue = (feature: ComparisonFeature, productId: string) => {
    const value = matrix.values[productId]?.[feature.id];

    switch (feature.type) {
      case 'boolean':
        return value ? (
          <Check className="text-green-500" size={20} />
        ) : (
          <X className="text-red-500" size={20} />
        );

      case 'rating':
        const rating = Number(value) || 0;
        return (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-monks-gray/20'
                }
              />
            ))}
          </div>
        );

      case 'text':
        return (
          <span className="text-sm text-monks-black">
            {value || <Minus className="text-monks-gray/40" size={16} />}
          </span>
        );

      case 'number':
        return (
          <span className="text-sm font-medium text-monks-black">
            {value || <Minus className="text-monks-gray/40" size={16} />}
          </span>
        );

      default:
        return <Minus className="text-monks-gray/40" size={16} />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    const styles = {
      critical: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700',
    };

    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[importance as keyof typeof styles]}`}>
        {importance}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategories.length === 0 || selectedCategories.includes(category)
                  ? 'bg-monks-accent text-white'
                  : 'bg-monks-light-gray text-monks-gray hover:bg-monks-gray/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onExport && (
            <button
              onClick={onExport}
              className="p-2 rounded-lg border border-monks-gray/20 hover:bg-monks-light-gray transition-colors duration-300"
              title="Export to CSV"
            >
              <Download size={18} className="text-monks-gray" />
            </button>
          )}
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 rounded-lg border border-monks-gray/20 hover:bg-monks-light-gray transition-colors duration-300"
              title="Share comparison"
            >
              <Share2 size={18} className="text-monks-gray" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-monks-gray/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-monks-light-gray">
                <th className="py-4 px-6 text-left text-sm font-semibold text-monks-black sticky left-0 bg-monks-light-gray z-10">
                  Feature
                </th>
                {matrix.products.map(product => (
                  <th key={product.id} className="py-4 px-6 text-center min-w-[200px]">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-monks-black">
                        {product.name}
                      </div>
                      <div className="text-xs text-monks-gray">
                        Score: {matrix.scores[product.id] || 0}/100
                      </div>
                      {matrix.winner === product.id && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <Star size={12} className="fill-green-700" />
                          Winner
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-monks-gray/10">
              {Object.entries(
                filteredFeatures.reduce((acc, feature) => {
                  if (!acc[feature.category]) acc[feature.category] = [];
                  acc[feature.category].push(feature);
                  return acc;
                }, {} as Record<string, ComparisonFeature[]>)
              ).map(([category, features]) => (
                <React.Fragment key={category}>
                  <tr className="bg-monks-light-gray/50">
                    <td
                      colSpan={matrix.products.length + 1}
                      className="py-3 px-6 text-sm font-semibold text-monks-black"
                    >
                      {category}
                    </td>
                  </tr>
                  {features.map(feature => (
                    <tr key={feature.id} className="hover:bg-monks-light-gray/30 transition-colors duration-200">
                      <td className="py-4 px-6 sticky left-0 bg-white group-hover:bg-monks-light-gray/30 z-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-monks-black">
                              {feature.name}
                            </span>
                            {getImportanceBadge(feature.importance)}
                          </div>
                          {feature.description && (
                            <p className="text-xs text-monks-gray">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </td>
                      {matrix.products.map(product => (
                        <td key={product.id} className="py-4 px-6 text-center">
                          {renderFeatureValue(feature, product.id)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-monks-light-gray rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-monks-black mb-4">Summary</h3>
        <div className="space-y-4">
          {matrix.products.map(product => {
            const score = matrix.scores[product.id] || 0;
            const isWinner = matrix.winner === product.id;

            return (
              <div key={product.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-monks-black">
                      {product.name}
                    </span>
                    {isWinner && (
                      <Star size={16} className="text-green-500 fill-green-500" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-monks-black">
                    {score}/100
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWinner ? 'bg-green-500' : 'bg-monks-accent'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
