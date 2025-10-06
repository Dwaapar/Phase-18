import React from 'react';
import { cn } from '../../lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-start gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className="sr-only"
              />
              <div className={cn(
                'w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center',
                value === option.value
                  ? 'border-monks-accent bg-monks-accent'
                  : 'border-monks-gray/30 hover:border-monks-accent'
              )}>
                {value === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="font-medium text-monks-black">{option.label}</div>
              {option.description && (
                <div className="text-sm text-monks-gray">{option.description}</div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};