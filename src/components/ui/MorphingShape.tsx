import React from 'react';
import { cn } from '../../lib/utils';

interface MorphingShapeProps {
  shapes?: string[];
  duration?: number;
  size?: number;
  color?: string;
  className?: string;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({
  shapes = [
    'M50,10 L90,90 L10,90 Z', // Triangle
    'M10,50 Q10,10 50,10 Q90,10 90,50 Q90,90 50,90 Q10,90 10,50 Z', // Circle
    'M10,10 L90,10 L90,90 L10,90 Z', // Square
    'M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z' // Hexagon
  ],
  duration = 4000,
  size = 100,
  color = '#0F62FE',
  className
}) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path
          d={shapes[0]}
          fill={color + '20'}
          stroke={color}
          strokeWidth="2"
          className="animate-morph"
          style={{
            animationDuration: `${duration}ms`
          }}
        />
      </svg>
      
      <style jsx>{`
        @keyframes morph {
          0% { d: path("${shapes[0]}"); }
          25% { d: path("${shapes[1] || shapes[0]}"); }
          50% { d: path("${shapes[2] || shapes[0]}"); }
          75% { d: path("${shapes[3] || shapes[0]}"); }
          100% { d: path("${shapes[0]}"); }
        }
        
        .animate-morph {
          animation: morph ${duration}ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};