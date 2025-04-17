
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

interface PaypalFormProps {
  formData: {
    email: string;
    accountId: string;
  };
  errorMessage: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PaypalForm: React.FC<PaypalFormProps> = ({
  formData,
  errorMessage,
  paymentStatus,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Your Email</label>
        <Input 
          id="email" 
          name="email" 
          type="email"
          placeholder="your-email@example.com" 
          value={formData.email}
          onChange={onInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="accountId" className="text-sm font-medium">PayPal Email or Phone</label>
        <Input 
          id="accountId" 
          name="accountId"
          placeholder="your-paypal@example.com or phone" 
          value={formData.accountId}
          onChange={onInputChange}
        />
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
              Pay with PayPal
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
