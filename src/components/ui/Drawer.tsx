import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md',
  className
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const positions = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };

  const sizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]'
  };

  const slideDirections = {
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    top: 'animate-slide-in-top',
    bottom: 'animate-slide-in-bottom'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      <div
        className={cn(
          'bg-white shadow-elevated relative',
          positions[position],
          sizes[size],
          slideDirections[position],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-monks-gray/10">
            <h2 className="text-2xl font-bold text-monks-black">{title}</h2>
            <button
              onClick={onClose}
              className="text-monks-gray hover:text-monks-black transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
        )}
        
        {!title && (
          <button
            className="absolute top-6 right-6 text-monks-gray hover:text-monks-black transition-colors duration-300 z-10"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        )}
        
        <div className={cn('p-6', title && 'pt-0')}>
          {children}
        </div>
      </div>
      
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};