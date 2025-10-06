import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatedNumber } from './AnimatedNumber';

interface MetricDisplayProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change?: {
    value: number;
    period: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  suffix = '',
  prefix = '',
  change,
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: {
      value: 'text-2xl',
      label: 'text-sm'
    },
    md: {
      value: 'text-4xl',
      label: 'text-base'
    },
    lg: {
      value: 'text-5xl',
      label: 'text-lg'
    }
  };

  return (
    <div className={cn('text-center space-y-2', className)}>
      <div className={cn('font-bold text-monks-black', sizes[size].value)}>
        <AnimatedNumber 
          end={value} 
          prefix={prefix} 
          suffix={suffix}
        />
      </div>
      <div className={cn('text-monks-gray', sizes[size].label)}>{label}</div>
      {change && (
        <div className={cn(
          'flex items-center justify-center gap-1 text-sm font-medium',
          change.value >= 0 ? 'text-green-600' : 'text-red-600'
        )}>
          {change.value >= 0 ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{change.value >= 0 ? '+' : ''}{change.value}%</span>
          <span className="text-monks-gray">vs {change.period}</span>
        </div>
      )}
    </div>
  );
};