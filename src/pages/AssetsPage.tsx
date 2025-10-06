import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, FileText, Database, BookOpen, Package, Search, Star, Filter, TrendingUp, X } from "lucide-react";
import { mockAssets } from "../data/mockData";

const assetTypes = ['All', 'Prompt Pack', 'Dataset', 'Playbook', 'Template Bundle'];
const categories = ['All', 'Sales', 'Marketing', 'Finance', 'Support', 'Data', 'Customer Success', 'Product', 'Engineering', 'HR', 'E-commerce'];
const pricingFilter = ['All', 'Free', 'Paid'];

const getAssetIcon = (type: string) => {
  switch(type) {
    case 'Prompt Pack': return FileText;
    case 'Dataset': return Database;
    case 'Playbook': return BookOpen;
    case 'Template Bundle': return Package;
    default: return Download;
  }
};

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating'>('downloads');

  const filteredAndSortedAssets = useMemo(() => {
    let result = [...mockAssets];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(asset =>
        asset.name.toLowerCase().includes(term) ||
        asset.description.toLowerCase().includes(term) ||
        asset.category.toLowerCase().includes(term)
      );
    }

    if (selectedType !== 'All') {
      result = result.filter(asset => asset.type === selectedType);
    }

    if (selectedCategory !== 'All') {
      result = result.filter(asset => asset.category === selectedCategory);
    }

    if (selectedPricing !== 'All') {
      if (selectedPricing === 'Free') {
        result = result.filter(asset => asset.pricing === 'Free');
      } else {
        result = result.filter(asset => asset.pricing !== 'Free');
      }
    }

    result.sort((a, b) => {
      if (sortBy === 'downloads') {
        return parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, ''));
      } else {
        return b.rating - a.rating;
      }
    });

    return result;
  }, [searchTerm, selectedType, selectedCategory, selectedPricing, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedCategory('All');
    setSelectedPricing('All');
  };

  const activeFilterCount = [
    selectedType !== 'All',
    selectedCategory !== 'All',
    selectedPricing !== 'All',
    searchTerm !== ''
  ].filter(Boolean).length;

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Digital Assets Library
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Accelerate your growth with curated prompts, datasets, playbooks, and templates.
              Everything you need to scale your business faster.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-monks-accent" />
                <span>550+ Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={18} className="text-monks-accent" />
                <span>100K+ Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-monks-accent" />
                <span>New assets weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" size={20} />
                <input
                  type="text"
                  placeholder="Search assets by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-monks-light-gray border-0 text-monks-black placeholder-monks-gray focus:ring-2 focus:ring-monks-accent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-monks-gray hover:text-monks-black"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-monks-light-gray rounded-xl text-monks-black border-0 focus:ring-2 focus:ring-monks-accent cursor-pointer"
              >
                <option value="downloads">Most Downloaded</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-3">Asset Type</label>
                <div className="flex flex-wrap gap-2">
                  {assetTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedType === type
                          ? 'bg-monks-accent text-white'
                          : 'bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-3">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-monks-accent text-white'
                          : 'bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-3">Pricing</label>
                <div className="flex flex-wrap gap-2">
                  {pricingFilter.map((pricing) => (
                    <button
                      key={pricing}
                      onClick={() => setSelectedPricing(pricing)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedPricing === pricing
                          ? 'bg-monks-accent text-white'
                          : 'bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10'
                      }`}
                    >
                      {pricing}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-monks-gray border-t border-monks-gray/10 pt-6">
              <span>
                Showing {filteredAndSortedAssets.length} of {mockAssets.length} assets
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-monks-accent hover:text-monks-hover font-medium"
                >
                  Clear All Filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedAssets.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-monks-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-monks-gray" />
              </div>
              <h3 className="text-xl font-semibold text-monks-black mb-2">No assets found</h3>
              <p className="text-monks-gray mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-monks-accent text-white rounded-xl font-medium hover:bg-monks-hover transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedAssets.map((asset) => {
                const Icon = getAssetIcon(asset.type);
                return (
                  <Link
                    key={asset.id}
                    to={`/assets/${asset.id}`}
                    className="group bg-white rounded-2xl p-6 border border-monks-gray/10 hover:border-monks-accent/30 hover:shadow-card transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-monks-accent/10 rounded-xl flex items-center justify-center">
                        <Icon size={20} className="text-monks-accent" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        asset.pricing === 'Free'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-monks-accent/10 text-monks-accent'
                      }`}>
                        {asset.pricing === 'Free' ? 'Free' : asset.pricing}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block px-2 py-1 bg-monks-light-gray rounded text-xs text-monks-gray mb-2">
                        {asset.type}
                      </span>
                      <h3 className="text-xl font-bold text-monks-black group-hover:text-monks-accent transition-colors">
                        {asset.name}
                      </h3>
                    </div>

                    <p className="text-monks-gray mb-4 leading-relaxed line-clamp-2">
                      {asset.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-monks-gray">
                      {asset.fileSize && (
                        <div className="flex items-center justify-between">
                          <span>File Size</span>
                          <span className="font-medium">{asset.fileSize}</span>
                        </div>
                      )}
                      {asset.format && (
                        <div className="flex items-center justify-between">
                          <span>Format</span>
                          <span className="font-medium">{asset.format}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-monks-gray/10">
                      <div className="flex items-center gap-4 text-sm text-monks-gray">
                        <div className="flex items-center gap-1">
                          <Star className="text-amber-400 fill-amber-400" size={14} />
                          <span>{asset.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download size={14} />
                          <span>{asset.downloads}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-monks-light-gray rounded text-xs font-medium text-monks-gray">
                        {asset.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-monks-black">
            Need Custom Assets?
          </h2>
          <p className="text-xl text-monks-gray leading-relaxed">
            Our team can create custom prompts, datasets, and playbooks tailored to your specific industry and use cases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?type=custom-assets"
              className="px-8 py-4 bg-monks-accent text-white rounded-xl font-semibold hover:bg-monks-hover transition-colors"
            >
              Request Custom Assets
            </Link>
            <Link
              to="/marketplace/sell"
              className="px-8 py-4 bg-monks-black text-white rounded-xl font-semibold hover:bg-monks-gray transition-colors"
            >
              Sell Your Assets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
