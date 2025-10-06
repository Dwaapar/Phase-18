import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { marketplaceService } from '../../services/marketplace.service';
import type { PopularProduct } from '../../types/marketplace.types';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';

interface PopularSectionProps {
  limit?: number;
}

export const PopularSection: React.FC<PopularSectionProps> = ({ limit = 6 }) => {
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopular();
  }, [limit]);

  const loadPopular = async () => {
    try {
      const products = await marketplaceService.getPopularProducts(limit);
      setPopularProducts(products);
    } catch (error) {
      console.error('Error loading popular products:', error);
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

  if (popularProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Most Popular</h2>
              <p className="text-slate-600">Customer favorites with proven results</p>
            </div>
          </div>
          <Link to="/marketplace?sort_by=popular">
            <Button variant="outline" className="hidden md:flex">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/marketplace?sort_by=popular">
            <Button variant="outline">
              View All Popular
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
