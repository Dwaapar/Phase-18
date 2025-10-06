import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Search,
  Filter,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';
import { AgentsService } from '../../services/agents.service';
import { AIAgent, AgentCategory, DeploymentModel, AgentFilters } from '../../types/agent.types';

export default function AgentMarketplacePage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [categories, setCategories] = useState<AgentCategory[]>([]);
  const [deploymentModels, setDeploymentModels] = useState<DeploymentModel[]>([]);
  const [filters, setFilters] = useState<AgentFilters>({
    sortBy: 'popularity',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [agentsData, categoriesData, deploymentsData] = await Promise.all([
        AgentsService.getAgents(filters),
        AgentsService.getCategories(),
        AgentsService.getDeploymentModels()
      ]);
      setAgents(agentsData);
      setCategories(categoriesData);
      setDeploymentModels(deploymentsData);
    } catch (error) {
      console.error('Error loading agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, search: searchQuery });
  };

  const toggleCategoryFilter = (categoryId: string) => {
    const categories = filters.categories || [];
    const updated = categories.includes(categoryId)
      ? categories.filter(id => id !== categoryId)
      : [...categories, categoryId];
    setFilters({ ...filters, categories: updated.length > 0 ? updated : undefined });
  };

  const toggleDeploymentFilter = (deploymentSlug: string) => {
    const deployments = filters.deploymentModels || [];
    const updated = deployments.includes(deploymentSlug)
      ? deployments.filter(slug => slug !== deploymentSlug)
      : [...deployments, deploymentSlug];
    setFilters({ ...filters, deploymentModels: updated.length > 0 ? updated : undefined });
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'popularity', sortOrder: 'desc' });
    setSearchQuery('');
  };

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.deploymentModels?.length || 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>50+ Pre-Built AI Agents</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            AI Agent Marketplace
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Deploy production-ready AI agents in minutes. Choose from our extensive library
            of pre-built agents or customize them to fit your needs.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search agents by name, capability, or use case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center gap-2 relative"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-6 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.categories?.includes(category.id)}
                          onChange={() => toggleCategoryFilter(category.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-slate-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Deployment Models</h4>
                  <div className="space-y-2">
                    {deploymentModels.map((model) => (
                      <label key={model.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.deploymentModels?.includes(model.slug)}
                          onChange={() => toggleDeploymentFilter(model.slug)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-slate-700">{model.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3">Sort by</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'popularity', label: 'Popularity', icon: TrendingUp },
                    { value: 'rating', label: 'Rating', icon: Star },
                    { value: 'price', label: 'Price', icon: DollarSign },
                    { value: 'deployments', label: 'Deployments', icon: Users }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setFilters({ ...filters, sortBy: value as any })}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        filters.sortBy === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{agents.length}</span> agents found
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const category = categories.find(c => c.id === agent.categoryId);
              return (
                <Link
                  key={agent.id}
                  to={`/agents/${agent.slug}`}
                  className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    {agent.isFeatured && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {agent.name}
                  </h3>

                  {category && (
                    <p className="text-sm text-slate-500 mb-3">{category.name}</p>
                  )}

                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.capabilities.slice(0, 3).map((capability, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                      >
                        {capability}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium text-slate-900">{agent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{agent.totalDeployments.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      ${agent.basePrice}
                      <span className="text-sm font-normal text-slate-500">/mo</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && agents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No agents found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
