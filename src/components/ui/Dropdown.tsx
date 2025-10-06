import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  trigger: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  trigger,
  className,
  align = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect?.(value);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={cn(
          'absolute top-full mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 z-50',
          align === 'right' ? 'right-0' : 'left-0'
        )}>
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => !item.disabled && handleSelect(item.value)}
              disabled={item.disabled}
              className={cn(
                'w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {item.icon}
              <span className="text-monks-black">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};