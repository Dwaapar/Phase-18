import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  defaultOpen = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('space-y-2', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-monks-light-gray rounded-2xl hover:bg-monks-gray/10 transition-colors duration-300"
      >
        {trigger}
        <ChevronDown
          size={20}
          className={cn(
            'text-monks-gray transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="p-4 bg-white rounded-2xl border border-monks-gray/10">
          {children}
        </div>
      </div>
    </div>
  );
};