import React, { useState } from 'react';
import { Filter, X, Calendar, DollarSign, Hash, Type } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DatePicker } from './DatePicker';
import { Select } from './Select';
import { Slider } from './Slider';
import { MultiSelect } from './MultiSelect';

interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'range';
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  placeholder?: string;
}

interface AdvancedFiltersProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
  onClear: () => void;
  className?: string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  values,
  onChange,
  onClear,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: string, value: any) => {
    onChange({ ...values, [key]: value });
  };

  const removeFilter = (key: string) => {
    const newValues = { ...values };
    delete newValues[key];
    onChange(newValues);
  };

  const activeFilterCount = Object.keys(values).filter(key => values[key]).length;

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'text': return Type;
      case 'date': 
      case 'daterange': return Calendar;
      case 'number':
      case 'range': return Hash;
      default: return Filter;
    }
  };

  const renderFilter = (filter: FilterConfig) => {
    const Icon = getFilterIcon(filter.type);
    
    switch (filter.type) {
      case 'text':
        return (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-monks-black mb-2">
              <Icon size={14} className="inline mr-2" />
              {filter.label}
            </label>
            <input
              type="text"
              value={values[filter.key] || ''}
              onChange={(e) => updateFilter(filter.key, e.target.value)}
              placeholder={filter.placeholder}
              className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
          </div>
        );

      case 'select':
        return (
          <Select
            key={filter.key}
            label={
              <span>
                <Icon size={14} className="inline mr-2" />
                {filter.label}
              </span>
            }
            options={filter.options || []}
            value={values[filter.key]}
            onChange={(value) => updateFilter(filter.key, value)}
            placeholder={filter.placeholder}
          />
        );

      case 'multiselect':
        return (
          <MultiSelect
            key={filter.key}
            label={
              <span>
                <Icon size={14} className="inline mr-2" />
                {filter.label}
              </span>
            }
            options={filter.options || []}
            value={values[filter.key] || []}
            onChange={(value) => updateFilter(filter.key, value)}
            placeholder={filter.placeholder}
          />
        );

      case 'date':
        return (
          <DatePicker
            key={filter.key}
            label={
              <span>
                <Icon size={14} className="inline mr-2" />
                {filter.label}
              </span>
            }
            value={values[filter.key]}
            onChange={(date) => updateFilter(filter.key, date)}
            placeholder={filter.placeholder}
          />
        );

      case 'range':
        return (
          <div key={filter.key}>
            <label className="block text-sm font-medium text-monks-black mb-2">
              <Icon size={14} className="inline mr-2" />
              {filter.label}
            </label>
            <Slider
              value={values[filter.key] || filter.min || 0}
              onChange={(value) => updateFilter(filter.key, value)}
              min={filter.min}
              max={filter.max}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative',
            isOpen ? 'bg-monks-accent text-white' : 'bg-monks-light-gray text-monks-gray hover:text-monks-black'
          )}
        >
          <Filter size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-monks-gray hover:text-red-500 transition-colors duration-300"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(values).map(([key, value]) => {
            if (!value) return null;
            const filter = filters.find(f => f.key === key);
            if (!filter) return null;

            return (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm"
              >
                {filter.label}: {Array.isArray(value) ? value.join(', ') : String(value)}
                <button
                  onClick={() => removeFilter(key)}
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white rounded-2xl border border-monks-gray/20 p-6 animate-slide-up">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filters.map(renderFilter)}
          </div>
        </div>
      )}
    </div>
  );
};