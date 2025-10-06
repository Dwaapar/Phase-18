import React, { useState, useEffect } from 'react';
import { X, Check, Minus, ExternalLink, Star } from 'lucide-react';
import { marketplaceService } from '../../services/marketplace.service';
import type { ProductComparison as ProductComparisonType } from '../../types/marketplace.types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProductComparisonProps {
  productIds: string[];
  onClose?: () => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  productIds,
  onClose
}) => {
  const [comparison, setComparison] = useState<ProductComparisonType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComparison();
  }, [productIds]);

  const loadComparison = async () => {
    setLoading(true);
    try {
      const data = await marketplaceService.compareProducts(productIds);
      setComparison(data);
    } catch (error) {
      console.error('Error loading comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (product: any) => {
    if (product.pricing_type === 'free') return 'Free';
    if (product.pricing_type === 'freemium') return 'Freemium';
    const price = `$${product.price.toFixed(2)}`;
    if (product.pricing_type === 'subscription') return `${price}/mo`;
    return price;
  };

  const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <Minus className="w-5 h-5 text-slate-300" />
      );
    }
    return <span className="text-slate-900">{value}</span>;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (!comparison || comparison.products.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Compare Products</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-50 rounded-tl-lg">
                  <span className="text-sm font-medium text-slate-500">Feature</span>
                </th>
                {comparison.products.map((product, index) => (
                  <th key={product.id} className={`p-4 bg-slate-50 ${index === comparison.products.length - 1 ? 'rounded-tr-lg' : ''}`}>
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-3">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="primary" className="text-xs">{product.product_type}</Badge>
                            {product.is_featured && (
                              <Badge variant="warning" className="text-xs bg-amber-500">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{product.rating_average.toFixed(1)}</span>
                        <span className="text-slate-500">({product.rating_count})</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-3">
                        {formatPrice(product)}
                      </div>
                      <a
                        href={`/marketplace/products/${product.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Details
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-medium text-slate-700 bg-slate-50">Description</td>
                {comparison.products.map((product) => (
                  <td key={product.id} className="p-4 text-slate-600">
                    {product.description}
                  </td>
                ))}
              </tr>

              {comparison.features.map((feature, index) => (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-700 bg-slate-50">
                    <div>
                      {feature.name}
                      <div className="text-xs text-slate-500 font-normal">{feature.category}</div>
                    </div>
                  </td>
                  {comparison.products.map((product) => (
                    <td key={product.id} className="p-4">
                      {renderValue(feature.values[product.id])}
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="border-b border-slate-200">
                <td className="p-4 font-medium text-slate-700 bg-slate-50">Difficulty Level</td>
                {comparison.products.map((product) => (
                  <td key={product.id} className="p-4">
                    <Badge variant="secondary" className="capitalize">
                      {product.difficulty_level}
                    </Badge>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-slate-200">
                <td className="p-4 font-medium text-slate-700 bg-slate-50">Tags</td>
                {comparison.products.map((product) => (
                  <td key={product.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                          +{product.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {comparison.products.some(p => p.integrations && p.integrations.length > 0) && (
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-medium text-slate-700 bg-slate-50">Integrations</td>
                  {comparison.products.map((product) => (
                    <td key={product.id} className="p-4">
                      {product.integrations && product.integrations.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.integrations.slice(0, 3).map((int) => (
                            <span key={int.id} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                              {int.integration_name}
                            </span>
                          ))}
                          {product.integrations.length > 3 && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                              +{product.integrations.length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>
                  ))}
                </tr>
              )}

              <tr>
                <td className="p-4 font-medium text-slate-700 bg-slate-50 rounded-bl-lg">Actions</td>
                {comparison.products.map((product, index) => (
                  <td key={product.id} className={`p-4 ${index === comparison.products.length - 1 ? 'rounded-br-lg' : ''}`}>
                    <div className="space-y-2">
                      <Button variant="primary" className="w-full">
                        Get Now
                      </Button>
                      {product.demo_url && (
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
