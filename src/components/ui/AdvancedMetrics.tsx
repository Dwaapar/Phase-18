import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatedNumber } from './AnimatedNumber';
import { Sparkline } from './Sparkline';

interface MetricData {
  label: string;
  value: number;
  previousValue?: number;
  target?: number;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
  trend?: number[];
  color?: string;
}

interface AdvancedMetricsProps {
  metrics: MetricData[];
  layout?: 'grid' | 'list';
  showSparklines?: boolean;
  showTargets?: boolean;
  className?: string;
}

export const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({
  metrics,
  layout = 'grid',
  showSparklines = true,
  showTargets = true,
  className
}) => {
  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'duration':
        return `${value}ms`;
      default:
        return value.toLocaleString();
    }
  };

  const getChangeColor = (current: number, previous?: number) => {
    if (!previous) return 'text-monks-gray';
    const change = current - previous;
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-monks-gray';
  };

  const getChangeIcon = (current: number, previous?: number) => {
    if (!previous) return Activity;
    const change = current - previous;
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Activity;
  };

  const getTargetProgress = (value: number, target?: number) => {
    if (!target) return 0;
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className={cn(
      layout === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4',
      className
    )}>
      {metrics.map((metric, i) => {
        const ChangeIcon = getChangeIcon(metric.value, metric.previousValue);
        const changePercent = metric.previousValue 
          ? ((metric.value - metric.previousValue) / metric.previousValue) * 100 
          : 0;

        return (
          <div
            key={i}
            className={cn(
              'bg-white rounded-3xl p-6 border border-monks-gray/10 hover:shadow-card transition-all duration-300',
              layout === 'list' && 'flex items-center justify-between'
            )}
          >
            <div className={cn(
              'space-y-4',
              layout === 'list' && 'space-y-0 flex-1'
            )}>
              {/* Header */}
              <div className={cn(
                'flex items-center justify-between',
                layout === 'list' && 'flex-col items-start gap-1'
              )}>
                <h3 className="text-sm font-medium text-monks-gray">{metric.label}</h3>
                {layout === 'grid' && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                       style={{ backgroundColor: (metric.color || '#0F62FE') + '20' }}>
                    <Activity size={16} style={{ color: metric.color || '#0F62FE' }} />
                  </div>
                )}
              </div>
              
              {/* Value */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-monks-black">
                  <AnimatedNumber
                    value={metric.value}
                    prefix={metric.format === 'currency' ? '$' : ''}
                    suffix={metric.format === 'percentage' ? '%' : ''}
                  />
                </div>
                
                {/* Change Indicator */}
                {metric.previousValue && (
                  <div className={cn(
                    'flex items-center gap-1 text-sm',
                    getChangeColor(metric.value, metric.previousValue)
                  )}>
                    <ChangeIcon size={14} />
                    <span>
                      {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
                    </span>
                    <span className="text-monks-gray">vs last period</span>
                  </div>
                )}
              </div>
              
              {/* Target Progress */}
              {showTargets && metric.target && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-monks-gray">Target</span>
                    <span className="text-monks-black font-medium">
                      {formatValue(metric.target, metric.format)}
                    </span>
                  </div>
                  <div className="w-full bg-monks-light-gray rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${getTargetProgress(metric.value, metric.target)}%`,
                        backgroundColor: metric.color || '#0F62FE'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Sparkline */}
            {showSparklines && metric.trend && layout === 'grid' && (
              <div className="mt-4">
                <Sparkline
                  data={metric.trend}
                  color={metric.color || '#0F62FE'}
                  height={40}
                />
              </div>
            )}
            
            {layout === 'list' && showSparklines && metric.trend && (
              <div className="ml-6">
                <Sparkline
                  data={metric.trend}
                  color={metric.color || '#0F62FE'}
                  width={100}
                  height={30}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};