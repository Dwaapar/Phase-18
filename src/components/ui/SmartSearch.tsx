import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp as Trending, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  type?: string;
}

interface SmartSearchProps {
  onSearch?: (query: string) => Promise<SearchResult[]>;
  placeholder?: string;
  recentSearches?: string[];
  trendingSearches?: string[];
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  onSearch,
  placeholder = "Search anything...",
  recentSearches = [],
  trendingSearches = [],
  onResultSelect,
  className
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery && onSearch) {
      setIsLoading(true);
      onSearch(debouncedQuery)
        .then(setResults)
        .finally(() => setIsLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedQuery, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          onResultSelect?.(results[selectedIndex]);
          setQuery('');
          setIsFocused(false);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result);
    setQuery('');
    setIsFocused(false);
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
  };

  const showDropdown = isFocused && (query || recentSearches.length > 0 || trendingSearches.length > 0);

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-12 py-4 rounded-full bg-white border border-monks-gray/20 text-monks-black focus:ring-2 focus:ring-monks-accent focus:border-monks-accent transition-all duration-300"
        />
        
        {query && (
          <button
            onClick={clearQuery}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-monks-gray hover:text-monks-black transition-colors duration-300"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-4 z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {query && (
            <div>
              {isLoading ? (
                <div className="px-4 py-8 text-center text-monks-gray">
                  <div className="animate-spin w-6 h-6 border-2 border-monks-accent border-t-transparent rounded-full mx-auto mb-2" />
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h4 className="px-4 py-2 text-sm font-medium text-monks-gray">Results</h4>
                  {results.map((result, i) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={cn(
                        'w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300',
                        i === selectedIndex && 'bg-monks-accent text-white'
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{result.title}</div>
                        {result.description && (
                          <div className={cn(
                            'text-sm',
                            i === selectedIndex ? 'text-white/80' : 'text-monks-gray'
                          )}>
                            {result.description}
                          </div>
                        )}
                        {result.category && (
                          <div className={cn(
                            'text-xs',
                            i === selectedIndex ? 'text-white/60' : 'text-monks-gray/60'
                          )}>
                            {result.category}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-monks-gray">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div>
              <h4 className="px-4 py-2 text-sm font-medium text-monks-gray flex items-center gap-2">
                <Clock size={14} />
                Recent Searches
              </h4>
              {recentSearches.map((search, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(search)}
                  className="w-full text-left px-4 py-2 hover:bg-monks-light-gray transition-colors duration-300 text-monks-black"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {!query && trendingSearches.length > 0 && (
            <div className={recentSearches.length > 0 ? 'border-t border-monks-gray/10 mt-2 pt-2' : ''}>
              <h4 className="px-4 py-2 text-sm font-medium text-monks-gray flex items-center gap-2">
                <Trending size={14} />
                Trending
              </h4>
              {trendingSearches.map((search, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(search)}
                  className="w-full text-left px-4 py-2 hover:bg-monks-light-gray transition-colors duration-300 text-monks-black"
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};