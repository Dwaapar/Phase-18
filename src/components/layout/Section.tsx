import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gray' | 'dark';
  spacing?: 'sm' | 'md' | 'lg';
  container?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  variant = 'default',
  spacing = 'md',
  container = true
}) => {
  const variants = {
    default: 'bg-white',
    gray: 'bg-monks-light-gray',
    dark: 'bg-monks-black text-white'
  };

  const spacings = {
    sm: 'py-12',
    md: 'py-24',
    lg: 'py-32'
  };

  const content = container ? (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {children}
    </div>
  ) : children;

  return (
    <section className={cn(variants[variant], spacings[spacing], className)}>
      {content}
    </section>
  );
};