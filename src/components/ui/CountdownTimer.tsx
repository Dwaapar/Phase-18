import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
  className,
  size = 'md'
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const sizes = {
    sm: { number: 'text-lg', label: 'text-xs', container: 'p-2' },
    md: { number: 'text-2xl', label: 'text-sm', container: 'p-4' },
    lg: { number: 'text-4xl', label: 'text-base', container: 'p-6' }
  };

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {timeUnits.map((unit, i) => (
        <div key={unit.label} className="text-center">
          <div className={cn(
            'bg-white rounded-2xl border border-monks-gray/10 text-center',
            sizes[size].container
          )}>
            <div className={cn('font-bold text-monks-black', sizes[size].number)}>
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className={cn('text-monks-gray', sizes[size].label)}>
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};