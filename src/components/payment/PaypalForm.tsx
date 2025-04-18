
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import Image from '@/components/ui/image';

interface PaypalFormProps {
  errorMessage: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PaypalForm: React.FC<PaypalFormProps> = ({
  errorMessage,
  paymentStatus,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="text-center">
        <img 
          src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
          alt="PayPal"
          className="h-12 mx-auto mb-4"
        />
        <p className="text-sm text-muted-foreground mb-6">
          You will be redirected to PayPal's secure payment page
        </p>
      </div>
      
      {paymentStatus === 'success' && (
        <SuccessAlert message="Your PayPal payment has been processed successfully." paymentMethod="PayPal" />
      )}
      
      <div className="flex flex-col gap-2 pt-4">
        <Button 
          type="submit" 
          disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
        >
          {paymentStatus === 'processing' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : paymentStatus === 'success' ? (
            <>
              Payment Successful
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Continue to PayPal
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={paymentStatus === 'processing'}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PaypalForm;
