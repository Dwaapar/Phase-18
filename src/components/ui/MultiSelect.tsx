import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  maxSelections?: number;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  label,
  maxSelections,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : maxSelections && value.length >= maxSelections
        ? value
        : [...value, optionValue];
    
    onChange?.(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange?.(value.filter(v => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 flex items-center justify-between',
            className
          )}
        >
          <div className="flex-1 text-left">
            {value.length === 0 ? (
              <span className="text-monks-gray">{placeholder}</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {getSelectedLabels().slice(0, 3).map((label, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-xs"
                  >
                    {label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOption(value[i]);
                      }}
                      className="hover:text-red-500 transition-colors duration-300"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                {value.length > 3 && (
                  <span className="px-2 py-1 bg-monks-gray/10 text-monks-gray rounded-full text-xs">
                    +{value.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <ChevronDown
            size={20}
            className={cn(
              'text-monks-gray transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50 max-h-64 overflow-hidden">
            {/* Search */}
            <div className="px-4 pb-2">
              <input
                type="text"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent text-sm"
              />
            </div>
            
            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                const isDisabled = option.disabled || 
                  (maxSelections && !isSelected && value.length >= maxSelections);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => !isDisabled && toggleOption(option.value)}
                    disabled={isDisabled}
                    className={cn(
                      'w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3',
                      isDisabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 border-2 rounded flex items-center justify-center',
                      isSelected ? 'border-monks-accent bg-monks-accent' : 'border-monks-gray/30'
                    )}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-monks-black">{option.label}</span>
                  </button>
                );
              })}
              
              {filteredOptions.length === 0 && (
                <div className="px-4 py-3 text-center text-monks-gray">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};