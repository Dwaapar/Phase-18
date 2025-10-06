import React from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HealthIndicatorProps {
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  label?: string;
  description?: string;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  status,
  label,
  description,
  showPulse = true,
  size = 'md',
  className
}) => {
  const statusConfig = {
    healthy: {
      color: 'text-green-600 bg-green-100',
      icon: CheckCircle,
      label: 'Healthy',
      pulseColor: 'bg-green-500'
    },
    warning: {
      color: 'text-yellow-600 bg-yellow-100',
      icon: AlertTriangle,
      label: 'Warning',
      pulseColor: 'bg-yellow-500'
    },
    critical: {
      color: 'text-red-600 bg-red-100',
      icon: XCircle,
      label: 'Critical',
      pulseColor: 'bg-red-500'
    },
    unknown: {
      color: 'text-gray-600 bg-gray-100',
      icon: Activity,
      label: 'Unknown',
      pulseColor: 'bg-gray-500'
    }
  };

  const sizes = {
    sm: { container: 'px-2 py-1 text-xs', icon: 12 },
    md: { container: 'px-3 py-1 text-sm', icon: 14 },
    lg: { container: 'px-4 py-2 text-base', icon: 16 }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Status Indicator */}
      <div className="relative">
        <div className={cn(
          'rounded-full flex items-center justify-center',
          config.color,
          size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'
        )}>
          <Icon size={sizes[size].icon} />
        </div>
        
        {showPulse && status !== 'unknown' && (
          <div className={cn(
            'absolute inset-0 rounded-full animate-ping',
            config.pulseColor,
            'opacity-20'
          )} />
        )}
      </div>
      
      {/* Label and Description */}
      {(label || description) && (
        <div>
          <div className={cn('font-medium', sizes[size].container.split(' ')[2])}>
            {label || config.label}
          </div>
          {description && (
            <div className="text-xs text-monks-gray">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};