import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 py-2 min-w-48"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => !item.disabled && handleItemClick(item.action)}
              disabled={item.disabled}
              className={cn(
                'w-full text-left px-4 py-3 hover:bg-monks-light-gray transition-colors duration-300 flex items-center gap-3',
                item.disabled && 'opacity-50 cursor-not-allowed',
                item.destructive && 'text-red-600 hover:bg-red-50'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};