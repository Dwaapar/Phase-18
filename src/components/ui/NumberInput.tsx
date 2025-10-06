import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  error?: string;
  showControls?: boolean;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value = 0,
  onChange,
  min,
  max,
  step = 1,
  label,
  error,
  showControls = true,
  className
}) => {
  const handleIncrement = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className={cn('relative', className)}>
        {showControls && (
          <button
            type="button"
            onClick={handleDecrement}
            disabled={min !== undefined && value <= min}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-monks-gray/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <Minus size={16} />
          </button>
        )}
        
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className={cn(
            'w-full py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 text-center',
            showControls ? 'px-12' : 'px-4',
            error && 'ring-2 ring-red-500'
          )}
        />
        
        {showControls && (
          <button
            type="button"
            onClick={handleIncrement}
            disabled={max !== undefined && value >= max}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-monks-gray/10 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};