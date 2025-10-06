import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  maxTags?: number;
  suggestions?: string[];
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = "Add tags...",
  label,
  maxTags,
  suggestions = [],
  className
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      if (!maxTags || value.length < maxTags) {
        onChange?.([...value, trimmedTag]);
        setInputValue('');
        setShowSuggestions(false);
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ',':
        e.preventDefault();
        addTag(inputValue);
        break;
      case 'Backspace':
        if (inputValue === '' && value.length > 0) {
          removeTag(value[value.length - 1]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

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
            'w-full min-h-[3rem] px-4 py-3 rounded-2xl bg-monks-light-gray border-0 focus-within:ring-2 focus-within:ring-monks-accent transition-all duration-300 flex flex-wrap items-center gap-2',
            className
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Tags */}
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-500 transition-colors duration-300"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          
          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-monks-black placeholder-monks-gray"
            disabled={maxTags && value.length >= maxTags}
          />
          
          {inputValue && (
            <button
              onClick={() => addTag(inputValue)}
              className="p-1 text-monks-accent hover:text-monks-black transition-colors duration-300"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-monks-light-gray transition-colors duration-300 text-monks-black"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {maxTags && (
        <div className="text-sm text-monks-gray">
          {value.length} / {maxTags} tags
        </div>
      )}
    </div>
  );
};