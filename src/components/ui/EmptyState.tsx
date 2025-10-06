import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn('text-center py-16', className)}>
      <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Icon size={32} className="text-monks-accent" />
      </div>
      <h3 className="text-2xl font-bold text-monks-black mb-4">{title}</h3>
      <p className="text-monks-gray mb-8 max-w-md mx-auto">{description}</p>
      {action && (
        <Link
          to={action.href}
          className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
};