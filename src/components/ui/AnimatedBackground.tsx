import React from 'react';
import { cn } from '../../lib/utils';

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'mesh' | 'dots' | 'lines';
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'gradient',
  className
}) => {
  const variants = {
    gradient: (
      <div className="absolute inset-0 bg-gradient-to-br from-monks-accent/5 via-purple-500/5 to-pink-500/5" />
    ),
    mesh: (
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#0F62FE" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>
    ),
    dots: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#0F62FE_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
    ),
    lines: (
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,40 L40,0" stroke="#0F62FE" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </div>
    )
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {variants[variant]}
    </div>
  );
};