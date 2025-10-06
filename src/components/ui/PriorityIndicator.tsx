import React from 'react';
import { AlertTriangle, Minus, ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriorityIndicatorProps {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  showLabel = true,
  size = 'md',
  className
}) => {
  const priorityConfig = {
    low: {
      color: 'text-green-600 bg-green-100',
      icon: Minus,
      label: 'Low'
    },
    medium: {
      color: 'text-yellow-600 bg-yellow-100',
      icon: Minus,
      label: 'Medium'
    },
    high: {
      color: 'text-orange-600 bg-orange-100',
      icon: ArrowUp,
      label: 'High'
    },
    urgent: {
      color: 'text-red-600 bg-red-100',
      icon: AlertTriangle,
      label: 'Urgent'
    }
  };

  const sizes = {
    sm: { container: 'px-2 py-1 text-xs', icon: 12 },
    md: { container: 'px-3 py-1 text-sm', icon: 14 },
    lg: { container: 'px-4 py-2 text-base', icon: 16 }
  };

  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      config.color,
      sizes[size].container,
      className
    )}>
      <Icon size={sizes[size].icon} />
      {showLabel && config.label}
    </span>
  );
};