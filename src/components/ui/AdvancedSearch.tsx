import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Tag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DatePicker } from './DatePicker';
import { Select } from './Select';

interface SearchFilter {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'range';
  options?: { label: string; value: string }[];
}

interface AdvancedSearchProps {
  onSearch?: (query: string, filters: Record<string, any>) => void;
  filters?: SearchFilter[];
  placeholder?: string;
  className?: string;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  filters = [],
  placeholder = "Search...",
  className
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const handleSearch = () => {
    onSearch?.(query, activeFilters);
  };

  const updateFilter = (key: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const removeFilter = (key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setQuery('');
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-12 pr-20 py-4 rounded-2xl bg-white border border-monks-gray/20 text-monks-black focus:ring-2 focus:ring-monks-accent focus:border-monks-accent"
        />
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'p-2 rounded-lg transition-colors duration-300 relative',
              showFilters ? 'bg-monks-accent text-white' : 'text-monks-gray hover:text-monks-black'
            )}
          >
            <Filter size={16} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          <button
            onClick={handleSearch}
            className="bg-monks-accent text-white px-4 py-2 rounded-lg hover:bg-monks-hover transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-monks-gray">Filters:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.key === key);
            return (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm"
              >
                <Tag size={12} />
                {filter?.label}: {String(value)}
                <button
                  onClick={() => removeFilter(key)}
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
          
          <button
            onClick={clearAllFilters}
            className="text-sm text-monks-gray hover:text-red-500 transition-colors duration-300"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-monks-gray/20 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filters.map((filter) => (
              <div key={filter.key}>
                {filter.type === 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">
                      {filter.label}
                    </label>
                    <input
                      type="text"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                )}
                
                {filter.type === 'select' && filter.options && (
                  <Select
                    label={filter.label}
                    options={filter.options}
                    value={activeFilters[filter.key]}
                    onChange={(value) => updateFilter(filter.key, value)}
                  />
                )}
                
                {filter.type === 'date' && (
                  <DatePicker
                    label={filter.label}
                    value={activeFilters[filter.key]}
                    onChange={(date) => updateFilter(filter.key, date)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};