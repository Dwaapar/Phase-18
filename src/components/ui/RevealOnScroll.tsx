import React from 'react';
import { cn } from '../../lib/utils';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce: true
  });

  const animations = {
    fade: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    'slide-up': {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0'
    },
    'slide-down': {
      initial: 'opacity-0 -translate-y-8',
      animate: 'opacity-100 translate-y-0'
    },
    'slide-left': {
      initial: 'opacity-0 translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    'slide-right': {
      initial: 'opacity-0 -translate-x-8',
      animate: 'opacity-100 translate-x-0'
    },
    scale: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    },
    rotate: {
      initial: 'opacity-0 rotate-12 scale-95',
      animate: 'opacity-100 rotate-0 scale-100'
    }
  };

  const animationClasses = animations[animation];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isIntersecting ? animationClasses.animate : animationClasses.initial,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};