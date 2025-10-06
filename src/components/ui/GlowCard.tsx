import React from 'react';
import { cn } from '../../lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  glowColor = '#0F62FE',
  intensity = 'medium',
  className
}) => {
  const intensities = {
    low: '0 0 20px',
    medium: '0 0 40px',
    high: '0 0 60px'
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-8 transition-all duration-300 hover:scale-105',
        className
      )}
      style={{
        boxShadow: `${intensities[intensity]} ${glowColor}20`
      }}
    >
      {children}
    </div>
  );
};