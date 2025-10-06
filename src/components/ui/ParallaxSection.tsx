import React, { useRef } from 'react';
import { cn } from '../../lib/utils';
import { useScrollPosition } from '../../hooks/useScrollPosition';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { y: scrollY } = useScrollPosition();

  const getTransform = () => {
    if (!ref.current) return {};
    
    const rect = ref.current.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate if element is in viewport
    const elementBottom = elementTop + elementHeight;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + windowHeight;
    
    if (elementBottom < viewportTop || elementTop > viewportBottom) {
      return {};
    }
    
    const parallaxOffset = (scrollY - elementTop) * speed;
    const translateY = direction === 'up' ? -parallaxOffset : parallaxOffset;
    
    return {
      transform: `translateY(${translateY}px)`
    };
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div style={getTransform()}>
        {children}
      </div>
    </div>
  );
};