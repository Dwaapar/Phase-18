import React, { useEffect } from 'react';
import { useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdvancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  resizable?: boolean;
  draggable?: boolean;
  persistent?: boolean;
  className?: string;
}

export const AdvancedModal: React.FC<AdvancedModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  resizable = false,
  draggable = false,
  persistent = false,
  className
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !persistent) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, persistent, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-4">
      <div
        className={cn(
          'bg-white rounded-3xl relative shadow-elevated animate-slide-up w-full overflow-hidden',
          isMaximized ? 'max-w-[95vw] max-h-[95vh]' : sizes[size],
          isDragging && 'cursor-move',
          className
        )}
        style={draggable ? { transform: `translate(${position.x}px, ${position.y}px)` } : {}}
      >
        {/* Header */}
        {(title || draggable || resizable) && (
          <div
            className="flex items-center justify-between p-6 border-b border-monks-gray/10 bg-monks-light-gray"
            onMouseDown={handleMouseDown}
            style={{ cursor: draggable ? 'move' : 'default' }}
          >
            <h2 className="text-2xl font-bold text-monks-black">{title}</h2>
            
            <div className="flex items-center gap-2">
              {resizable && (
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                >
                  {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
        
        {!title && !draggable && !resizable && (
          <button
            className="absolute top-6 right-6 text-monks-gray hover:text-monks-black transition-colors duration-300 z-10"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        )}
        
        {/* Content */}
        <div className={cn(
          'p-6 overflow-y-auto',
          isMaximized ? 'max-h-[calc(95vh-80px)]' : 'max-h-[80vh]'
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};