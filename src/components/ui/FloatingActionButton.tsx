import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  size = 'md',
  variant = 'primary'
}) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const variants = {
    primary: 'bg-monks-accent hover:bg-monks-hover text-white shadow-card hover:shadow-elevated',
    secondary: 'bg-white hover:bg-monks-light-gray text-monks-black shadow-card hover:shadow-elevated border border-monks-gray/10'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 rounded-full flex items-center justify-center transition-all duration-300 z-40',
        sizes[size],
        variants[variant],
        className
      )}
    >
      <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
    </button>
  );
};