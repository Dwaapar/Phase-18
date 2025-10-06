import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  className
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        children
      ) : (
        fallback || (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        )
      )}
    </div>
  );
};