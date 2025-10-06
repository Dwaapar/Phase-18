import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marketplaceService } from '../../services/marketplace.service';
import type { TrendingProduct } from '../../types/marketplace.types';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';

interface TrendingSectionProps {
  limit?: number;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ limit = 6 }) => {
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, [limit]);

  const loadTrending = async () => {
    try {
      const products = await marketplaceService.getTrendingProducts(limit);
      setTrendingProducts(products);
    } catch (error) {
      console.error('Error loading trending products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-slate-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (trendingProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
              <p className="text-slate-600">Hot products everyone's talking about</p>
            </div>
          </div>
          <Link to="/marketplace?sort_by=trending">
            <Button variant="outline" className="hidden md:flex">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {index < 3 && (
                <div className="absolute -top-3 -left-3 z-10 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/marketplace?sort_by=trending">
            <Button variant="outline">
              View All Trending
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
