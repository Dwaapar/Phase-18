import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Heart, ExternalLink, Shield } from 'lucide-react';
import type { MarketplaceProduct } from '../../types/marketplace.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: MarketplaceProduct;
  onWishlistToggle?: (productId: string) => void;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  showCategory = true
}) => {
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle?.(product.id);
  };

  const formatPrice = () => {
    if (product.pricing_type === 'free') return 'Free';
    if (product.pricing_type === 'freemium') return 'Freemium';
    const price = `$${product.price.toFixed(2)}`;
    if (product.pricing_type === 'subscription') return `${price}/mo`;
    return price;
  };

  const getProductTypeColor = () => {
    switch (product.product_type) {
      case 'workflow': return 'blue';
      case 'agent': return 'purple';
      case 'asset': return 'green';
      case 'service': return 'orange';
      case 'tool': return 'pink';
      default: return 'gray';
    }
  };

  const getDifficultyColor = () => {
    switch (product.difficulty_level) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'orange';
      case 'expert': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Link
      to={`/marketplace/products/${product.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <ExternalLink className="w-12 h-12" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          {product.is_featured && (
            <Badge variant="success" className="bg-amber-500 text-white">
              Featured
            </Badge>
          )}
          <Badge variant={getProductTypeColor() as any}>
            {product.product_type}
          </Badge>
        </div>

        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${product.is_in_wishlist ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
            {showCategory && product.category && (
              <p className="text-xs text-slate-500">{product.category.name}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-slate-900">{formatPrice()}</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-900">{product.rating_average.toFixed(1)}</span>
            <span>({product.rating_count})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>{(product.install_count / 1000).toFixed(1)}k</span>
          </div>
          <Badge variant={getDifficultyColor() as any} className="text-xs py-0.5">
            {product.difficulty_level}
          </Badge>
        </div>

        {product.seller && (
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {product.seller.name.charAt(0)}
            </div>
            <span className="text-sm text-slate-600 flex items-center gap-1">
              {product.seller.name}
              {product.seller.verified && (
                <Shield className="w-3 h-3 text-blue-500" />
              )}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          className="w-full group-hover:bg-blue-700"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
};
