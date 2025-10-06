import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, TrendingUp, Package, Bot, FileText, Wrench, Layers, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type ProductType = 'all' | 'workflow' | 'agent' | 'asset' | 'service' | 'bundle';
type SortOption = 'popular' | 'newest' | 'rating' | 'price-low' | 'price-high';

interface DBProduct {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  pricing_model: string;
  price: number;
  tier_required: string;
  features: string[];
  install_count: number;
  rating_average: number;
  rating_count: number;
  is_featured: boolean;
  category: { name: string } | null;
}

export default function UnifiedMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ProductType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    workflows: 0,
    agents: 0,
    assets: 0,
    services: 0,
    bundles: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchStats();
  }, [selectedType, selectedCategory, selectedTier, sortBy, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          type,
          name,
          slug,
          description,
          pricing_model,
          price,
          tier_required,
          features,
          install_count,
          rating_average,
          rating_count,
          is_featured,
          product_categories(name)
        `)
        .eq('is_active', true);

      if (selectedType !== 'all') {
        query = query.eq('type', selectedType);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      if (selectedTier !== 'all') {
        query = query.eq('tier_required', selectedTier);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      switch (sortBy) {
        case 'popular':
          query = query.order('install_count', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating_average', { ascending: false });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
      }

      const { data, error } = await query.limit(100);

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('id, name')
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: allData } = await supabase.from('products').select('type', { count: 'exact' }).eq('is_active', true);
      const { data: workflowData } = await supabase.from('products').select('id', { count: 'exact' }).eq('type', 'workflow').eq('is_active', true);
      const { data: agentData } = await supabase.from('products').select('id', { count: 'exact' }).eq('type', 'agent').eq('is_active', true);
      const { data: assetData } = await supabase.from('products').select('id', { count: 'exact' }).eq('type', 'asset').eq('is_active', true);
      const { data: serviceData } = await supabase.from('products').select('id', { count: 'exact' }).eq('type', 'service').eq('is_active', true);
      const { data: bundleData } = await supabase.from('product_bundles').select('id', { count: 'exact' }).eq('is_active', true);

      setStats({
        total: allData?.length || 0,
        workflows: workflowData?.length || 0,
        agents: agentData?.length || 0,
        assets: assetData?.length || 0,
        services: serviceData?.length || 0,
        bundles: bundleData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${(price / 100).toLocaleString()}`;
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'workflow':
        return <Zap className="w-5 h-5" />;
      case 'agent':
        return <Bot className="w-5 h-5" />;
      case 'asset':
        return <FileText className="w-5 h-5" />;
      case 'service':
        return <Wrench className="w-5 h-5" />;
      case 'tool':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Product Marketplace
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            350+ workflows, 50+ AI agents, 200+ digital assets, and custom automation services
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'All Products', value: stats.total, type: 'all' },
            { label: 'Workflows', value: stats.workflows, type: 'workflow' },
            { label: 'AI Agents', value: stats.agents, type: 'agent' },
            { label: 'Assets', value: stats.assets, type: 'asset' },
            { label: 'Bundles', value: stats.bundles, type: 'bundle' },
          ].map((stat) => (
            <button
              key={stat.type}
              onClick={() => setSelectedType(stat.type as ProductType)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedType === stat.type
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className={`flex-col lg:flex-row gap-4 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{products.length}</span> products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
            <Link
              key={product.id}
              to={`/marketplace/${product.type}/${product.slug}`}
              className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {getProductIcon(product.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {product.is_featured && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                            Featured
                          </span>
                        )}
                        {product.install_count > 5000 && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 capitalize">{product.type}</p>
                    </div>
                  </div>
                  {product.rating_count > 0 && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-slate-900">
                        {product.rating_average.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500">({product.rating_count})</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>

                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{product.install_count.toLocaleString()} installs</span>
                    {product.category && (
                      <span>{product.category.name}</span>
                    )}
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
