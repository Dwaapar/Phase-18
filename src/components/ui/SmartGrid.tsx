import React, { useState, useEffect } from 'react';
import { Grid3x3 as Grid3X3, List, LayoutGrid } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SmartGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  layouts?: Array<{
    name: string;
    icon: React.ReactNode;
    columns: string;
  }>;
  defaultLayout?: string;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  className?: string;
}

export function SmartGrid<T extends Record<string, any>>({
  items,
  renderItem,
  layouts = [
    { name: 'grid', icon: <LayoutGrid size={16} />, columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' },
    { name: 'list', icon: <List size={16} />, columns: 'grid-cols-1' },
    { name: 'compact', icon: <Grid3X3 size={16} />, columns: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }
  ],
  defaultLayout = 'grid',
  searchable = true,
  filterable = false,
  sortable = false,
  className
}: SmartGridProps<T>) {
  const [currentLayout, setCurrentLayout] = useState(defaultLayout);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const currentLayoutConfig = layouts.find(layout => layout.name === currentLayout) || layouts[0];

  // Filter items based on search
  const filteredItems = searchable
    ? items.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : items;

  // Sort items
  const sortedItems = sortable && sortBy
    ? [...filteredItems].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredItems;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {searchable && (
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
          )}
          
          {sortable && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            >
              <option value="">Sort by...</option>
              {Object.keys(items[0] || {}).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          )}
        </div>
        
        {/* Layout Switcher */}
        <div className="flex items-center gap-1 bg-monks-light-gray rounded-full p-1">
          {layouts.map((layout) => (
            <button
              key={layout.name}
              onClick={() => setCurrentLayout(layout.name)}
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                currentLayout === layout.name
                  ? 'bg-white text-monks-black shadow-sm'
                  : 'text-monks-gray hover:text-monks-black'
              )}
              title={layout.name}
            >
              {layout.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={cn('grid gap-6', currentLayoutConfig.columns)}>
        {sortedItems.map((item, index) => (
          <div key={index} className="animate-fade-in">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {sortedItems.length === 0 && (
        <div className="text-center py-12 text-monks-gray">
          {searchQuery ? `No items found for "${searchQuery}"` : 'No items available'}
        </div>
      )}
    </div>
  );
}