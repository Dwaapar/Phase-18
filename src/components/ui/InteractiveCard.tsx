import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface InteractiveCardProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'scale';
  className?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  hoverEffect = 'lift',
  className
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-2 hover:shadow-card';
      case 'glow':
        return 'hover:shadow-[0_0_30px_rgba(15,98,254,0.3)]';
      case 'tilt':
        return 'hover:rotate-1 hover:scale-105';
      case 'scale':
        return 'hover:scale-105';
      default:
        return '';
    }
  };

  const getTiltTransform = () => {
    if (hoverEffect !== 'tilt') return {};
    
    const rect = { width: 300, height: 200 }; // Approximate card size
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / 10;
    const rotateY = (centerX - mousePosition.x) / 10;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    };
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-8 border border-monks-gray/10 transition-all duration-300 cursor-pointer',
        getHoverStyles(),
        className
      )}
      onMouseMove={handleMouseMove}
      style={getTiltTransform()}
    >
      {children}
    </div>
  );
};