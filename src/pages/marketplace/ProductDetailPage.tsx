import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, Check, ExternalLink, Shield, Zap, ArrowRight } from 'lucide-react';
import { productService } from '../../services/product.service';
import type { Product } from '../../types/platform.types';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductBySlug(slug!);
      setProduct(data);

      if (data) {
        const related = await productService.getRelatedProducts(data.id);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${(price / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h2>
          <Link to="/marketplace" className="text-blue-600 hover:text-blue-700">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
          <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
          <span>/</span>
          <Link to={`/marketplace?type=${product.type}`} className="hover:text-blue-600 capitalize">
            {product.type}s
          </Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-500 relative">
                {product.screenshots[selectedImage] ? (
                  <img
                    src={product.screenshots[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white text-6xl font-bold">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {product.screenshots.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {product.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this {product.type}</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {product.longDescription || product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.integrations && product.integrations.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Integrations</h2>
                <div className="flex flex-wrap gap-3">
                  {product.integrations.map((integration, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sticky top-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                <p className="text-slate-600">{product.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-slate-900">
                    {product.ratingAverage.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({product.ratingCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">{product.installCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.pricingModel === 'subscription' && (
                    <span className="text-slate-600">/month</span>
                  )}
                </div>

                {product.tierRequired !== 'free' && (
                  <p className="text-sm text-slate-600 mb-4">
                    Requires <span className="font-semibold capitalize">{product.tierRequired}</span> tier or higher
                  </p>
                )}
              </div>

              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mb-4">
                {product.price === 0 ? 'Get Started' : 'Purchase Now'}
                <ArrowRight className="w-5 h-5" />
              </button>

              {product.demoUrl && (
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  View Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Secure & verified</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Instant deployment</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Regular updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/marketplace/${related.type}/${related.slug}`}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-cyan-500">
                    {related.screenshots[0] && (
                      <img
                        src={related.screenshots[0]}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">
                      {related.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {formatPrice(related.price)}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {related.ratingAverage.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
