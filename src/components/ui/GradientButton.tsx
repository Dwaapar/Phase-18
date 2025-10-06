import React from 'react';
import { cn } from '../../lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  animated = true,
  onClick,
  disabled = false,
  className
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-monks-accent to-monks-hover',
    secondary: 'bg-gradient-to-r from-monks-gray to-monks-dark-gray',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden rounded-full font-medium text-white transition-all duration-300 group',
        'hover:shadow-lg hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        variants[variant],
        sizes[size],
        animated && 'bg-size-200 hover:bg-pos-0',
        className
      )}
      style={animated ? {
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0'
      } : {}}
    >
      <span className="relative z-10">{children}</span>
      
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </button>
  );
};