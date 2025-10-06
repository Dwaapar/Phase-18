import React from 'react';
import { cn } from '../../lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
  className
}) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const colors = {
    online: 'bg-green-500',
    offline: 'bg-monks-gray',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  const labels = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    away: 'Away'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'rounded-full',
        sizes[size],
        colors[status]
      )} />
      {showLabel && (
        <span className="text-sm text-monks-gray">{labels[status]}</span>
      )}
    </div>
  );
};