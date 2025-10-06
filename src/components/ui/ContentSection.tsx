import React from 'react';
import { cn } from '../../lib/utils';

interface ContentSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gray' | 'dark';
  spacing?: 'sm' | 'md' | 'lg';
  container?: boolean;
  centered?: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  children,
  className,
  variant = 'default',
  spacing = 'md',
  container = true,
  centered = true
}) => {
  const variants = {
    default: 'bg-white',
    gray: 'bg-monks-light-gray',
    dark: 'bg-monks-black text-white'
  };

  const spacings = {
    sm: 'py-16',
    md: 'py-24',
    lg: 'py-32'
  };

  const content = (
    <>
      {(title || description) && (
        <div className={cn('mb-16', centered && 'text-center')}>
          <h2 className={cn(
            'text-3xl font-bold mb-6',
            variant === 'dark' ? 'text-white' : 'text-monks-black'
          )}>
            {title}
          </h2>
          {description && (
            <p className={cn(
              'text-xl leading-relaxed',
              centered && 'max-w-3xl mx-auto',
              variant === 'dark' ? 'text-white/80' : 'text-monks-gray'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  );

  return (
    <section className={cn(variants[variant], spacings[spacing], className)}>
      {container ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {content}
        </div>
      ) : (
        content
      )}
    </section>
  );
};