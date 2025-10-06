import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Step {
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = 'horizontal',
  className
}) => {
  return (
    <div className={cn(
      'flex',
      orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
      className
    )}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className={cn(
            'flex items-center gap-4',
            orientation === 'vertical' && 'w-full'
          )}>
            {/* Step indicator */}
            <div className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300',
              step.status === 'completed' && 'bg-monks-accent text-white',
              step.status === 'current' && 'bg-monks-accent/10 text-monks-accent border-2 border-monks-accent',
              step.status === 'upcoming' && 'bg-monks-gray/10 text-monks-gray'
            )}>
              {step.status === 'completed' ? (
                <Check size={16} />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            
            {/* Step content */}
            <div className={cn(
              'space-y-1',
              orientation === 'horizontal' ? 'text-center' : 'flex-1'
            )}>
              <div className={cn(
                'font-medium',
                step.status === 'current' ? 'text-monks-accent' : 'text-monks-black'
              )}>
                {step.title}
              </div>
              {step.description && (
                <div className="text-sm text-monks-gray">
                  {step.description}
                </div>
              )}
            </div>
          </div>
          
          {/* Connector */}
          {i < steps.length - 1 && (
            <div className={cn(
              'bg-monks-gray/20',
              orientation === 'horizontal'
                ? 'flex-1 h-px mx-4'
                : 'w-px h-8 ml-5'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};