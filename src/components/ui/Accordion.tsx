import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  className?: string;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}>({
  openItems: [],
  toggleItem: () => {},
  type: 'single'
});

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
}>({
  value: '',
  isOpen: false
});

export const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  type = 'single', 
  className 
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(prev => 
        prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('space-y-2', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ 
  value, 
  children, 
  className 
}) => {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn('border border-monks-gray/10 rounded-2xl', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  children, 
  className 
}) => {
  const { toggleItem } = React.useContext(AccordionContext);
  const { value, isOpen } = React.useContext(AccordionItemContext);

  return (
    <button
      className={cn(
        'flex w-full items-center justify-between p-6 text-left font-medium transition-all duration-300 hover:bg-monks-light-gray/50',
        className
      )}
      onClick={() => toggleItem(value)}
    >
      {children}
      <ChevronDown 
        size={20} 
        className={cn(
          'transition-transform duration-300',
          isOpen && 'rotate-180'
        )} 
      />
    </button>
  );
};

export const AccordionContent: React.FC<AccordionContentProps> = ({ 
  children, 
  className 
}) => {
  const { isOpen } = React.useContext(AccordionItemContext);

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('px-6 pb-6', className)}>
        {children}
      </div>
    </div>
  );
};