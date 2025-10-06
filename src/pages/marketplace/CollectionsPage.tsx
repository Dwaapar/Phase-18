import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Star, Download } from 'lucide-react';
import { marketplaceService } from '../../services/marketplace.service';
import type { ProductCollection } from '../../types/marketplace.types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const CollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setLoading(true);
    try {
      const data = await marketplaceService.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Product Collections</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Curated bundles of products designed to solve specific business challenges
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/marketplace/collections/${collection.slug}`}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[21/9]' : 'aspect-video'} bg-gradient-to-br from-slate-900 to-slate-700`}>
                {collection.image_url && (
                  <img
                    src={collection.image_url}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:opacity-60 transition-opacity"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {collection.is_featured && (
                  <div className="absolute top-6 left-6">
                    <Badge variant="warning" className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured Collection
                    </Badge>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className={`font-bold text-white mb-3 ${index === 0 ? 'text-4xl' : 'text-2xl'}`}>
                    {collection.name}
                  </h2>
                  <p className={`text-blue-100 mb-4 ${index === 0 ? 'text-lg max-w-3xl' : 'text-base'}`}>
                    {collection.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {collection.product_count} Products
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Popular Choice
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                      <span className="font-medium">Explore Collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-slate-600 mb-6">
              Browse our full marketplace to discover individual products or contact us to create a custom collection for your needs
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={() => window.location.href = '/marketplace'}>
                Browse All Products
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                Request Custom Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
