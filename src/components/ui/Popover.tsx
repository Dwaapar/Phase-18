import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/useClickOutside';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  position = 'bottom',
  align = 'center',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const positions = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  const alignments = {
    start: position === 'top' || position === 'bottom' ? 'left-0' : 'top-0',
    center: position === 'top' || position === 'bottom' ? 'left-1/2 transform -translate-x-1/2' : 'top-1/2 transform -translate-y-1/2',
    end: position === 'top' || position === 'bottom' ? 'right-0' : 'bottom-0'
  };

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={cn(
          'absolute z-50 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 p-4 animate-slide-up',
          positions[position],
          alignments[align],
          className
        )}>
          {children}
        </div>
      )}
    </div>
  );
};