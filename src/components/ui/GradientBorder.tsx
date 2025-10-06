import React from 'react';
import { cn } from '../../lib/utils';

interface GradientBorderProps {
  children: React.ReactNode;
  gradient?: string;
  borderWidth?: number;
  borderRadius?: number;
  className?: string;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  gradient = 'linear-gradient(45deg, #0F62FE, #8B5CF6, #EC4899)',
  borderWidth = 2,
  borderRadius = 24,
  className
}) => {
  return (
    <div
      className={cn('relative', className)}
      style={{
        background: gradient,
        borderRadius: borderRadius + borderWidth,
        padding: borderWidth
      }}
    >
      <div
        className="bg-white w-full h-full"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};