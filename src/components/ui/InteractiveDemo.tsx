import React, { useState } from 'react';
import { Play, RotateCcw, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  action: string;
  highlight?: string;
}

interface InteractiveDemoProps {
  steps: DemoStep[];
  title: string;
  description: string;
  className?: string;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  steps,
  title,
  description,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCompletedSteps(prev => new Set([...prev, currentStep]));
    }
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className={cn('bg-white rounded-3xl p-8', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-monks-black mb-4">{title}</h2>
        <p className="text-xl text-monks-gray">{description}</p>
      </div>

      {/* Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={startDemo}
              disabled={isPlaying}
              className="flex items-center gap-2 bg-monks-accent text-white px-6 py-3 rounded-full font-medium hover:bg-monks-hover disabled:opacity-50 transition-all duration-300"
            >
              <Play size={16} />
              Start Demo
            </button>
            
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
          
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={cn(
                'p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer',
                i === currentStep && isPlaying
                  ? 'border-monks-accent bg-monks-accent/5'
                  : completedSteps.has(i)
                  ? 'border-green-500 bg-green-50'
                  : 'border-monks-gray/20 hover:border-monks-accent/30'
              )}
              onClick={() => goToStep(i)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                  i === currentStep && isPlaying
                    ? 'bg-monks-accent text-white'
                    : completedSteps.has(i)
                    ? 'bg-green-500 text-white'
                    : 'bg-monks-gray/10 text-monks-gray'
                )}>
                  {completedSteps.has(i) ? '✓' : i + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-monks-black mb-1">{step.title}</h3>
                  <p className="text-sm text-monks-gray">{step.description}</p>
                  
                  {i === currentStep && isPlaying && (
                    <button
                      onClick={nextStep}
                      className="mt-3 bg-monks-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-monks-hover transition-all duration-300"
                    >
                      {step.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Visual Demo */}
        <div className="bg-monks-light-gray rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center text-monks-gray">
            <Settings size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
            <p>Visual demonstration of the current step</p>
            
            {isPlaying && (
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-monks-black mb-2">
                  Step {currentStep + 1}: {steps[currentStep].title}
                </h4>
                <p className="text-sm text-monks-gray">
                  {steps[currentStep].description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};