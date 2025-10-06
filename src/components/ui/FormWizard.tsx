import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validation?: () => boolean;
}

interface FormWizardProps {
  steps: WizardStep[];
  onComplete?: (data: Record<string, any>) => void;
  className?: string;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  steps,
  onComplete,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});

  const canGoNext = () => {
    const step = steps[currentStep];
    return !step.validation || step.validation();
  };

  const goNext = () => {
    if (canGoNext() && currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleComplete = () => {
    if (canGoNext()) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onComplete?.(formData);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={cn('space-y-8', className)}>
      {/* Step Indicator */}
      <div className="flex items-center justify-center">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => goToStep(i)}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full font-medium transition-all duration-300',
                i === currentStep
                  ? 'bg-monks-accent text-white'
                  : completedSteps.has(i)
                  ? 'bg-green-500 text-white'
                  : i < currentStep
                  ? 'bg-monks-accent/10 text-monks-accent cursor-pointer hover:bg-monks-accent/20'
                  : 'bg-monks-gray/10 text-monks-gray'
              )}
            >
              {completedSteps.has(i) ? (
                <Check size={16} />
              ) : (
                <span>{i + 1}</span>
              )}
            </button>
            
            {i < steps.length - 1 && (
              <div className={cn(
                'w-16 h-1 mx-2 rounded-full transition-colors duration-300',
                i < currentStep ? 'bg-monks-accent' : 'bg-monks-gray/20'
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-monks-black mb-2">
            {steps[currentStep].title}
          </h2>
          {steps[currentStep].description && (
            <p className="text-monks-gray">
              {steps[currentStep].description}
            </p>
          )}
        </div>
        
        <div className="mb-8">
          {steps[currentStep].content}
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goPrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border border-monks-gray text-monks-gray rounded-full font-medium hover:border-monks-black hover:text-monks-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <div className="text-sm text-monks-gray">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          {isLastStep ? (
            <button
              onClick={handleComplete}
              disabled={!canGoNext()}
              className="flex items-center gap-2 bg-monks-accent text-white px-6 py-3 rounded-full font-medium hover:bg-monks-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Check size={16} />
              Complete
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!canGoNext()}
              className="flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};