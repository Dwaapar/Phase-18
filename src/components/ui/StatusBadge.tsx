import React from 'react';
import { Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showIcon = true,
  className
}) => {
  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-800 border-green-200',
      iconColor: 'text-green-500',
      label: 'Active'
    },
    inactive: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      iconColor: 'text-gray-500',
      label: 'Inactive'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      iconColor: 'text-yellow-500',
      label: 'Pending'
    },
    error: {
      color: 'bg-red-100 text-red-800 border-red-200',
      iconColor: 'text-red-500',
      label: 'Error'
    },
    success: {
      color: 'bg-green-100 text-green-800 border-green-200',
      iconColor: 'text-green-500',
      label: 'Success'
    },
    warning: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      iconColor: 'text-yellow-500',
      label: 'Warning'
    }
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 8,
    md: 10,
    lg: 12
  };

  const config = statusConfig[status];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full border',
      config.color,
      sizes[size],
      className
    )}>
      {showIcon && (
        <Circle
          size={iconSizes[size]}
          className={cn('fill-current', config.iconColor)}
        />
      )}
      {label || config.label}
    </span>
  );
};