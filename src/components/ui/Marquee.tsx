import React from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className
}) => {
  const speeds = {
    slow: '60s',
    normal: '30s',
    fast: '15s'
  };

  const directions = {
    left: 'animate-marquee-left',
    right: 'animate-marquee-right',
    up: 'animate-marquee-up',
    down: 'animate-marquee-down'
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className={cn(
          directions[direction],
          pauseOnHover && 'hover:animation-paused'
        )}
        style={{
          animationDuration: speeds[speed]
        }}
      >
        {children}
      </div>
      
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes marquee-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        
        @keyframes marquee-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
        
        .animate-marquee-up {
          animation: marquee-up linear infinite;
        }
        
        .animate-marquee-down {
          animation: marquee-down linear infinite;
        }
        
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};