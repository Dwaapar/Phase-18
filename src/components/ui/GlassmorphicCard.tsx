import React from 'react';
import { cn } from '../../lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  blur = 'md',
  opacity = 0.1,
  className
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  return (
    <div className={cn(
      'rounded-3xl border border-white/20 p-8 transition-all duration-300',
      blurClasses[blur],
      className
    )}
    style={{
      backgroundColor: `rgba(255, 255, 255, ${opacity})`
    }}>
      {children}
    </div>
  );
};