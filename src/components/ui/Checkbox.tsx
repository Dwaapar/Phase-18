import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  description,
  className
}) => {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          'w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center',
          checked
            ? 'bg-monks-accent border-monks-accent'
            : 'border-monks-gray/30 hover:border-monks-accent'
        )}>
          {checked && <Check size={14} className="text-white" />}
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