import React from 'react';
import { cn } from '../../lib/utils';

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export const TextShimmer: React.FC<TextShimmerProps> = ({
  children,
  className,
  speed = 'normal'
}) => {
  const speeds = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
  };

  return (
    <span
      className={cn(
        'bg-gradient-to-r from-monks-black via-monks-accent to-monks-black bg-clip-text text-transparent animate-shimmer',
        className
      )}
      style={{
        backgroundSize: '200% 100%',
        animationDuration: speeds[speed]
      }}
    >
      {children}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          animation: shimmer linear infinite;
        }
      `}</style>
    </span>
  );
};