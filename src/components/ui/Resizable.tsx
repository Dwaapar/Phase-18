import React, { useState, useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface ResizableProps {
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizeHandles?: ('top' | 'right' | 'bottom' | 'left')[];
  className?: string;
  onResize?: (width: number, height: number) => void;
}

export const Resizable: React.FC<ResizableProps> = ({
  children,
  defaultWidth = 300,
  defaultHeight = 200,
  minWidth = 100,
  minHeight = 100,
  maxWidth,
  maxHeight,
  resizeHandles = ['right', 'bottom'],
  className,
  onResize
}) => {
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (handle.includes('right')) {
        newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
        if (maxWidth) newWidth = Math.min(maxWidth, newWidth);
      }

      if (handle.includes('bottom')) {
        newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));
        if (maxHeight) newHeight = Math.min(maxHeight, newHeight);
      }

      setSize({ width: newWidth, height: newHeight });
      onResize?.(newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size, minWidth, minHeight, maxWidth, maxHeight, onResize]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ width: size.width, height: size.height }}
    >
      {children}
      
      {/* Resize Handles */}
      {resizeHandles.includes('right') && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-monks-accent/20 transition-colors duration-300"
          onMouseDown={(e) => handleMouseDown(e, 'right')}
        />
      )}
      
      {resizeHandles.includes('bottom') && (
        <div
          className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize bg-transparent hover:bg-monks-accent/20 transition-colors duration-300"
          onMouseDown={(e) => handleMouseDown(e, 'bottom')}
        />
      )}
      
      {resizeHandles.includes('right') && resizeHandles.includes('bottom') && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize bg-monks-accent/10 hover:bg-monks-accent/30 transition-colors duration-300"
          onMouseDown={(e) => handleMouseDown(e, 'right bottom')}
        />
      )}
    </div>
  );
};