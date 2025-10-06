import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X, TrendingUp, Sparkles, Grid2x2 as Grid, List } from 'lucide-react';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { marketplaceService } from '../../services/marketplace.service';
import type { MarketplaceProduct, MarketplaceCategory, ProductFilters } from '../../types/marketplace.types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';

export const UnifiedMarketplaceHub: React.FC = () => {
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [categories, setCategories] = useState<MarketplaceCategory[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allIntegrations, setAllIntegrations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: 'cat-all',
    product_type: undefined,
    pricing_type: undefined,
    difficulty_level: undefined,
    min_price: undefined,
    max_price: undefined,
    min_rating: undefined,
    tags: [],
    integrations: [],
    is_featured: undefined,
    sort_by: 'popular'
  });

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData, tagsData, integrationsData] = await Promise.all([
        marketplaceService.getProducts(filters),
        marketplaceService.getCategories(),
        marketplaceService.getAllTags(),
        marketplaceService.getAllIntegrations()
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setAllTags(tagsData);
      setAllIntegrations(integrationsData);
    } catch (error) {
      console.error('Error loading marketplace data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters({ ...filters, category: categoryId });
  };

  const handleSortChange = (sort: string) => {
    setFilters({ ...filters, sort_by: sort as any });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setFilters({ ...filters, tags: newTags });
  };

  const handleIntegrationToggle = (integration: string) => {
    const currentIntegrations = filters.integrations || [];
    const newIntegrations = currentIntegrations.includes(integration)
      ? currentIntegrations.filter(i => i !== integration)
      : [...currentIntegrations, integration];
    setFilters({ ...filters, integrations: newIntegrations });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'cat-all',
      sort_by: 'popular'
    });
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.product_type) count++;
    if (filters.pricing_type) count++;
    if (filters.difficulty_level) count++;
    if (filters.min_price !== undefined) count++;
    if (filters.max_price !== undefined) count++;
    if (filters.min_rating !== undefined) count++;
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length;
    if (filters.integrations && filters.integrations.length > 0) count += filters.integrations.length;
    if (filters.is_featured) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Powerful Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse workflows, AI agents, tools, and services to supercharge your business
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products, workflows, agents..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white shadow-lg border-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {products.length} Products Found
            </h2>
            <p className="text-slate-600">
              {filters.category !== 'cat-all' &&
                categories.find(c => c.id === filters.category)?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount() > 0 && (
                <Badge variant="primary" className="ml-2">
                  {activeFilterCount()}
                </Badge>
              )}
            </Button>

            <Select
              value={filters.sort_by || 'popular'}
              onChange={(e) => handleSortChange(e.target.value)}
              className="min-w-[180px]"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="trending">Trending</option>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto mb-8 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  filters.category === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category.name}
                {category.product_count !== undefined && (
                  <span className="ml-2 text-sm opacity-75">
                    ({category.product_count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Advanced Filters</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={clearFilters} className="text-sm">
                  Clear All
                </Button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Type
                </label>
                <Select
                  value={filters.product_type || ''}
                  onChange={(e) => setFilters({ ...filters, product_type: e.target.value as any || undefined })}
                >
                  <option value="">All Types</option>
                  <option value="workflow">Workflow</option>
                  <option value="agent">AI Agent</option>
                  <option value="asset">Digital Asset</option>
                  <option value="service">Service</option>
                  <option value="tool">Tool</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pricing Type
                </label>
                <Select
                  value={filters.pricing_type || ''}
                  onChange={(e) => setFilters({ ...filters, pricing_type: e.target.value as any || undefined })}
                >
                  <option value="">All Pricing</option>
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="one_time">One-time</option>
                  <option value="subscription">Subscription</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <Select
                  value={filters.difficulty_level || ''}
                  onChange={(e) => setFilters({ ...filters, difficulty_level: e.target.value as any || undefined })}
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Min Price
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.min_price || ''}
                  onChange={(e) => setFilters({ ...filters, min_price: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Max Price
                </label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={filters.max_price || ''}
                  onChange={(e) => setFilters({ ...filters, max_price: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Min Rating
                </label>
                <Select
                  value={filters.min_rating?.toString() || ''}
                  onChange={(e) => setFilters({ ...filters, min_rating: e.target.value ? Number(e.target.value) : undefined })}
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filters.tags?.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {allIntegrations.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Integrations
                </label>
                <div className="flex flex-wrap gap-2">
                  {allIntegrations.map((integration) => (
                    <button
                      key={integration}
                      onClick={() => handleIntegrationToggle(integration)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filters.integrations?.includes(integration)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {integration}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
