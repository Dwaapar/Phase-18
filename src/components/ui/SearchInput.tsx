import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: 'pl-8 pr-3 py-2 text-sm',
    md: 'pl-10 pr-4 py-3 text-base',
    lg: 'pl-12 pr-4 py-4 text-lg'
  };

  const iconSizes = {
    sm: { size: 16, left: 'left-2' },
    md: { size: 20, left: 'left-3' },
    lg: { size: 24, left: 'left-4' }
  };

  return (
    <div className="relative">
      <Search 
        size={iconSizes[size].size} 
        className={cn('absolute top-1/2 transform -translate-y-1/2 text-monks-gray', iconSizes[size].left)} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300',
          sizes[size],
          className
        )}
      />
    </div>
  );
};