import React, { useState } from 'react';
import { Video as LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  animation?: 'bounce' | 'pulse' | 'spin' | 'wiggle' | 'float';
  trigger?: 'hover' | 'always' | 'click';
  size?: number;
  color?: string;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  animation = 'bounce',
  trigger = 'hover',
  size = 24,
  color,
  className
}) => {
  const [isActive, setIsActive] = useState(trigger === 'always');

  const animations = {
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    wiggle: 'animate-wiggle',
    float: 'animate-float'
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000);
    }
  };

  const getAnimationClass = () => {
    if (trigger === 'always') return animations[animation];
    if (trigger === 'hover') return `hover:${animations[animation]}`;
    if (trigger === 'click' && isActive) return animations[animation];
    return '';
  };

  return (
    <Icon
      size={size}
      className={cn(
        'transition-all duration-300',
        getAnimationClass(),
        className
      )}
      style={{ color }}
      onClick={handleClick}
    />
  );
};

// Add custom animations to global CSS
export const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes wiggle {
      0%, 7% { transform: rotateZ(0); }
      15% { transform: rotateZ(-15deg); }
      20% { transform: rotateZ(10deg); }
      25% { transform: rotateZ(-10deg); }
      30% { transform: rotateZ(6deg); }
      35% { transform: rotateZ(-4deg); }
      40%, 100% { transform: rotateZ(0); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-wiggle {
      animation: wiggle 1s ease-in-out;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `}</style>
);