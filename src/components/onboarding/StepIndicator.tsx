
import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'step-indicator',
            index === currentStep - 1 && 'step-indicator-active',
            index < currentStep - 1 && 'step-indicator-complete'
          )}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
