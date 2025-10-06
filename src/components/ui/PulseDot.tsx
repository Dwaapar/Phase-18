import React from 'react';
import { cn } from '../../lib/utils';

interface PulseDotProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const PulseDot: React.FC<PulseDotProps> = ({
  color = '#0F62FE',
  size = 'md',
  speed = 'normal',
  className
}) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const speeds = {
    slow: 'animate-pulse-slow',
    normal: 'animate-pulse',
    fast: 'animate-pulse-fast'
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        className={cn('rounded-full', sizes[size], speeds[speed])}
        style={{ backgroundColor: color }}
      />
      <div
        className={cn('absolute rounded-full animate-ping', sizes[size])}
        style={{ backgroundColor: color + '40' }}
      />
    </div>
  );
};