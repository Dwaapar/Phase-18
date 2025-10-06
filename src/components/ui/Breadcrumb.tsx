import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      <Link
        to="/"
        className="text-monks-gray hover:text-monks-black transition-colors duration-300"
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={16} className="text-monks-gray" />
          {item.href ? (
            <Link
              to={item.href}
              className="text-monks-gray hover:text-monks-black transition-colors duration-300"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-monks-black font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};