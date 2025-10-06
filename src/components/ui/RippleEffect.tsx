import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  color = '#0F62FE',
  duration = 600,
  className
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration);
  };

  return (
    <div
      className={cn('relative overflow-hidden cursor-pointer', className)}
      onMouseDown={createRipple}
    >
      {children}
      
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: color + '40',
            animationDuration: `${duration}ms`
          }}
        />
      ))}
    </div>
  );
};