import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white rounded-full border border-monks-gray/20 hover:border-monks-accent/30 transition-all duration-300"
      >
        <Filter size={16} className="text-monks-gray" />
        <span className="text-monks-black font-medium">
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronDown 
          size={16} 
          className={cn(
            'text-monks-gray transition-transform duration-300',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center justify-between"
            >
              <span className="text-monks-black">{option.label}</span>
              {option.count && (
                <span className="text-monks-gray text-sm">({option.count})</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};