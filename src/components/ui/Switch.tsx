import React from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  description,
  size = 'md',
  className
}) => {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' }
  };

  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          'rounded-full transition-all duration-300',
          sizes[size].track,
          checked ? 'bg-monks-accent' : 'bg-monks-gray/20'
        )}>
          <div className={cn(
            'bg-white rounded-full transition-all duration-300 shadow-sm',
            sizes[size].thumb,
            checked ? sizes[size].translate : 'translate-x-0.5',
            'absolute top-0.5'
          )} />
        </div>
      </div>
      
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <div className="font-medium text-monks-black">{label}</div>
          )}
          {description && (
            <div className="text-sm text-monks-gray">{description}</div>
          )}
        </div>
      )}
    </label>
  );
};