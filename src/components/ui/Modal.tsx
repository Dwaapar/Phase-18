import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
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

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4">
      <div
        className={cn(
          'bg-white rounded-3xl relative shadow-elevated animate-slide-up max-h-[90vh] overflow-y-auto w-full',
          sizes[size],
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
        
        <div className={title ? 'p-6' : 'p-8'}>
          {children}
        </div>
      </div>
    </div>
  );
};