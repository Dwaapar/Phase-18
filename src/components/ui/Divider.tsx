import React from 'react';
import { cn } from '../../lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className,
  children
}) => {
  if (children) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="flex-1 h-px bg-monks-gray/20" />
        <span className="text-sm text-monks-gray font-medium">{children}</span>
        <div className="flex-1 h-px bg-monks-gray/20" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
        'bg-monks-gray/20',
        className
      )}
    />
  );
};