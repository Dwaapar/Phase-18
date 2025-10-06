import React from 'react';
import { cn } from '../../lib/utils';

interface WaveAnimationProps {
  color?: string;
  height?: number;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
  color = '#0F62FE',
  height = 60,
  speed = 'normal',
  className
}) => {
  const speeds = {
    slow: '4s',
    normal: '2s',
    fast: '1s'
  };

  return (
    <div className={cn('relative overflow-hidden', className)} style={{ height }}>
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill={color + '20'}
          className="animate-wave-1"
          style={{ animationDuration: speeds[speed] }}
        />
        <path
          d="M0,80 C300,20 900,100 1200,40 L1200,120 L0,120 Z"
          fill={color + '40'}
          className="animate-wave-2"
          style={{ animationDuration: speeds[speed] }}
        />
        <path
          d="M0,100 C300,60 900,140 1200,100 L1200,120 L0,120 Z"
          fill={color}
          className="animate-wave-3"
          style={{ animationDuration: speeds[speed] }}
        />
      </svg>
      
      <style jsx>{`
        @keyframes wave-1 {
          0% { d: path("M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"); }
          50% { d: path("M0,80 C300,40 900,120 1200,80 L1200,120 L0,120 Z"); }
          100% { d: path("M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"); }
        }
        
        @keyframes wave-2 {
          0% { d: path("M0,80 C300,20 900,100 1200,40 L1200,120 L0,120 Z"); }
          50% { d: path("M0,40 C300,100 900,20 1200,80 L1200,120 L0,120 Z"); }
          100% { d: path("M0,80 C300,20 900,100 1200,40 L1200,120 L0,120 Z"); }
        }
        
        @keyframes wave-3 {
          0% { d: path("M0,100 C300,60 900,140 1200,100 L1200,120 L0,120 Z"); }
          50% { d: path("M0,120 C300,80 900,60 1200,120 L1200,120 L0,120 Z"); }
          100% { d: path("M0,100 C300,60 900,140 1200,100 L1200,120 L0,120 Z"); }
        }
        
        .animate-wave-1 {
          animation: wave-1 ease-in-out infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 ease-in-out infinite reverse;
        }
        
        .animate-wave-3 {
          animation: wave-3 ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};