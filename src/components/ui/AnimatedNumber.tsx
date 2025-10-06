import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  easing = 'easeOut'
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  };

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = easingFunctions[easing](progress);
      const currentValue = easedProgress * value;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, easing]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};