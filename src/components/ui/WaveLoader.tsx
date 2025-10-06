import React from 'react';
import { cn } from '../../lib/utils';

interface WaveLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const WaveLoader: React.FC<WaveLoaderProps> = ({
  size = 'md',
  color = '#0F62FE',
  className
}) => {
  const sizes = {
    sm: { container: 'w-8 h-4', bar: 'w-1' },
    md: { container: 'w-12 h-6', bar: 'w-1.5' },
    lg: { container: 'w-16 h-8', bar: 'w-2' }
  };

  return (
    <div className={cn('flex items-end justify-center gap-1', sizes[size].container, className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-current animate-wave',
            sizes[size].bar
          )}
          style={{
            color,
            animationDelay: `${i * 0.1}s`,
            height: '20%'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes wave {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
        
        .animate-wave {
          animation: wave 1.2s infinite ease-in-out;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
};