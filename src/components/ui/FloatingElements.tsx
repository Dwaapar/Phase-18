import React from 'react';
import { cn } from '../../lib/utils';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 6,
  className
}) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <>
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-br from-monks-accent/10 to-purple-500/10 animate-float"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </>
  );
};