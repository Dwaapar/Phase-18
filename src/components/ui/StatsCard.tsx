import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatedCounter } from './AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  suffix = '',
  prefix = '',
  description,
  icon: Icon,
  trend,
  className
}) => {
  return (
    <div className={cn('bg-white rounded-3xl p-8 border border-monks-gray/10', className)}>
      <div className="space-y-4">
        {Icon && (
          <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
            <Icon size={20} className="text-monks-accent" />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="text-3xl font-bold text-monks-black">
            <AnimatedCounter 
              end={value} 
              prefix={prefix} 
              suffix={suffix}
            />
          </div>
          <h3 className="text-monks-gray font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-monks-gray">{description}</p>
          )}
        </div>

        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
            <span className="text-monks-gray">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};