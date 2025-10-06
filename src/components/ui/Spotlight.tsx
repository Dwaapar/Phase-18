import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

interface SpotlightItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  href?: string;
  action?: () => void;
  icon?: React.ReactNode;
}

interface SpotlightProps {
  items: SpotlightItem[];
  placeholder?: string;
  className?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  items,
  placeholder = "Search anything...",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Open with Cmd+K or Ctrl+K
  useKeyboardShortcut(
    { key: 'k', metaKey: true },
    () => setIsOpen(true)
  );
  
  useKeyboardShortcut(
    { key: 'k', ctrlKey: true },
    () => setIsOpen(true)
  );

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase()) ||
    item.category?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          const selectedItem = filteredItems[selectedIndex];
          if (selectedItem) {
            if (selectedItem.action) {
              selectedItem.action();
            } else if (selectedItem.href) {
              window.location.href = selectedItem.href;
            }
            setIsOpen(false);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-3 px-4 py-2 bg-monks-light-gray rounded-full text-monks-gray hover:text-monks-black transition-colors duration-300',
          className
        )}
      >
        <Search size={16} />
        <span className="text-sm">Search...</span>
        <kbd className="px-2 py-1 bg-white rounded text-xs">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 z-50">
      <div className="bg-white rounded-3xl shadow-elevated w-full max-w-2xl mx-4 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-6 border-b border-monks-gray/10">
          <Search size={20} className="text-monks-gray" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-monks-black placeholder-monks-gray text-lg"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-monks-light-gray rounded text-xs text-monks-gray">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredItems.length > 0 ? (
            <div className="p-2">
              {filteredItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.href) {
                      window.location.href = item.href;
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3',
                    i === selectedIndex
                      ? 'bg-monks-accent text-white'
                      : 'hover:bg-monks-light-gray text-monks-black'
                  )}
                >
                  {item.icon && (
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className={cn(
                        'text-sm',
                        i === selectedIndex ? 'text-white/80' : 'text-monks-gray'
                      )}>
                        {item.description}
                      </div>
                    )}
                    {item.category && (
                      <div className={cn(
                        'text-xs',
                        i === selectedIndex ? 'text-white/60' : 'text-monks-gray/60'
                      )}>
                        {item.category}
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight size={16} className="flex-shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-monks-gray">
              {query ? `No results found for "${query}"` : 'Start typing to search...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};