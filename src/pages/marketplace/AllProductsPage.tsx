import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, TrendingUp, Download, DollarSign } from 'lucide-react';
import { productService, type ProductFilters } from '../../services/product.service';
import type { Product, ProductType } from '../../types/platform.types';

const productTypes: { value: ProductType; label: string }[] = [
  { value: 'workflow', label: 'Workflows' },
  { value: 'agent', label: 'AI Agents' },
  { value: 'asset', label: 'Digital Assets' },
  { value: 'service', label: 'Services' },
  { value: 'tool', label: 'Tools' }
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' }
];

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'popular',
    limit: 24
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Marketplace</h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl">
            Discover 600+ pre-built workflows, AI agents, digital assets, automation services, and professional tools
          </p>

          <div className="flex gap-4 max-w-3xl">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Type
                </label>
                <select
                  value={filters.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {productTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Pricing
                </label>
                <select
                  value={filters.pricingModel || ''}
                  onChange={(e) => handleFilterChange('pricingModel', e.target.value || undefined)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Pricing</option>
                  <option value="free">Free</option>
                  <option value="one_time">One-Time Purchase</option>
                  <option value="subscription">Subscription</option>
                  <option value="custom_quote">Custom Quote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy || 'popular'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="w-full h-48 bg-slate-200 rounded-lg mb-4" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-full mb-4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-600 text-lg mb-4">No products found</p>
            <button
              onClick={() => {
                setFilters({ sortBy: 'popular', limit: 24 });
                setSearchTerm('');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product.type}/${product.slug}`}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                {product.screenshots[0] ? (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                    <img
                      src={product.screenshots[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    {product.isFeatured && (
                      <span className="flex-shrink-0 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-slate-900">
                        {product.ratingAverage.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({product.ratingCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Download className="w-4 h-4" />
                      {product.installCount.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-500 capitalize">
                      {product.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
