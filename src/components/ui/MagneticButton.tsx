import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className,
  onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setTransform(`translate(${deltaX}px, ${deltaY}px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'transition-transform duration-300 ease-out',
        className
      )}
      style={{ transform }}
    >
      {children}
    </button>
  );
};