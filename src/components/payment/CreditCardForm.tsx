
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ErrorAlert from './ErrorAlert';

interface CreditCardFormProps {
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    phone: string;
  };
  errorMessage: string | null;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  formData,
  errorMessage,
  isProcessing,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <ErrorAlert message={errorMessage} />
      
      <div className="space-y-2">
        <label htmlFor="nameOnCard" className="text-sm font-medium">Name on Card</label>
        <Input 
          id="nameOnCard" 
          name="nameOnCard" 
          placeholder="John Doe" 
          value={formData.nameOnCard}
          onChange={onInputChange}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
        <Input 
          id="cardNumber" 
          name="cardNumber" 
          placeholder="1234 5678 9012 3456" 
          value={formData.cardNumber}
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</label>
          <Input 
            id="expiryDate" 
            name="expiryDate" 
            placeholder="MM/YY" 
            value={formData.expiryDate}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
          <Input 
            id="cvv" 
            name="cvv" 
            placeholder="123" 
            value={formData.cvv}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">Phone Number for Verification</label>
        <Input 
          id="phone" 
          name="phone" 
          placeholder="+1 (555) 123-4567" 
          value={formData.phone}
          onChange={onInputChange}
        />
      </div>
      
      <div className="flex flex-col gap-2 pt-4">
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreditCardForm;
