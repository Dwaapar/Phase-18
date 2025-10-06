import React from 'react';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
  className,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white text-monks-black',
    dark: 'bg-monks-black text-white',
    gradient: 'bg-gradient-to-br from-monks-black via-monks-dark-gray to-monks-medium-gray text-white'
  };

  return (
    <section className={cn('py-24', variants[variant], className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-hero font-bold">{title}</h1>
          {description && (
            <p className={cn(
              'text-xl leading-relaxed',
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