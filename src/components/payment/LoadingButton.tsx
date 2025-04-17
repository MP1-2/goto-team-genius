
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface LoadingButtonProps {
  isLoading: boolean;
  isSuccess: boolean;
  text: string;
  successText?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  isSuccess,
  text,
  successText,
  onClick,
  disabled,
  className,
  icon
}) => {
  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={disabled || isLoading || isSuccess}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isSuccess ? (
        <>
          {successText || "Payment Complete"}
          <CheckCircle className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </Button>
  );
};

export default LoadingButton;
