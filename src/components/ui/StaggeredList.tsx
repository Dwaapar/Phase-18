import React from 'react';
import { cn } from '../../lib/utils';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fade' | 'slide-up' | 'scale';
  className?: string;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 100,
  animation = 'slide-up',
  className
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const animations = {
    fade: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    'slide-up': {
      initial: 'opacity-0 translate-y-4',
      animate: 'opacity-100 translate-y-0'
    },
    scale: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    }
  };

  const animationClasses = animations[animation];

  return (
    <div ref={ref} className={cn('space-y-4', className)}>
      {children.map((child, i) => (
        <div
          key={i}
          className={cn(
            'transition-all duration-500 ease-out',
            isIntersecting ? animationClasses.animate : animationClasses.initial
          )}
          style={{
            transitionDelay: isIntersecting ? `${i * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};