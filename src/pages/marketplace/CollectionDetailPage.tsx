import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft, Star, Download, ShoppingCart, ChevronRight } from 'lucide-react';
import { marketplaceService } from '../../services/marketplace.service';
import type { ProductCollection } from '../../types/marketplace.types';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<ProductCollection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadCollection(slug);
    }
  }, [slug]);

  const loadCollection = async (collectionSlug: string) => {
    setLoading(true);
    try {
      const data = await marketplaceService.getCollectionBySlug(collectionSlug);
      setCollection(data);
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = () => {
    if (!collection?.products) return 0;
    return collection.products.reduce((sum, product) => {
      if (product.pricing_type === 'free' || product.pricing_type === 'freemium') {
        return sum;
      }
      return sum + product.price;
    }, 0);
  };

  const calculateAverageRating = () => {
    if (!collection?.products || collection.products.length === 0) return 0;
    const totalRating = collection.products.reduce((sum, product) => sum + product.rating_average, 0);
    return totalRating / collection.products.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Collection not found</h2>
          <p className="text-slate-600 mb-6">The collection you're looking for doesn't exist</p>
          <Link to="/marketplace/collections">
            <Button>View All Collections</Button>
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
            <Link to="/marketplace/collections" className="hover:text-blue-600">Collections</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{collection.name}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 h-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/marketplace/collections"
            className="inline-flex items-center gap-2 text-white hover:text-blue-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-slate-900 to-slate-700">
                {collection.image_url && (
                  <img
                    src={collection.image_url}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {collection.is_featured && (
                  <div className="absolute top-6 left-6">
                    <Badge variant="warning" className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    Product Collection
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-4">{collection.name}</h1>
                <p className="text-xl text-slate-600 mb-8">{collection.description}</p>

                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-200">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Products</div>
                    <div className="text-2xl font-bold text-slate-900">{collection.products?.length || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Avg Rating</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-2xl font-bold text-slate-900">{calculateAverageRating().toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Total Value</div>
                    <div className="text-2xl font-bold text-slate-900">${calculateTotalValue().toFixed(0)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="primary" className="w-full text-lg py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Get Entire Collection
                  </Button>
                  <p className="text-center text-sm text-slate-500">
                    Save 20% when you purchase the complete collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Products in this Collection</h2>
          <p className="text-slate-600">
            {collection.products?.length} carefully curated products designed to work together
          </p>
        </div>

        {collection.products && collection.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No products yet</h3>
            <p className="text-slate-600">This collection is being curated</p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-slate-600 mb-6">
              Our team can help you build a custom collection tailored to your specific business needs
            </p>
            <Button variant="primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
