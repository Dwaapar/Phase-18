import React from 'react';
import { cn } from '../../lib/utils';

interface NeuomorphicCardProps {
  children: React.ReactNode;
  variant?: 'raised' | 'inset';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const NeuomorphicCard: React.FC<NeuomorphicCardProps> = ({
  children,
  variant = 'raised',
  intensity = 'medium',
  className
}) => {
  const intensities = {
    low: variant === 'raised' 
      ? 'shadow-[5px_5px_10px_#d1d5db,-5px_-5px_10px_#ffffff]'
      : 'shadow-[inset_5px_5px_10px_#d1d5db,inset_-5px_-5px_10px_#ffffff]',
    medium: variant === 'raised'
      ? 'shadow-[10px_10px_20px_#d1d5db,-10px_-10px_20px_#ffffff]'
      : 'shadow-[inset_10px_10px_20px_#d1d5db,inset_-10px_-10px_20px_#ffffff]',
    high: variant === 'raised'
      ? 'shadow-[15px_15px_30px_#d1d5db,-15px_-15px_30px_#ffffff]'
      : 'shadow-[inset_15px_15px_30px_#d1d5db,inset_-15px_-15px_30px_#ffffff]'
  };

  return (
    <div className={cn(
      'bg-monks-light-gray rounded-3xl p-8 transition-all duration-300',
      intensities[intensity],
      className
    )}>
      {children}
    </div>
  );
};