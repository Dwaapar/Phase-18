import React from 'react';
import { cn } from '../../lib/utils';
import { AnimatedNumber } from './AnimatedNumber';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
}

interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: 'default' | 'cards' | 'minimal';
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 4,
  className,
  variant = 'default'
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  const renderStat = (stat: Stat, index: number) => {
    if (variant === 'cards') {
      return (
        <div key={index} className="bg-white rounded-3xl p-8 text-center">
          <div className="text-4xl font-bold text-monks-accent mb-2">
            <AnimatedNumber 
              end={stat.value} 
              prefix={stat.prefix} 
              suffix={stat.suffix}
            />
          </div>
          <div className="text-monks-black font-medium mb-1">{stat.label}</div>
          {stat.description && (
            <div className="text-sm text-monks-gray">{stat.description}</div>
          )}
        </div>
      );
    }

    if (variant === 'minimal') {
      return (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-monks-black mb-1">
            <AnimatedNumber 
              end={stat.value} 
              prefix={stat.prefix} 
              suffix={stat.suffix}
            />
          </div>
          <div className="text-monks-gray">{stat.label}</div>
        </div>
      );
    }

    return (
      <div key={index} className="text-center">
        <div className="text-4xl font-bold text-monks-accent mb-2">
          <AnimatedCounter 
            end={stat.value} 
            prefix={stat.prefix} 
            suffix={stat.suffix}
          />
        </div>
        <div className="text-monks-black font-medium mb-1">{stat.label}</div>
        {stat.description && (
          <div className="text-sm text-monks-gray">{stat.description}</div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      'grid gap-8',
      gridCols[columns],
      className
    )}>
      {stats.map(renderStat)}
    </div>
  );
};