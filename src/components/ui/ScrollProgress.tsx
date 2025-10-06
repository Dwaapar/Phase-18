import React from 'react';
import { cn } from '../../lib/utils';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className,
  color = '#0F62FE',
  height = 3
}) => {
  const { y: scrollY } = useScrollPosition();
  
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min((scrollY / documentHeight) * 100, 100);

  return (
    <div
      className={cn('fixed top-0 left-0 z-50 bg-monks-gray/20', className)}
      style={{ width: '100%', height }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};