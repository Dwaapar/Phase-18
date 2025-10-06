import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ComboBoxOption {
  value: string;
  label: string;
}

interface ComboBoxProps {
  options: ComboBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  creatable?: boolean;
  onCreateOption?: (value: string) => void;
  className?: string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select or type...",
  label,
  searchable = true,
  creatable = false,
  onCreateOption,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleCreate = () => {
    if (creatable && searchQuery && !options.find(opt => opt.label === searchQuery)) {
      onCreateOption?.(searchQuery);
      onChange?.(searchQuery);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const showCreateOption = creatable && 
    searchQuery && 
    !filteredOptions.find(opt => opt.label.toLowerCase() === searchQuery.toLowerCase());

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          className={cn(
            'w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus-within:ring-2 focus-within:ring-monks-accent transition-all duration-300 flex items-center justify-between cursor-pointer',
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {searchable && isOpen ? (
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              autoFocus
            />
          ) : (
            <span className={selectedOption ? 'text-monks-black' : 'text-monks-gray'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          )}
          
          <ChevronDown
            size={20}
            className={cn(
              'text-monks-gray transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50 max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3"
              >
                <Check
                  size={16}
                  className={cn(
                    'transition-opacity duration-300',
                    value === option.value ? 'opacity-100 text-monks-accent' : 'opacity-0'
                  )}
                />
                <span className="text-monks-black">{option.label}</span>
              </button>
            ))}
            
            {showCreateOption && (
              <button
                onClick={handleCreate}
                className="w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 border-t border-monks-gray/10"
              >
                <span className="text-monks-accent">Create "{searchQuery}"</span>
              </button>
            )}
            
            {filteredOptions.length === 0 && !showCreateOption && (
              <div className="px-4 py-3 text-center text-monks-gray">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};