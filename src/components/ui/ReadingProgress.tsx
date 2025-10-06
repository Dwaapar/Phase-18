import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ReadingProgressProps {
  target?: React.RefObject<HTMLElement>;
  className?: string;
  color?: string;
  height?: number;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  target,
  className,
  color = '#0F62FE',
  height = 3
}) => {
  const [progress, setProgress] = useState(0);
  const defaultRef = useRef<HTMLElement>(null);
  const targetRef = target || defaultRef;

  useEffect(() => {
    const updateProgress = () => {
      if (!targetRef.current) return;

      const element = targetRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + windowHeight;
      
      if (scrollTop >= elementTop && scrollTop <= elementTop + elementHeight) {
        const scrolled = scrollTop - elementTop;
        const total = elementHeight - windowHeight;
        const percentage = Math.min((scrolled / total) * 100, 100);
        setProgress(Math.max(0, percentage));
      } else if (scrollBottom >= elementTop + elementHeight) {
        setProgress(100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [targetRef]);

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