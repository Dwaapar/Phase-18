import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Star,
  Eye,
  ArrowUpDown,
  Grid3x3,
  List,
  Package,
  Sparkles,
  Database,
  BookOpen,
  Palette,
  FileText,
  Check,
} from 'lucide-react';
import { useAssets, useAssetCategories, useAssetStats } from '../../hooks/useAssets';
import type { AssetFilters, AssetTier } from '../../types/asset.types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const iconMap: Record<string, any> = {
  Sparkles,
  Database,
  BookOpen,
  Palette,
  FileText,
};

export default function DigitalAssetsPage() {
  const [filters, setFilters] = useState<AssetFilters>({
    sortBy: 'popular',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  const { assets, loading } = useAssets(filters);
  const { categories } = useAssetCategories();
  const { stats } = useAssetStats();

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId,
    }));
  };

  const handleTierChange = (tier: AssetTier) => {
    setFilters(prev => ({
      ...prev,
      tier: prev.tier === tier ? undefined : tier,
    }));
  };

  const handleSortChange = (sortBy: AssetFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getTierColor = (tier: AssetTier) => {
    switch (tier) {
      case 'free':
        return 'bg-green-100 text-green-700';
      case 'professional':
        return 'bg-blue-100 text-blue-700';
      case 'enterprise':
        return 'bg-purple-100 text-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Digital Assets Marketplace
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            200+ premium assets ready for immediate download
          </p>

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">{stats.totalAssets}</div>
                <div className="text-sm text-slate-600">Total Assets</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
                <div className="text-2xl font-bold text-green-700">{stats.freeAssets}</div>
                <div className="text-sm text-green-600">Free</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{stats.professionalAssets}</div>
                <div className="text-sm text-blue-600">Professional</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-200">
                <div className="text-2xl font-bold text-purple-700">{stats.enterpriseAssets}</div>
                <div className="text-sm text-purple-600">Enterprise</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">
                  {(stats.totalDownloads / 1000).toFixed(1)}k
                </div>
                <div className="text-sm text-slate-600">Downloads</div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assets..."
              value={filters.search || ''}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700'}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700'}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {showFilters && (
            <div className="w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => {
                      const Icon = iconMap[category.icon] || Package;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            filters.category === category.id
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {category.name}
                          {filters.category === category.id && (
                            <Check className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Pricing Tier</h3>
                  <div className="space-y-2">
                    {(['free', 'professional', 'enterprise'] as AssetTier[]).map(tier => (
                      <button
                        key={tier}
                        onClick={() => handleTierChange(tier)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          filters.tier === tier
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="capitalize">{tier}</span>
                        {filters.tier === tier && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={e => handleSortChange(e.target.value as AssetFilters['sortBy'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="recent">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {(filters.category || filters.tier || filters.search) && (
                  <button
                    onClick={() => setFilters({ sortBy: 'popular' })}
                    className="w-full mt-6 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading assets...</p>
              </div>
            ) : assets.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No assets found</h3>
                <p className="text-slate-600">Try adjusting your filters or search terms</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(asset => (
                  <Link
                    key={asset.id}
                    to={`/marketplace/assets/${asset.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                      <img
                        src={asset.previewImages[0]}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {asset.isFeatured && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {asset.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {asset.shortDescription}
                      </p>
                      <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {asset.downloadCount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {asset.ratingAverage.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {asset.viewCount.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={getTierColor(asset.tier)}>
                          {asset.tier}
                        </Badge>
                        <span className="text-lg font-bold text-slate-900">
                          {formatPrice(asset.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {assets.map(asset => (
                  <Link
                    key={asset.id}
                    to={`/marketplace/assets/${asset.slug}`}
                    className="group bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 flex gap-6"
                  >
                    <div className="w-48 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={asset.previewImages[0]}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {asset.title}
                        </h3>
                        <span className="text-xl font-bold text-slate-900">
                          {formatPrice(asset.price)}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4 line-clamp-2">{asset.description}</p>
                      <div className="flex items-center gap-6">
                        <Badge className={getTierColor(asset.tier)}>
                          {asset.tier}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Download className="w-4 h-4" />
                          {asset.downloadCount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {asset.ratingAverage.toFixed(1)} ({asset.ratingCount})
                        </div>
                        <div className="text-sm text-slate-500">{asset.fileFormat}</div>
                        <div className="text-sm text-slate-500">{asset.fileSize}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
