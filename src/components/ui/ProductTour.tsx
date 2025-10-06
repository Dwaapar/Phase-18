import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface ProductTourProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
  className?: string;
}

export const ProductTour: React.FC<ProductTourProps> = ({
  steps,
  isActive,
  onComplete,
  onSkip,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTour = () => {
    onSkip();
  };

  if (!isActive || steps.length === 0) return null;

  const currentStepData = steps[currentStep];
  const targetElement = document.querySelector(currentStepData.target);

  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const positions = {
    top: {
      top: rect.top - 10,
      left: rect.left + rect.width / 2,
      transform: 'translate(-50%, -100%)'
    },
    bottom: {
      top: rect.bottom + 10,
      left: rect.left + rect.width / 2,
      transform: 'translate(-50%, 0)'
    },
    left: {
      top: rect.top + rect.height / 2,
      left: rect.left - 10,
      transform: 'translate(-100%, -50%)'
    },
    right: {
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
      transform: 'translate(0, -50%)'
    }
  };

  const position = positions[currentStepData.position || 'bottom'];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Highlight */}
      <div
        className="fixed z-50 border-4 border-monks-accent rounded-lg pointer-events-none"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8
        }}
      />
      
      {/* Tooltip */}
      <div
        className={cn(
          'fixed z-50 bg-white rounded-2xl shadow-elevated p-6 max-w-sm',
          className
        )}
        style={{
          top: position.top,
          left: position.left,
          transform: position.transform
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-monks-black">{currentStepData.title}</h3>
          <button
            onClick={skipTour}
            className="text-monks-gray hover:text-monks-black transition-colors duration-300"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Content */}
        <p className="text-monks-gray mb-6">{currentStepData.content}</p>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-300',
                  i === currentStep ? 'bg-monks-accent' : 'bg-monks-gray/30'
                )}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={previousStep}
                className="flex items-center gap-1 px-3 py-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            )}
            
            <button
              onClick={nextStep}
              className="flex items-center gap-1 bg-monks-accent text-white px-4 py-2 rounded-full font-medium hover:bg-monks-hover transition-all duration-300"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight size={14} />}
            </button>
          </div>
        </div>
        
        {/* Step Counter */}
        <div className="text-center mt-4 text-sm text-monks-gray">
          {currentStep + 1} of {steps.length}
        </div>
      </div>
    </>
  );
};