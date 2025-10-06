import React from 'react';
import { cn } from '../../lib/utils';

interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  thickness?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 120,
  thickness = 8,
  color = '#0F62FE',
  backgroundColor = '#F4F4F4',
  label,
  className
}) => {
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 270 - 135; // 270 degrees total, starting at -135

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75; // 75% of circle

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-45"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={thickness}
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-monks-black">
              {Math.round(normalizedValue)}
            </div>
            {label && (
              <div className="text-sm text-monks-gray">{label}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};