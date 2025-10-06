import React from 'react';
import { cn } from '../../lib/utils';

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('space-y-8', className)}>
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-6">
          {i !== items.length - 1 && (
            <div className="absolute left-6 top-16 bottom-0 w-px bg-monks-gray/20"></div>
          )}
          
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-monks-accent rounded-full flex items-center justify-center">
              {item.icon || (
                <span className="text-white font-bold text-sm">{i + 1}</span>
              )}
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-monks-black">{item.title}</h3>
              {item.date && (
                <span className="text-sm text-monks-gray">{item.date}</span>
              )}
            </div>
            <p className="text-monks-gray leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};