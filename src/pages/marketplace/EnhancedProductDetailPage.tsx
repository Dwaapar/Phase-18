import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Download,
  Heart,
  ExternalLink,
  Shield,
  Calendar,
  TrendingUp,
  CheckCircle,
  Play,
  FileText,
  Share2,
  MessageCircle,
  ChevronRight,
  Users
} from 'lucide-react';
import { marketplaceService } from '../../services/marketplace.service';
import type { MarketplaceProduct, ProductReview, ProductRecommendation } from '../../types/marketplace.types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const EnhancedProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<MarketplaceProduct | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (slug) {
      loadProduct(slug);
    }
  }, [slug]);

  const loadProduct = async (productSlug: string) => {
    setLoading(true);
    try {
      const productData = await marketplaceService.getProductBySlug(productSlug);
      if (productData) {
        setProduct(productData);
        setIsWishlisted(productData.is_in_wishlist || false);

        await marketplaceService.trackAnalytics(productData.id, 'view');

        const [reviewsData, recommendationsData] = await Promise.all([
          marketplaceService.getProductReviews(productData.id),
          marketplaceService.getRecommendations(productData.id)
        ]);

        setReviews(reviewsData);
        setRecommendations(recommendationsData);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (product) {
      marketplaceService.trackAnalytics(product.id, 'wishlist_add');
    }
  };

  const handleDemoClick = () => {
    if (product) {
      marketplaceService.trackAnalytics(product.id, 'demo_click');
    }
  };

  const formatPrice = () => {
    if (!product) return '';
    if (product.pricing_type === 'free') return 'Free';
    if (product.pricing_type === 'freemium') return 'Freemium';
    const price = `$${product.price.toFixed(2)}`;
    if (product.pricing_type === 'subscription') return `${price}/month`;
    return price;
  };

  const getRatingDistribution = () => {
    const distribution = [
      { stars: 5, count: 85, percentage: 68 },
      { stars: 4, count: 30, percentage: 24 },
      { stars: 3, count: 7, percentage: 6 },
      { stars: 2, count: 2, percentage: 2 },
      { stars: 1, count: 0, percentage: 0 }
    ];
    return distribution;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h2>
          <p className="text-slate-600 mb-6">The product you're looking for doesn't exist</p>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/marketplace?category=${product.category_id}`} className="hover:text-blue-600">
              {product.category?.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ExternalLink className="w-16 h-16" />
                  </div>
                )}
                {product.demo_url && (
                  <button
                    onClick={handleDemoClick}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-blue-600 ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="primary">{product.product_type}</Badge>
                  {product.is_featured && (
                    <Badge variant="warning" className="bg-amber-500">Featured</Badge>
                  )}
                  <Badge variant="secondary">{product.difficulty_level}</Badge>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-3">{product.name}</h1>
                <p className="text-xl text-slate-600 mb-4">{product.description}</p>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating_average)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-900">{product.rating_average.toFixed(1)}</span>
                    <span className="text-slate-500">({product.rating_count} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Download className="w-4 h-4" />
                    <span>{product.install_count.toLocaleString()} installs</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{product.view_count.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'specifications', label: 'Specifications' }
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="bg-white rounded-xl shadow-sm p-8 mt-6">
              {activeTab === 'overview' && (
                <div className="prose prose-slate max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: product.long_description.replace(/\n/g, '<br />') }} />

                  {product.metadata && Object.keys(product.metadata).length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {Object.entries(product.metadata).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 rounded-lg p-4">
                          <div className="text-sm text-slate-500 mb-1 capitalize">
                            {key.replace(/_/g, ' ')}
                          </div>
                          <div className="font-semibold text-slate-900">{String(value)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-200">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-slate-900 mb-2">
                        {product.rating_average.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating_average)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-slate-600">{product.rating_count} reviews</div>
                    </div>

                    <div className="md:col-span-2">
                      {getRatingDistribution().map((dist) => (
                        <div key={dist.stars} className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-slate-600 w-12">{dist.stars} star</span>
                          <ProgressBar value={dist.percentage} className="flex-1" />
                          <span className="text-sm text-slate-600 w-12">{dist.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <Avatar name={review.user?.name || 'User'} size="md" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-slate-900">{review.user?.name}</span>
                              {review.is_verified_purchase && (
                                <Badge variant="success" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-slate-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-slate-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            {review.title && (
                              <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
                            )}
                            <p className="text-slate-600 mb-3">{review.content}</p>
                            <button className="text-sm text-slate-500 hover:text-slate-700">
                              Helpful ({review.helpful_count})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Product Details</h3>
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-sm text-slate-500 mb-1">Category</dt>
                          <dd className="font-semibold text-slate-900">{product.category?.name}</dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-sm text-slate-500 mb-1">Difficulty</dt>
                          <dd className="font-semibold text-slate-900 capitalize">{product.difficulty_level}</dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-sm text-slate-500 mb-1">Pricing</dt>
                          <dd className="font-semibold text-slate-900 capitalize">{product.pricing_type}</dd>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <dt className="text-sm text-slate-500 mb-1">Last Updated</dt>
                          <dd className="font-semibold text-slate-900">
                            {new Date(product.updated_at).toLocaleDateString()}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {product.integrations && product.integrations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Integrations</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {product.integrations.map((integration) => (
                            <div key={integration.id} className="bg-slate-50 rounded-lg p-4">
                              <div className="font-semibold text-slate-900 mb-1">{integration.integration_name}</div>
                              <div className="text-sm text-slate-500 capitalize">{integration.integration_type}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <div className="text-3xl font-bold text-slate-900 mb-6">
                {formatPrice()}
              </div>

              <div className="space-y-3 mb-6">
                <Button variant="primary" className="w-full text-lg py-3">
                  <Download className="w-5 h-5 mr-2" />
                  Get Now
                </Button>
                <Button
                  variant={isWishlisted ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="ghost" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {product.demo_url && (
                <a
                  href={product.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDemoClick}
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </a>
              )}

              {product.documentation_url && (
                <a
                  href={product.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
                >
                  <FileText className="w-4 h-4" />
                  Documentation
                </a>
              )}

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Sold by</h3>
                {product.seller && (
                  <div className="flex items-center gap-3">
                    <Avatar name={product.seller.name} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{product.seller.name}</span>
                        {product.seller.verified && (
                          <Shield className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-500">Verified Seller</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Similar Products</h2>
              <Link to="/marketplace" className="text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <ProductCard key={rec.product.id} product={rec.product} showCategory={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
