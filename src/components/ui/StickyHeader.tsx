import React from 'react';
import { cn } from '../../lib/utils';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface StickyHeaderProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
  stickyClassName?: string;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  children,
  threshold = 100,
  className,
  stickyClassName
}) => {
  const { y: scrollY } = useScrollPosition();
  const isSticky = scrollY > threshold;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isSticky && stickyClassName,
        className
      )}
    >
      {children}
    </header>
  );
};