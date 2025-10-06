import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TrendIndicatorProps {
  value: number;
  previousValue?: number;
  format?: 'number' | 'percentage' | 'currency';
  showIcon?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  previousValue,
  format = 'number',
  showIcon = true,
  showValue = true,
  size = 'md',
  className
}) => {
  const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  const sizes = {
    sm: { text: 'text-xs', icon: 12 },
    md: { text: 'text-sm', icon: 14 },
    lg: { text: 'text-base', icon: 16 }
  };

  const getColor = () => {
    if (isPositive) return 'text-green-600';
    if (isNegative) return 'text-red-600';
    return 'text-monks-gray';
  };

  const getIcon = () => {
    if (isPositive) return TrendingUp;
    if (isNegative) return TrendingDown;
    return Minus;
  };

  const Icon = getIcon();

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {showIcon && (
        <Icon size={sizes[size].icon} className={getColor()} />
      )}
      
      {showValue && (
        <span className={cn('font-medium', getColor(), sizes[size].text)}>
          {isPositive && '+'}
          {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
  );
};