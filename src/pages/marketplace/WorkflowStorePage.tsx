import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Download, Clock, TrendingUp, X, ChevronDown, Zap, Package, Grid2x2 as Grid, List, ArrowUpDown, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  runtime: string;
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  pricing: string;
  tier: string;
  integrations: string[];
  current_version: string;
  success_rate: number;
  featured: boolean;
  thumbnail: string;
}

interface WorkflowCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  workflow_count: number;
}

interface WorkflowPackage {
  id: string;
  name: string;
  slug: string;
  industry: string;
  description: string;
  pricing_tier: string;
  discount_percentage: number;
}

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-red-100 text-red-800',
};

const tierColors = {
  Free: 'bg-slate-100 text-slate-800',
  Professional: 'bg-blue-100 text-blue-800',
  Enterprise: 'bg-purple-100 text-purple-800',
};

export default function WorkflowStorePage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [categories, setCategories] = useState<WorkflowCategory[]>([]);
  const [packages, setPackages] = useState<WorkflowPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedIntegration, setSelectedIntegration] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showPackages, setShowPackages] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [workflowsRes, categoriesRes, packagesRes] = await Promise.all([
        supabase.from('workflows').select('*').order('featured', { ascending: false }),
        supabase.from('workflow_categories').select('*').order('order_index'),
        supabase.from('workflow_packages').select('*').order('pricing_tier'),
      ]);

      if (workflowsRes.data) setWorkflows(workflowsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (packagesRes.data) setPackages(packagesRes.data);
    } catch (error) {
      console.error('Error loading workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  const allIntegrations = useMemo(() => {
    const integrations = new Set<string>();
    workflows.forEach((w) => w.integrations?.forEach((i) => integrations.add(i)));
    return Array.from(integrations).sort();
  }, [workflows]);

  const filteredAndSortedWorkflows = useMemo(() => {
    let result = [...workflows];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(term) ||
          w.description.toLowerCase().includes(term) ||
          w.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
          w.category.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((w) => w.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      result = result.filter((w) => w.difficulty === selectedDifficulty);
    }

    if (selectedTier !== 'All') {
      result = result.filter((w) => w.tier === selectedTier);
    }

    if (selectedIntegration !== 'All') {
      result = result.filter((w) => w.integrations?.includes(selectedIntegration));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured !== b.featured) return b.featured ? 1 : -1;
          return b.downloads - a.downloads;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'success_rate':
          return b.success_rate - a.success_rate;
        default:
          return 0;
      }
    });

    return result;
  }, [workflows, searchTerm, selectedCategory, selectedDifficulty, selectedTier, selectedIntegration, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedTier('All');
    setSelectedIntegration('All');
  };

  const activeFilterCount =
    [
      selectedCategory !== 'All',
      selectedDifficulty !== 'All',
      selectedTier !== 'All',
      selectedIntegration !== 'All',
      searchTerm !== '',
    ].filter(Boolean).length;

  const featuredWorkflows = workflows.filter((w) => w.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-medium">350+ Production-Ready Workflows</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Workflow Store
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Browse, customize, and deploy automation workflows in minutes. Built by experts, trusted by thousands.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} />
                <span>12 new this week</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={18} />
                <span>50,000+ deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-yellow-300 text-yellow-300" />
                <span>4.8 avg rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>92% success rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPackages && packages.length > 0 && (
        <div className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Industry Packages</h2>
                <p className="text-slate-600 mt-1">Pre-bundled workflows for your industry</p>
              </div>
              <button
                onClick={() => setShowPackages(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.slice(0, 3).map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/marketplace/packages/${pkg.slug}`}
                  className="group p-6 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Package className="text-blue-600" size={24} />
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      pkg.pricing_tier === 'Free' ? 'bg-green-100 text-green-800' :
                      pkg.pricing_tier === 'Professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {pkg.pricing_tier}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
                  {pkg.discount_percentage > 0 && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      <Zap size={12} />
                      Save {pkg.discount_percentage}%
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name} ({cat.workflow_count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pricing Tier
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Tiers</option>
                    <option value="Free">Free</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                {allIntegrations.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Integration
                    </label>
                    <select
                      value={selectedIntegration}
                      onChange={(e) => setSelectedIntegration(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Integrations</option>
                      {allIntegrations.map((integration) => (
                        <option key={integration} value={integration}>
                          {integration}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Filter size={18} />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg">
                    <ArrowUpDown size={18} className="text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent border-none focus:ring-0 text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="downloads">Most Downloaded</option>
                      <option value="rating">Highest Rated</option>
                      <option value="success_rate">Success Rate</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-slate-100' : ''}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-slate-100' : ''}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-slate-600">Loading workflows...</p>
              </div>
            ) : filteredAndSortedWorkflows.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-600">No workflows found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-4 text-sm text-slate-600">
                  Showing {filteredAndSortedWorkflows.length} workflow{filteredAndSortedWorkflows.length !== 1 ? 's' : ''}
                </div>
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredAndSortedWorkflows.map((workflow) => (
                    <Link
                      key={workflow.id}
                      to={`/workflows/${workflow.id}`}
                      className="group bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all overflow-hidden"
                    >
                      {viewMode === 'grid' ? (
                        <div>
                          {workflow.thumbnail && (
                            <div className="h-48 overflow-hidden">
                              <img
                                src={workflow.thumbnail}
                                alt={workflow.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                                  {workflow.name}
                                  {workflow.featured && (
                                    <Sparkles size={16} className="inline ml-2 text-yellow-500" />
                                  )}
                                </h3>
                                <p className="text-sm text-slate-600">{workflow.category}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${tierColors[workflow.tier as keyof typeof tierColors]}`}>
                                {workflow.tier}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{workflow.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                  <span className="font-medium">{workflow.rating.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                  <Download size={14} />
                                  <span>{workflow.downloads.toLocaleString()}</span>
                                </div>
                                <span className={`px-2 py-0.5 text-xs rounded ${difficultyColors[workflow.difficulty as keyof typeof difficultyColors]}`}>
                                  {workflow.difficulty}
                                </span>
                              </div>
                            </div>
                            {workflow.success_rate > 0 && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-600">Success Rate</span>
                                  <span className="font-medium text-green-600">{workflow.success_rate.toFixed(1)}%</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4 p-4">
                          {workflow.thumbnail && (
                            <img
                              src={workflow.thumbnail}
                              alt={workflow.name}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {workflow.name}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${tierColors[workflow.tier as keyof typeof tierColors]}`}>
                                {workflow.tier}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
                            <div className="flex items-center gap-6 text-sm text-slate-600">
                              <span>{workflow.category}</span>
                              <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span>{workflow.rating.toFixed(1)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download size={14} />
                                <span>{workflow.downloads.toLocaleString()}</span>
                              </div>
                              <span className={`px-2 py-0.5 text-xs rounded ${difficultyColors[workflow.difficulty as keyof typeof difficultyColors]}`}>
                                {workflow.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
