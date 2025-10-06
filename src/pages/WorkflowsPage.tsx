import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Star, Download, Clock, TrendingUp, X, ChevronDown } from "lucide-react";
import { mockWorkflows } from "../data/mockData";

const categories = ['All', 'Sales', 'Marketing', 'Finance', 'Support', 'Operations', 'HR', 'Compliance', 'Productivity', 'Customer Success'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const pricingOptions = ['All', 'Free', 'Paid'];

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'recent'>('downloads');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedWorkflows = useMemo(() => {
    let result = [...mockWorkflows];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(workflow =>
        workflow.name.toLowerCase().includes(term) ||
        workflow.description.toLowerCase().includes(term) ||
        workflow.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(workflow => workflow.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      result = result.filter(workflow => workflow.difficulty === selectedDifficulty);
    }

    if (selectedPricing !== 'All') {
      if (selectedPricing === 'Free') {
        result = result.filter(workflow => workflow.pricing === 'Free');
      } else {
        result = result.filter(workflow => workflow.pricing !== 'Free');
      }
    }

    result.sort((a, b) => {
      if (sortBy === 'downloads') {
        return parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, ''));
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

    return result;
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedPricing, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedPricing('All');
  };

  const activeFilterCount = [
    selectedCategory !== 'All',
    selectedDifficulty !== 'All',
    selectedPricing !== 'All',
    searchTerm !== ''
  ].filter(Boolean).length;

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 border-b border-monks-gray/10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-monks-black mb-6">
            Workflow Store
          </h1>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto leading-relaxed">
            350+ pre-built workflows ready for one-click deployment.
            Find, customize, and deploy in minutes.
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-monks-gray">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-monks-accent" />
              <span>12 workflows added this week</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={18} className="text-monks-accent" />
              <span>50,000+ deployments</span>
            </div>
          </div>
        </div>

        <div className="py-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" size={20} />
              <input
                type="text"
                placeholder="Search workflows by name, description, or tags..."
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

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-monks-light-gray rounded-xl text-monks-black hover:bg-monks-gray/10 transition-colors relative"
            >
              <Filter size={20} />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-monks-accent text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-monks-light-gray rounded-xl text-monks-black border-0 focus:ring-2 focus:ring-monks-accent cursor-pointer"
            >
              <option value="downloads">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>

          {showFilters && (
            <div className="bg-monks-light-gray rounded-2xl p-6 space-y-6 animate-in slide-in-from-top">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-monks-black">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-monks-accent hover:text-monks-hover font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-3">
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
                            : 'bg-white text-monks-gray hover:bg-monks-gray/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-3">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDifficulty === difficulty
                            ? 'bg-monks-accent text-white'
                            : 'bg-white text-monks-gray hover:bg-monks-gray/10'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-3">Pricing</label>
                  <div className="flex flex-wrap gap-2">
                    {pricingOptions.map((pricing) => (
                      <button
                        key={pricing}
                        onClick={() => setSelectedPricing(pricing)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedPricing === pricing
                            ? 'bg-monks-accent text-white'
                            : 'bg-white text-monks-gray hover:bg-monks-gray/10'
                        }`}
                      >
                        {pricing}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-monks-gray">
            <span>
              Showing {filteredAndSortedWorkflows.length} of {mockWorkflows.length} workflows
            </span>
            {activeFilterCount > 0 && (
              <span className="text-monks-accent">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
              </span>
            )}
          </div>
        </div>

        {filteredAndSortedWorkflows.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 bg-monks-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-monks-gray" />
            </div>
            <h3 className="text-xl font-semibold text-monks-black mb-2">No workflows found</h3>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24">
            {filteredAndSortedWorkflows.map((workflow) => (
              <Link
                key={workflow.id}
                to={`/workflows/${workflow.id}`}
                className="group bg-white rounded-2xl p-6 border border-monks-gray/10 hover:border-monks-accent/30 hover:shadow-card transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    workflow.pricing === 'Free'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-monks-accent/10 text-monks-accent'
                  }`}>
                    {workflow.pricing === 'Free' ? 'Free' : workflow.pricing}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="text-amber-400 fill-amber-400" size={16} />
                    <span className="text-sm font-semibold text-monks-black">{workflow.rating}</span>
                    <span className="text-sm text-monks-gray">({workflow.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-monks-black mb-2 group-hover:text-monks-accent transition-colors">
                  {workflow.name}
                </h3>
                <p className="text-monks-gray mb-4 leading-relaxed line-clamp-2">
                  {workflow.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {workflow.tags.slice(0, 3).map((tag, j) => (
                    <span key={j} className="px-2 py-1 bg-monks-light-gray rounded text-xs text-monks-gray">
                      {tag}
                    </span>
                  ))}
                  {workflow.tags.length > 3 && (
                    <span className="px-2 py-1 bg-monks-light-gray rounded text-xs text-monks-gray">
                      +{workflow.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-monks-gray/10">
                  <div className="flex items-center gap-4 text-sm text-monks-gray">
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>{workflow.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{workflow.runtime}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    workflow.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600' :
                    workflow.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-red-500/10 text-red-600'
                  }`}>
                    {workflow.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
