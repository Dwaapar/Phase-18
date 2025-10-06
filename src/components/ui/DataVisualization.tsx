import React from 'react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = '#0F62FE',
  className
}) => {
  return (
    <div className={cn('bg-white rounded-3xl p-6 border border-monks-gray/10', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-monks-gray">{title}</h3>
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
            <div style={{ color }}>{icon}</div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-monks-black">{value}</div>
        
        {change && (
          <div className={cn(
            'flex items-center gap-1 text-sm',
            change.value >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            <span>{change.value >= 0 ? '+' : ''}{change.value}%</span>
            <span className="text-monks-gray">vs {change.period}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface TrendLineProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export const TrendLine: React.FC<TrendLineProps> = ({
  data,
  color = '#0F62FE',
  height = 40,
  className
}) => {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((max - value) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('overflow-visible', className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

interface ProgressBarProps {
  segments: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  total?: number;
  height?: number;
  showLabels?: boolean;
  className?: string;
}

export const SegmentedProgressBar: React.FC<ProgressBarProps> = ({
  segments,
  total,
  height = 8,
  showLabels = true,
  className
}) => {
  const totalValue = total || segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Progress Bar */}
      <div
        className="w-full bg-monks-light-gray rounded-full overflow-hidden"
        style={{ height }}
      >
        <div className="flex h-full">
          {segments.map((segment, i) => {
            const percentage = (segment.value / totalValue) * 100;
            return (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: segment.color
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="flex items-center justify-between text-sm">
          {segments.map((segment, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-monks-black font-medium">{segment.label}</span>
              <span className="text-monks-gray">({segment.value})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};