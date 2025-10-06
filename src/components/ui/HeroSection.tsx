import React from 'react';
import { cn } from '../../lib/utils';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  variant?: 'default' | 'dark' | 'gradient' | 'video';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  children,
  backgroundImage,
  variant = 'default',
  size = 'lg',
  className
}) => {
  const variants = {
    default: 'bg-white text-monks-black',
    dark: 'bg-monks-black text-white',
    gradient: 'bg-gradient-to-br from-monks-black via-monks-dark-gray to-monks-medium-gray text-white',
    video: 'bg-monks-black text-white relative overflow-hidden'
  };

  const sizes = {
    sm: 'py-16',
    md: 'py-24',
    lg: 'py-32',
    xl: 'py-40'
  };

  return (
    <section className={cn(variants[variant], sizes[size], className)}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {subtitle && (
            <p className={cn(
              'text-lg font-medium',
              variant === 'default' ? 'text-monks-accent' : 'text-white/80'
            )}>
              {subtitle}
            </p>
          )}
          
          <h1 className="text-hero font-bold leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className={cn(
              'text-xl leading-relaxed max-w-3xl mx-auto',
              variant === 'default' ? 'text-monks-gray' : 'text-white/80'
            )}>
              {description}
            </p>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
};