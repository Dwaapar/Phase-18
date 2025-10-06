import React from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'accent' | 'rainbow';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  variant = 'primary'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-monks-black to-monks-accent',
    accent: 'bg-gradient-to-r from-monks-accent to-monks-hover',
    rainbow: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'
  };

  return (
    <span className={cn(
      'bg-clip-text text-transparent',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};