import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingProps {
  value?: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  size = 'md',
  readonly = false,
  showValue = false,
  className
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const displayValue = readonly ? value : (hoverValue || value);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayValue;
          
          return (
            <button
              key={i}
              type="button"
              onClick={() => !readonly && onChange?.(starValue)}
              onMouseEnter={() => !readonly && setHoverValue(starValue)}
              onMouseLeave={() => !readonly && setHoverValue(0)}
              disabled={readonly}
              className={cn(
                'transition-all duration-300',
                !readonly && 'hover:scale-110 cursor-pointer',
                readonly && 'cursor-default'
              )}
            >
              <Star
                size={sizes[size]}
                className={cn(
                  'transition-colors duration-300',
                  isFilled
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-monks-gray/30'
                )}
              />
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm text-monks-gray">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};